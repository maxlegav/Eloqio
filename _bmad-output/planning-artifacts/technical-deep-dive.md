# Eloquio Technical Deep-Dive

**Generated:** 2026-01-29
**Purpose:** Understand how transcription modes and Firebase work before implementation

---

## 0. CLARIFICATIONS IMPORTANTES

### Distinction des Clés API (3 types différents)

**IMPORTANT**: Il y a 3 contextes différents pour les "clés API". Ne pas confondre:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TYPE DE CLÉ          │  OÙ STOCKÉE        │  QUI LA FOURNIT               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. MODE LOCAL        │  AUCUNE CLÉ        │  N/A                          │
│     ────────────────────────────────────────────────────────────────────    │
│     - Whisper tourne 100% sur la machine                                    │
│     - Aucune API externe appelée                                            │
│     - Aucune authentification requise                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  2. MODE API          │  SQLite locale     │  L'UTILISATEUR                │
│     ────────────────────────────────────────────────────────────────────    │
│     - Utilisateur entre SA PROPRE clé Groq/OpenAI/Azure                     │
│     - Stockée encryptée dans SQLite sur sa machine                          │
│     - L'app envoie l'audio directement au provider choisi                   │
│     - Voquill/Eloquio ne voit jamais cette clé                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  3. MODE CLOUD        │  Firebase Secrets  │  VOQUILL (serveur)             │
│     ────────────────────────────────────────────────────────────────────    │
│     - Clé Groq stockée côté serveur (GROQ_API_KEY)                          │
│     - Utilisateur n'a pas besoin de clé                                     │
│     - L'app envoie l'audio à Firebase Function                              │
│     - Firebase appelle Groq avec SA propre clé                              │
│     - Utilisateur paie via abonnement Stripe                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Résumé Visuel

```
LOCAL MODE:                    API MODE:                      CLOUD MODE:
─────────────                  ────────                       ──────────
[Audio] → [whisper-rs]         [Audio] → [Groq/OpenAI API]    [Audio] → [Firebase] → [Groq]
        ↓                              ↓                               ↓
   [Transcript]                  [Transcript]                    [Transcript]
                                                                       ↓
   NO API KEY                    USER'S API KEY                  SERVER'S API KEY
   NO INTERNET                   (encrypted in SQLite)           (user never sees)
```

---

## 1. LES 3 MODES DE TRANSCRIPTION

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER SELECTS MODE                            │
│                                                                  │
│    ┌──────────┐      ┌──────────┐      ┌──────────┐            │
│    │  LOCAL   │      │   API    │      │  CLOUD   │            │
│    │ (défaut) │      │          │      │          │            │
│    └────┬─────┘      └────┬─────┘      └────┬─────┘            │
│         │                 │                 │                   │
│         ▼                 ▼                 ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ LocalWhisper │  │ GroqAPI      │  │ Firebase     │          │
│  │ Repo         │  │ OpenAI       │  │ Function     │          │
│  │              │  │ Azure, etc.  │  │ → Groq       │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         ▼                 ▼                 ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Tauri/Rust   │  │ HTTP Direct  │  │ httpsCallable│          │
│  │ invoke()     │  │ to Provider  │  │ to Firebase  │          │
│  └──────┬───────┘  └──────────────┘  └──────────────┘          │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ whisper-rs   │  ← Modèle Whisper local (CPU/GPU)            │
│  │ (Rust)       │                                               │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Comparaison des Modes

| Aspect | LOCAL | API | CLOUD |
|--------|-------|-----|-------|
| **Où s'exécute** | Machine utilisateur | Serveurs du provider | Firebase → Provider |
| **Internet requis** | Non | Oui | Oui |
| **Clé API** | N/A | Fournie par l'utilisateur | Côté serveur (cachée) |
| **Segment audio** | 120s | 60s | 60s |
| **Parallélisme** | 1 (série) | 3 (parallèle) | 3 (parallèle) |
| **Modèle** | Whisper base/small/medium | whisper-large-v3-turbo | whisper-large-v3-turbo |
| **GPU support** | Oui (Vulkan/Metal) | Non | Non |
| **Limite quota** | Non | Non | Oui (mots/mois) |
| **Providers** | N/A | Groq, OpenAI, Azure, Aldea, Gemini | Groq uniquement |

