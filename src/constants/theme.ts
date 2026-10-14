import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#475569',
    background: '#F4F6F9',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E0F2FE',
    primary: '#0071DC',
    primaryDark: '#00439C',
    border: '#E2E8F0',
    card: '#FFFFFF',
    accent: '#FEF3C7',
    accentText: '#D97706',
  },
  dark: {
    text: '#0F172A',
    textSecondary: '#475569',
    background: '#F4F6F9',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E0F2FE',
    primary: '#0071DC',
    primaryDark: '#00439C',
    border: '#E2E8F0',
    card: '#FFFFFF',
    accent: '#FEF3C7',
    accentText: '#D97706',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1024;
