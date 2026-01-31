/**
 * Eloquio Shadows (warm-toned)
 */

const SHADOW_COLOR = '69, 63, 61';

export const ELOQUIO_SHADOWS = {
  none: 'none',
  soft: `0 4px 20px rgba(${SHADOW_COLOR}, 0.08)`,
  medium: `0 8px 32px rgba(${SHADOW_COLOR}, 0.12)`,
  high: `0 16px 48px rgba(${SHADOW_COLOR}, 0.16)`,
  card: `0 2px 12px rgba(${SHADOW_COLOR}, 0.06)`,
  dropdown: `0 4px 16px rgba(${SHADOW_COLOR}, 0.10)`,
  modal: `0 24px 64px rgba(${SHADOW_COLOR}, 0.20)`,
  button: `0 2px 8px rgba(${SHADOW_COLOR}, 0.08)`,
  buttonHover: `0 4px 12px rgba(${SHADOW_COLOR}, 0.12)`,
} as const;

export const MUI_SHADOWS = [
  'none',
  `0 1px 3px rgba(${SHADOW_COLOR}, 0.04)`,
  `0 2px 6px rgba(${SHADOW_COLOR}, 0.06)`,
  `0 3px 8px rgba(${SHADOW_COLOR}, 0.08)`,
  `0 4px 12px rgba(${SHADOW_COLOR}, 0.08)`,
  `0 5px 14px rgba(${SHADOW_COLOR}, 0.10)`,
  `0 6px 16px rgba(${SHADOW_COLOR}, 0.10)`,
  `0 7px 18px rgba(${SHADOW_COLOR}, 0.10)`,
  `0 8px 20px rgba(${SHADOW_COLOR}, 0.12)`,
  `0 9px 22px rgba(${SHADOW_COLOR}, 0.12)`,
  `0 10px 24px rgba(${SHADOW_COLOR}, 0.12)`,
  `0 11px 26px rgba(${SHADOW_COLOR}, 0.14)`,
  `0 12px 28px rgba(${SHADOW_COLOR}, 0.14)`,
  `0 13px 30px rgba(${SHADOW_COLOR}, 0.14)`,
  `0 14px 32px rgba(${SHADOW_COLOR}, 0.14)`,
  `0 15px 34px rgba(${SHADOW_COLOR}, 0.16)`,
  `0 16px 36px rgba(${SHADOW_COLOR}, 0.16)`,
  `0 17px 38px rgba(${SHADOW_COLOR}, 0.16)`,
  `0 18px 40px rgba(${SHADOW_COLOR}, 0.16)`,
  `0 19px 42px rgba(${SHADOW_COLOR}, 0.18)`,
  `0 20px 44px rgba(${SHADOW_COLOR}, 0.18)`,
  `0 21px 46px rgba(${SHADOW_COLOR}, 0.18)`,
  `0 22px 48px rgba(${SHADOW_COLOR}, 0.20)`,
  `0 23px 50px rgba(${SHADOW_COLOR}, 0.20)`,
  `0 24px 52px rgba(${SHADOW_COLOR}, 0.20)`,
] as const;

export type EloquioShadows = typeof ELOQUIO_SHADOWS;