---

## 2. MODE LOCAL - FLOW DÉTAILLÉ

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  TYPESCRIPT (apps/desktop/src/)                                 │
│                                                                 │
│  1. Action: transcribeAudio()                                   │
│     └─ actions/transcribe.actions.ts:90                         │
│                                                                 │
│  2. Factory: getTranscribeAudioRepo()                           │
│     └─ repos/index.ts:208                                       │
│     └─ Retourne: LocalTranscribeAudioRepo                       │
│                                                                 │
│  3. Repo: LocalTranscribeAudioRepo.transcribeAudio()            │
│     └─ repos/transcribe-audio.repo.ts:165                       │
│     └─ Découpe audio en segments de 120s                        │
│     └─ Appelle transcribeSegment() pour chaque                  │
│                                                                 │
│  4. Tauri: invoke("transcribe_audio", {...})                    │
│     └─ IPC vers Rust                                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  RUST (apps/desktop/src-tauri/src/)                             │
│                                                                 │
│  5. Command: transcribe_audio()                                 │
│     └─ commands.rs:869                                          │
│     └─ Parse options (device, modelSize, prompt)                │
│                                                                 │
│  6. Model: Charge ou télécharge le modèle Whisper               │
│     └─ system/models.rs                                         │
│     └─ Stocké dans $APPDATA/models/                             │
│                                                                 │
│  7. Inference: WhisperTranscriber                               │
│     └─ platform/whisper.rs                                      │
│     └─ whisper-rs (binding vers whisper.cpp)                    │
│     └─ CPU ou GPU (Vulkan/Metal)                                │
│                                                                 │
│  8. Retourne: String (transcript)                               │
└─────────────────────────────────────────────────────────────────┘
```

### Code Clé - LocalTranscribeAudioRepo

```typescript
// apps/desktop/src/repos/transcribe-audio.repo.ts:165-252

export class LocalTranscribeAudioRepo extends BaseTranscribeAudioRepo {
  // Local peut gérer des segments plus longs
  protected getSegmentDurationSec(): number {
    return 120;  // 2 minutes
  }

  // Pas de parallélisme (modèle single-threaded)
  protected getBatchChunkCount(): number {
    return 1;
  }

  protected async transcribeSegment(input: TranscribeSegmentInput) {
    const options = await this.resolveTranscriptionOptions();

    // Appel Tauri vers Rust
    const transcript = await invoke<string>("transcribe_audio", {
      samples: Array.from(input.samples),
      sampleRate: input.sampleRate,
      options: {
        modelSize: options.modelSize,    // "base", "small", "medium"
        device: options.device,          // "cpu" ou "gpu-0"
        initialPrompt: input.prompt,     // Contexte dictionnaire
        language: input.language,        // "en", "fr", etc.
      },
    });

    return {
      text: transcript,
      metadata: {
        inferenceDevice: options.deviceLabel,
        modelSize: options.modelSize,
        transcriptionMode: "local",
      },
    };
  }
}
```

### Code Clé - Rust Command

```rust
// apps/desktop/src-tauri/src/commands.rs:869-968

