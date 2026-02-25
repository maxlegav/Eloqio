export const ELOQUIO_COLORS = {
  primary: {
    green: '#37ec13',
    greenHover: '#2ed60f',
    greenActive: '#28c00d',
    backgroundLight: '#f6f8f6',
    backgroundDark: '#132210',
    cream: '#F4E6DA',
    sage: '#A8C5A3',
    sageDark: '#6B8E65',
    sageAccent: '#5E8C61',
    textDark: '#121811',
    white: '#FFFFFF',
    charcoal: '#121811',
    warmBrown: '#453F3D',
  },
  accent: {
    main: '#37ec13',
    light: '#5ff03d',
    dark: '#28c00d',
  },
  semantic: {
    success: '#37ec13',
    warning: '#E8C9A0',
    error: '#D4A59A',
    info: '#A8B5C5',
  },
  text: {
    primary: '#121811',
    secondary: '#453F3D',
    disabled: '#757170',
    light: '#FFFFFF',
    muted: '#6B7280',
  },
  background: {
    default: '#f6f8f6',
    paper: '#FFFFFF',
    elevated: '#FFFFFF',
    cream: '#F4E6DA',
    dark: '#132210',
    darkElevated: '#1c2e18',
  },
  border: {
    light: 'rgba(168, 197, 163, 0.2)',
    medium: 'rgba(168, 197, 163, 0.3)',
    dark: 'rgba(255, 255, 255, 0.1)',
  },
  shadow: {
    light: 'rgba(55, 236, 19, 0.1)',
    medium: 'rgba(55, 236, 19, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

export type EloquioColors = typeof ELOQUIO_COLORS;
