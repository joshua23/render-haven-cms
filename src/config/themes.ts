/**
 * Theme configuration for the application
 * Defines color schemes for different themes
 */

export type ThemeName = 'default' | 'chinese-colors';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  colors: ThemeColors;
}

/**
 * Default theme - Neon Green/Cyan theme
 */
const defaultTheme: Theme = {
  name: 'default',
  displayName: '默认主题',
  description: '现代霓虹绿色主题',
  colors: {
    background: '0 0% 7%',
    foreground: '0 0% 98%',
    card: '0 0% 10%',
    cardForeground: '0 0% 98%',
    popover: '0 0% 8%',
    popoverForeground: '0 0% 98%',
    primary: '158 91% 58%',
    primaryForeground: '0 0% 7%',
    secondary: '158 75% 45%',
    secondaryForeground: '0 0% 98%',
    muted: '0 0% 15%',
    mutedForeground: '0 0% 65%',
    accent: '158 91% 58%',
    accentForeground: '0 0% 7%',
    destructive: '0 84% 60%',
    destructiveForeground: '0 0% 98%',
    border: '0 0% 20%',
    input: '0 0% 20%',
    ring: '158 91% 58%',
    sidebarBackground: '0 0% 8%',
    sidebarForeground: '0 0% 95%',
    sidebarPrimary: '158 91% 58%',
    sidebarPrimaryForeground: '0 0% 7%',
    sidebarAccent: '0 0% 15%',
    sidebarAccentForeground: '0 0% 95%',
    sidebarBorder: '0 0% 20%',
    sidebarRing: '158 91% 58%',
  },
};

/**
 * Chinese Colors theme - Traditional Chinese color palette
 * Uses colors from traditional Chinese art and culture:
 * - 朱红 (Vermilion Red) - Primary
 * - 靛青 (Indigo Blue) - Secondary
 * - 赤金 (Golden) - Accent
 * - 墨色 (Ink Black) - Background
 */
const chineseColorsTheme: Theme = {
  name: 'chinese-colors',
  displayName: '中国色',
  description: '传统中国色彩主题',
  colors: {
    // 墨色 (Ink Black) backgrounds
    background: '240 8% 8%',
    foreground: '30 8% 95%',
    card: '240 6% 12%',
    cardForeground: '30 8% 95%',
    popover: '240 8% 10%',
    popoverForeground: '30 8% 95%',

    // 朱红 (Vermilion Red) - Primary
    primary: '8 82% 58%',
    primaryForeground: '30 8% 98%',

    // 靛青 (Indigo Blue) - Secondary
    secondary: '226 55% 45%',
    secondaryForeground: '30 8% 98%',

    // Muted tones
    muted: '240 6% 18%',
    mutedForeground: '30 5% 65%',

    // 赤金 (Golden) - Accent
    accent: '43 74% 55%',
    accentForeground: '240 8% 8%',

    destructive: '0 84% 60%',
    destructiveForeground: '30 8% 98%',

    // Borders and inputs with subtle warmth
    border: '240 6% 22%',
    input: '240 6% 22%',
    ring: '8 82% 58%',

    // Sidebar with traditional feel
    sidebarBackground: '240 8% 10%',
    sidebarForeground: '30 8% 92%',
    sidebarPrimary: '8 82% 58%',
    sidebarPrimaryForeground: '30 8% 98%',
    sidebarAccent: '240 6% 18%',
    sidebarAccentForeground: '30 8% 92%',
    sidebarBorder: '240 6% 22%',
    sidebarRing: '8 82% 58%',
  },
};

export const themes: Record<ThemeName, Theme> = {
  default: defaultTheme,
  'chinese-colors': chineseColorsTheme,
};

export const themeList: Theme[] = Object.values(themes);

export const getTheme = (name: ThemeName): Theme => {
  return themes[name] || themes.default;
};
