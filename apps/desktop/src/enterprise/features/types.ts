/**
 * Type definitions for Eloquio feature flags
 */

import type { TranscriptionMode } from '../../types/ai.types';

export type { TranscriptionMode };

export interface EloquioFeatures {
  transcriptionModes: readonly TranscriptionMode[];
  showApiMode: boolean;
  showCloudMode: boolean;
  enablePostProcessing: boolean;
  enableDictionary: boolean;
  enableTones: boolean;
}