#[tauri::command]
pub async fn transcribe_audio(
    app: AppHandle,
    samples: Vec<f64>,
    sample_rate: u32,
    options: Option<TranscriptionOptionsDto>,
    transcriber_state: State<'_, TranscriberState>,
) -> Result<String, String> {
    // 1. Parse options
    let model_size = options.model_size.unwrap_or_default();
    let device = options.device.unwrap_or("cpu".to_string());

    // 2. Résout le chemin du modèle
    let model_path = get_or_download_model(&app, model_size).await?;

    // 3. Initialise ou réutilise le transcriber
    let transcriber = transcriber_state.get_or_init(model_path, device)?;

    // 4. Exécute l'inférence
    let transcript = transcriber.transcribe(
        &samples,
        sample_rate,
        options.initial_prompt,
        options.language,
    )?;

    Ok(transcript)
}
```

---

## 3. MODE API - FLOW DÉTAILLÉ

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  TYPESCRIPT                                                     │
│                                                                 │
│  1. Factory sélectionne le provider selon la clé API            │
│     └─ repos/index.ts:225-250                                   │
│                                                                 │
│  2. GroqTranscribeAudioRepo (ou autre provider)                 │
│     └─ repos/transcribe-audio.repo.ts:297-344                   │
│     └─ Construit WAV buffer depuis samples                      │
│                                                                 │
│  3. Appel direct à l'API provider                               │
│     └─ packages/voice-ai/src/groq.ts                            │
│     └─ HTTP POST avec audio + clé API utilisateur               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  PROVIDER EXTERNE (Groq, OpenAI, Azure...)                      │
│                                                                 │
│  - Reçoit audio WAV                                             │
│  - Exécute Whisper large-v3                                     │
│  - Retourne transcript JSON                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Providers Supportés

| Provider | Repo Class | Modèle par défaut |
|----------|------------|-------------------|
| **Groq** | `GroqTranscribeAudioRepo` | whisper-large-v3-turbo |
| **OpenAI** | `OpenAITranscribeAudioRepo` | whisper-1 |
| **Azure** | `AzureTranscribeAudioRepo` | whisper |
| **Aldea** | `AldeaTranscribeAudioRepo` | whisper |
| **Gemini** | `GeminiTranscribeAudioRepo` | gemini-2.0-flash |

### Code Clé - GroqTranscribeAudioRepo

```typescript
// apps/desktop/src/repos/transcribe-audio.repo.ts:297-344

export class GroqTranscribeAudioRepo extends BaseTranscribeAudioRepo {
  private groqApiKey: string;
  private model: TranscriptionModel;

  constructor(apiKey: string, model: string | null) {
    super();
    this.groqApiKey = apiKey;
    this.model = (model as TranscriptionModel) ?? "whisper-large-v3-turbo";
  }

  // Groq limite à 25MB, 60s est safe
  protected getSegmentDurationSec(): number {
    return 60;
  }

  // Groq supporte le parallélisme
  protected getBatchChunkCount(): number {
    return 3;
  }

  protected async transcribeSegment(input: TranscribeSegmentInput) {
    // Convertit samples en WAV
    const wavBuffer = buildWaveFile(input.samples, input.sampleRate);

    // Appel direct à Groq API
    const { text: transcript } = await groqTranscribeAudio({
      apiKey: this.groqApiKey,
      model: this.model,
      blob: wavBuffer,
      ext: "wav",
      prompt: input.prompt ?? undefined,
      language: input.language,
    });

    return {
      text: transcript,
      metadata: {
        inferenceDevice: "API · Groq",
        modelSize: this.model,
        transcriptionMode: "api",
      },
    };
  }
}
```

---

## 4. MODE CLOUD - FLOW DÉTAILLÉ

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  TYPESCRIPT (Desktop App)                                       │
│                                                                 │
│  1. CloudTranscribeAudioRepo                                    │
│     └─ repos/transcribe-audio.repo.ts:254-295                   │
│     └─ Convertit audio en base64                                │
│                                                                 │
│  2. invokeHandler("ai/transcribeAudio", {...})                  │
│     └─ packages/functions/src/utils.ts                          │
│     └─ httpsCallable() vers Firebase                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  FIREBASE CLOUD FUNCTIONS                                       │
│                                                                 │
│  3. handler() dispatch                                          │
│     └─ apps/firebase/functions/src/index.ts:80                  │
│                                                                 │
│  4. runTranscribeAudio()                                        │
│     └─ apps/firebase/functions/src/services/ai.service.ts:20    │
│     └─ Vérifie quotas utilisateur                               │
│     └─ Appelle Groq avec clé serveur                            │
│     └─ Incrémente compteur de mots                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  GROQ API (Backend)                                             │
│                                                                 │
│  - Clé API stockée côté serveur                                 │
│  - Utilisateur n'a pas besoin de sa propre clé                  │
│  - Quota géré par Firebase/Stripe                               │
└─────────────────────────────────────────────────────────────────┘
```

