import type { EloquioFeatures, TranscriptionMode } from './types';

/**
 * Eloquio Feature Flags
 *
 * Controls which features are visible/enabled in the UI.
 * The underlying code remains intact - only UI visibility is affected.
 *
 * To re-enable a mode later, simply change the flag to `true`.
 */
export const ELOQUIO_FEATURES: EloquioFeatures = {
  transcriptionModes: ['local'] as const,
  showApiMode: false,
  showCloudMode: false,
  enablePostProcessing: true,
  enableDictionary: true,
  enableTones: true,
};

export const isAllowedMode = (mode: TranscriptionMode): boolean => {
  return ELOQUIO_FEATURES.transcriptionModes.includes(mode);
};

export const getDefaultMode = (): TranscriptionMode => {
  return ELOQUIO_FEATURES.transcriptionModes[0];
};

export const validateMode = (mode: TranscriptionMode): TranscriptionMode => {
  return isAllowedMode(mode) ? mode : getDefaultMode();
};
