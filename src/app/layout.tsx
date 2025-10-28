//import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP_CONFIG } from "@/config/app-config";
import { ReduxProvider } from "@/redux/redux-provider";
import { getPreference } from "@/server/server-actions";
import { PreferencesStoreProvider } from "@/app/stores/preferences/preferences-provider";
import {
  THEME_MODE_VALUES,
  THEME_PRESET_VALUES,
  type ThemePreset,
  type ThemeMode,
} from "@/types/preferences/theme";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
}; */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = await getPreference<ThemeMode>(
    "theme_mode",
    THEME_MODE_VALUES,
    "light"
  );
  const themePreset = await getPreference<ThemePreset>(
    "theme_preset",
    THEME_PRESET_VALUES,
    "default"
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PreferencesStoreProvider
          themeMode={themeMode}
          themePreset={themePreset}>
          <ReduxProvider>{children}</ReduxProvider>
        </PreferencesStoreProvider>
      </body>
    </html>
  );
}