### Code Clé - CloudTranscribeAudioRepo

```typescript
// apps/desktop/src/repos/transcribe-audio.repo.ts:254-295

export class CloudTranscribeAudioRepo extends BaseTranscribeAudioRepo {
  protected getSegmentDurationSec(): number {
    return 60;
  }

  protected getBatchChunkCount(): number {
    return 3;
  }

  protected async transcribeSegment(input: TranscribeSegmentInput) {
    // Convertit en WAV puis base64
    const wavBuffer = buildWaveFile(input.samples, input.sampleRate);
    const bytes = new Uint8Array(wavBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]!);
    }
    const audioBase64 = btoa(binary);

    // Appelle Firebase Function
    const response = await invokeHandler("ai/transcribeAudio", {
      prompt: input.prompt,
      audioBase64,
      audioMimeType: "audio/wav",
      language: input.language,
    });

    return {
      text: response.text,
      metadata: { transcriptionMode: "cloud" },
    };
  }
}
```

### Code Clé - Firebase Function

```typescript
// apps/firebase/functions/src/services/ai.service.ts:20-67

export const runTranscribeAudio = async ({
  auth,
  input,
}: {
  auth: Nullable<AuthData>;
  input: HandlerInput<"ai/transcribeAudio">;
}): Promise<HandlerOutput<"ai/transcribeAudio">> => {
  // Décode audio
  const blob = Buffer.from(input.audioBase64, "base64");

  // Valide taille (max 16MB)
  if (blob.length > MAX_BLOB_BYTES) {
    throw new ClientError("Audio exceeds 16 MB limit");
  }

  // Vérifie accès et quotas
  const access = await checkAccess(auth);
  await validateMemberWithinWordLimits({ auth: access.auth });

  // Appelle Groq avec clé serveur
  const { text: transcript, wordsUsed } = await groqTranscribeAudio({
    apiKey: getGroqApiKey(),  // Clé stockée en env var serveur
    blob,
    prompt: input.prompt ?? undefined,
    ext: "wav",
    language: input.language,
  });

  // Incrémente usage
  await incrementWordCount({
    auth: access.auth,
    count: wordsUsed,
  });

  return { text: transcript };
};
```

---

## 5. FIREBASE INTEGRATION

### Initialisation (Desktop App)

```typescript
// apps/desktop/src/main.tsx:9-80

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
const auth = createEffectiveAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

// Connexion aux émulateurs en dev
if (getIsEmulators()) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestore, "localhost", 8760);
  connectFunctionsEmulator(functions, "localhost", 5001);
}
```

### Collections Firestore

| Collection | Document | Contenu |
|------------|----------|---------|
| `members/{uid}` | Member | Quotas, plan, trial status |
| `users/{uid}` | User | Profil, préférences, onboarding |
| `termDocs/{uid}` | TermDoc | Dictionnaire (termes glossaire/remplacement) |
| `contacts/{uid}` | Contact | Sync email marketing |

### Firebase Functions Disponibles

