import type { EloquioConfig } from './types';

/**
 * Eloquio Brand Configuration
 *
 * SINGLE SOURCE OF TRUTH for all brand values.
 * Update this file to change branding across the entire application.
 */
export const ELOQUIO_CONFIG: EloquioConfig = {
  appName: 'Eloquio',
  productName: 'Eloquio',
  bundleIdentifier: 'com.eloquio.app',
  website: 'https://eloquio.com',
  supportEmail: 'support@eloquio.com',
  companyName: 'Eloquio Team',
  description: 'Enterprise voice-to-text for confidential workflows',
  bookingUrl: 'https://cal.com/eloquio/demo',
};

export const getAppTitle = (suffix?: string): string => {
  if (suffix) {
    return `${ELOQUIO_CONFIG.appName} - ${suffix}`;
  }
  return ELOQUIO_CONFIG.appName;
};