| Handler | Purpose |
|---------|---------|
| `ai/transcribeAudio` | Transcription cloud via Groq |
| `ai/generateText` | Post-processing LLM via Groq |
| `member/tryInitialize` | Créer Member au premier login |
| `member/getMyMember` | Récupérer quotas/plan |
| `user/setMyUser` | Sauvegarder profil |
| `user/getMyUser` | Récupérer profil |
| `term/listMyTerms` | Lister dictionnaire |
| `term/upsertMyTerm` | Créer/modifier terme |
| `term/deleteMyTerm` | Supprimer terme |
| `stripe/createCheckoutSession` | Paiement Stripe |
| `stripe/getPrices` | Récupérer tarifs |
| `config/getFullConfig` | Config app |

### Quand Cloud vs Local est utilisé

```typescript
// apps/desktop/src/repos/index.ts

// Pour User et Terms
export const getUserRepo = (): BaseUserRepo => {
  return shouldUseCloud() ? new CloudUserRepo() : new LocalUserRepo();
};

export const getTermRepo = (): BaseTermRepo => {
  return shouldUseCloud() ? new CloudTermRepo() : new LocalTermRepo();
};

// shouldUseCloud() vérifie:
// 1. L'utilisateur est authentifié
// 2. A un plan "free" ou "pro"
// → Sync données vers Firestore

// Pour Transcription
// → Basé sur le choix explicite de l'utilisateur (settings.aiTranscription.mode)
```

---

## 6. FACTORY PATTERN - SÉLECTION DU REPO

### Code Principal

```typescript
// apps/desktop/src/repos/index.ts:208-255

export const getTranscribeAudioRepo = (): TranscribeAudioRepoOutput => {
  const prefs = getTranscriptionPrefs(getAppState());

  // Mode Cloud
  if (prefs.mode === "cloud") {
    return {
      repo: new CloudTranscribeAudioRepo(),
      apiKeyId: null,
      warnings: prefs.warnings,
    };
  }

  // Mode API
  if (prefs.mode === "api") {
    let repo: BaseTranscribeAudioRepo;

    switch (prefs.provider) {
      case "openai":
        repo = new OpenAITranscribeAudioRepo(prefs.apiKeyValue, prefs.model);
        break;
      case "azure":
        repo = new AzureTranscribeAudioRepo(prefs.apiKeyValue, region);
        break;
      case "gemini":
        repo = new GeminiTranscribeAudioRepo(prefs.apiKeyValue, prefs.model);
        break;
      default:
        repo = new GroqTranscribeAudioRepo(prefs.apiKeyValue, prefs.model);
    }

    return { repo, apiKeyId: prefs.apiKeyId, warnings: prefs.warnings };
  }

  // Mode Local (défaut)
  return {
    repo: new LocalTranscribeAudioRepo(),
    apiKeyId: null,
    warnings: prefs.warnings,
  };
};
```

### Résolution des Préférences

```typescript
// apps/desktop/src/utils/user.utils.ts:166-210

export const getTranscriptionPrefs = (state: AppState): TranscriptionPrefs => {
  const config = state.settings.aiTranscription;
  const warnings: string[] = [];

  // Vérifie Cloud
  if (config.mode === "cloud") {
    const cloudAvailable = getHasCloudAccess(state);
    const exceedsLimits = getMemberExceedsLimitByState(state);

    if (!cloudAvailable) {
      warnings.push("Cloud not available - check subscription");
    } else if (exceedsLimits) {
      warnings.push("Cloud limit exceeded");
    } else {
      return { mode: "cloud", warnings };
    }
  }

  // Vérifie API
  if (config.mode === "api") {
    const apiKey = getApiKeyById(state, config.selectedApiKeyId);
    if (apiKey) {
      return {
        mode: "api",
        provider: apiKey.provider,
        apiKeyId: config.selectedApiKeyId,
        apiKeyValue: apiKey.keyFull,
        model: apiKey.transcriptionModel,
        warnings,
      };
    }
    warnings.push("No API key configured");
  }

  // Fallback: Local
  return {
    mode: "local",
    device: config.device,
    modelSize: config.modelSize,
    warnings,
  };
};
```

---

## 7. UI - SÉLECTION DU MODE

### Composant Principal

```typescript
// apps/desktop/src/components/settings/AITranscriptionConfiguration.tsx

export const AITranscriptionConfiguration = ({ hideCloudOption = false }) => {
  const transcription = useAppStore((state) => state.settings.aiTranscription);

  const handleModeChange = async (mode: TranscriptionMode) => {
    await setPreferredTranscriptionMode(mode);
  };

  return (
    <Section title="Transcription mode">
      <SegmentedControl<TranscriptionMode>
        value={transcription.mode}
        onChange={handleModeChange}
        options={[
          // Cloud option (peut être cachée)
          ...maybeArrayElements(!hideCloudOption, [
            { value: "cloud", label: "Voquill" }
          ]),
          // API option
          { value: "api", label: "API" },
          // Local option
          { value: "local", label: "Local" },
        ]}
      />

      {/* Contenu conditionnel selon le mode */}
      {transcription.mode === "local" && <LocalModeSettings />}
      {transcription.mode === "api" && <ApiModeSettings />}
      {transcription.mode === "cloud" && <CloudModeSettings />}
    </Section>
  );
};
```

---

## 8. IMPACT POUR ELOQUIO

### Ce qui change

Pour masquer les modes API et Cloud dans Eloquio:

```typescript
// apps/desktop/src/enterprise/features/flags.ts (NOUVEAU)

export const ELOQUIO_FEATURES = {
  transcriptionModes: ['local'] as const,
  showApiMode: false,
  showCloudMode: false,
};

export function isAllowedMode(mode: TranscriptionMode): boolean {
  return ELOQUIO_FEATURES.transcriptionModes.includes(mode as any);
}
```

```typescript
// apps/desktop/src/components/settings/AITranscriptionConfiguration.tsx (MODIFIÉ)

import { ELOQUIO_FEATURES } from '@/enterprise/features';

// Dans le SegmentedControl:
options={[
  ...maybeArrayElements(ELOQUIO_FEATURES.showCloudMode, [
    { value: "cloud", label: "Eloquio" }
  ]),
  ...maybeArrayElements(ELOQUIO_FEATURES.showApiMode, [
    { value: "api", label: "API" }
  ]),
  { value: "local", label: "Local" },
]}
```

### Ce qui reste intact

- **Tout le code des repos** (CloudTranscribeAudioRepo, GroqTranscribeAudioRepo, etc.)
- **Firebase integration** (pour sync utilisateurs si réactivé plus tard)
- **Factory pattern** (getTranscribeAudioRepo)
- **État settings** (aiTranscription.mode peut toujours être "cloud" ou "api")

### Réactivation future

Pour réactiver les modes plus tard:

```typescript
// Changer simplement:
export const ELOQUIO_FEATURES = {
  showApiMode: true,   // ← Activer API
  showCloudMode: true, // ← Activer Cloud
};
```

**Zero changement de code fonctionnel requis.**

---

## 9. FIREBASE - UTILISER VOTRE PROPRE PROJET

### Question: Peut-on utiliser un projet Firebase différent de Voquill?

**OUI, absolument.** C'est même recommandé pour Eloquio.

### Fichiers à Modifier

| Fichier | Contenu | Impact Merge |
|---------|---------|--------------|
| `apps/desktop/.env.prod` | Config Firebase prod | ⚠️ Conflit |
| `apps/desktop/.env.dev` | Config Firebase dev | ⚠️ Conflit |
| `apps/firebase/.firebaserc` | Aliases projet | ⚠️ Conflit |
| `apps/web/.firebaserc` | Aliases site web | ⚠️ Conflit |
| `apps/firebase/functions/.secret.local` | Secrets locaux | Ignoré (.gitignore) |

### Configuration Actuelle (Voquill)

**Desktop (.env.prod):**
```
VITE_FIREBASE_API_KEY="AIzaSyDlPI-o5piDSNIG39EvJZJEz0gXCGEGk-w"
VITE_FIREBASE_PROJECT_ID="voquill-prod"
VITE_FIREBASE_AUTH_DOMAIN="voquill-prod.firebaseapp.com"
...
```

**Firebase (.firebaserc):**
```json
{
  "projects": {
    "prod": "voquill-prod",
    "dev": "voquill-dev",
    "default": "voquill-dev"
  }
}
```

### Configuration Eloquio (Exemple)

**Desktop (.env.prod):**
```
VITE_FIREBASE_API_KEY="<votre-api-key>"
VITE_FIREBASE_PROJECT_ID="eloquio-prod"
VITE_FIREBASE_AUTH_DOMAIN="eloquio-prod.firebaseapp.com"
VITE_FIREBASE_STORAGE_BUCKET="eloquio-prod.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="<votre-sender-id>"
VITE_FIREBASE_APP_ID="<votre-app-id>"
...
```

**Firebase (.firebaserc):**
```json
{
  "projects": {
    "prod": "eloquio-prod",
    "dev": "eloquio-dev",
    "default": "eloquio-dev"
  }
}
```

### Secrets Firebase (Production)

Pour le mode CLOUD, vous devez configurer les secrets sur votre projet Firebase:

```bash
# Dans apps/firebase/
firebase functions:secrets:set GROQ_API_KEY
# Entrez votre clé Groq

firebase functions:secrets:set STRIPE_SECRET_KEY
# Entrez votre clé Stripe (si vous voulez les paiements)

firebase functions:secrets:set LOOPS_API_KEY
# Optionnel - pour email marketing
```

### Impact sur les Merges Upstream

**Les fichiers .env SONT trackés dans git** (ils contiennent la config Voquill).

**Conséquence:** Quand vous synchronisez depuis upstream Voquill, ces fichiers créeront des conflits de merge.

**Solution recommandée:**

1. **Documenter les "zones de conflit attendues"** dans votre guide de merge
2. **Toujours choisir la version Eloquio** lors des conflits sur ces fichiers
3. **Vérifier que Voquill n'a pas ajouté de nouvelles variables** (cas rare)

**Exemple de workflow merge:**
```bash
# Sync depuis Voquill
git fetch upstream
git merge upstream/main

# Conflits attendus sur:
# - apps/desktop/.env.prod    → garder version Eloquio
# - apps/desktop/.env.dev     → garder version Eloquio
# - apps/firebase/.firebaserc → garder version Eloquio
# - apps/web/.firebaserc      → garder version Eloquio

git checkout --ours apps/desktop/.env.prod
git checkout --ours apps/desktop/.env.dev
git checkout --ours apps/firebase/.firebaserc
git checkout --ours apps/web/.firebaserc
git add .
git commit -m "Merge upstream, keeping Eloquio Firebase config"
```

### Risque de ce changement: FAIBLE

- Les fichiers .env sont de la **configuration pure**, pas du code
- La **structure reste identique** (mêmes variables)
- Le merge est **prévisible et facile** (toujours garder version Eloquio)
- Aucun impact sur la **fonctionnalité** du code

### Note sur les Fallbacks Hardcodés

Dans `apps/desktop/src/main.tsx`, il y a des fallbacks hardcodés:

```typescript
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCJ8C3ZW2bHjerneg5i0fr-b5uwuy7uULM",  // ← Fallback Voquill-dev
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "voquill-dev",
  // ...
};
```

**Action requise pour Eloquio:**
- Changer ces fallbacks vers Eloquio-dev
- OU supprimer les fallbacks (le code throw une erreur si env var manquante)
- Ce changement fait partie de l'Epic 1 (infrastructure)

---

## 10. CONFIRMATION: MODES CACHÉS ≠ MODES DÉSACTIVÉS

### Ce que "cacher un mode" signifie

```
┌─────────────────────────────────────────────────────────────────┐
│  AVANT (Voquill UI)                                            │
│                                                                 │
│  Transcription Mode:  [Cloud] [API] [Local]                    │
│                         ↑       ↑       ↑                       │
│                       visible  visible  visible                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  APRÈS (Eloquio UI)                                            │
│                                                                 │
│  Transcription Mode:  [Local]                                  │
│                          ↑                                      │
│                       visible                                   │
│                                                                 │
│  [Cloud] et [API] ne sont PAS affichés                         │
│  Mais le CODE existe toujours et FONCTIONNE                    │
└─────────────────────────────────────────────────────────────────┘
```

### Ce qui reste FONCTIONNEL

| Composant | Statut | Preuve |
|-----------|--------|--------|
| `CloudTranscribeAudioRepo` | ✅ Code intact | Fichier non modifié |
| `GroqTranscribeAudioRepo` | ✅ Code intact | Fichier non modifié |
| `OpenAITranscribeAudioRepo` | ✅ Code intact | Fichier non modifié |
| Firebase Integration | ✅ Code intact | main.tsx non modifié |
| API Key Storage | ✅ Code intact | crypto.rs non modifié |
| `getTranscribeAudioRepo()` | ✅ Factory intact | Sélection par mode toujours active |

### Implémentation du masquage

```typescript
// enterprise/features/flags.ts (NOUVEAU FICHIER)
export const ELOQUIO_FEATURES = {
  showCloudMode: false,  // Masque l'option dans l'UI
  showApiMode: false,    // Masque l'option dans l'UI
};

// Dans AITranscriptionConfiguration.tsx:
options={[
  // Conditionnel - n'affiche pas si false
  ...maybeArrayElements(ELOQUIO_FEATURES.showCloudMode, [
    { value: "cloud", label: "Eloquio" }
  ]),
  ...maybeArrayElements(ELOQUIO_FEATURES.showApiMode, [
    { value: "api", label: "API" }
  ]),
  // Toujours visible
  { value: "local", label: "Local" },
]}
```

### Pourquoi garder le code?

1. **Réactivation facile** - Changer `false` → `true` suffit
2. **Pas de dette technique** - Pas de code supprimé à réintégrer
3. **Pas de conflits merge** - Les fichiers de repos ne sont pas modifiés
4. **Tests upstream** - Les tests Voquill continuent de passer
5. **Fonctionnalité future** - Eloquio Enterprise pourrait activer Cloud/API

### Comment tester que ça fonctionne encore?

Si vous voulez vérifier que Cloud/API marchent toujours (en dev):

```typescript
// Temporairement dans la console ou un test:
import { produceAppState } from './store';

// Force le mode API (même s'il n'est pas visible dans l'UI)
produceAppState((draft) => {
  draft.settings.aiTranscription.mode = 'api';
});

// Le prochain enregistrement utilisera l'API
// → Prouve que le code fonctionne
```

---

## 11. RÉSUMÉ DES QUESTIONS

| Question | Réponse |
|----------|---------|
| **LOCAL utilise une clé API?** | NON - 100% local, aucune API |
| **API utilise quelle clé?** | Clé de L'UTILISATEUR (Groq/OpenAI/etc), stockée localement encryptée |
| **CLOUD utilise quelle clé?** | Clé SERVEUR (dans Firebase Secrets), l'utilisateur ne la voit pas |
| **Peut-on utiliser son propre Firebase?** | OUI - Changer les .env et .firebaserc |
| **Ça cause des problèmes de merge?** | Conflits PRÉVISIBLES sur ~4 fichiers de config, faciles à résoudre |
| **Les modes sont désactivés?** | NON - Juste CACHÉS dans l'UI, le code reste 100% fonctionnel |
