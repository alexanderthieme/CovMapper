import { ComponentType } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export type AppConfig = {
  ui: AppUI;
  content?: AppContent;
  buildJSON: BuildJSON;
  mapSettings?: MapSettings;
}

export type AppContent = {
    pages: Array<AppPage>;
}

export type AppPage = {
    id: string;
    title: string;
    Component: ComponentType;
}

export type BuildJSON = {
    /**
     * Absolute URL path to an image to be used in the loading/splash screen
     * Example:
     * app-config/static/logo.svg
     * -> www.domain.com/logo.svg
     * -> logoSrc: "/logo.svg"
     */
    meta: AppMeta;
    logoSrc: string;
    pwaOptions?: PWAOptions;
}

type Latitude = number
type Longitude = number
type LatLang = [Latitude, Longitude]
type NorthWest = LatLang
type SouthEast = LatLang

export type MapSettings = {
  constraints: [NorthWest, SouthEast];
}

export type AppMeta = {
    /**
     * Application Title, used as Logo alt text and in html head title
     */
    title: string;
}

export type AppUI = {
    Logo?: ComponentType;
    theme?: Theme;
}

export type Color = string;
export enum AppleMobileWebAppCapable {
    YES = 'yes',
    NO = 'no'
}
export enum AppleMobileWebAppStatusBarStyle {
    DEFAULT = 'default',
}

export type PWAOptions = {
    name?: string;
    themeColor?: Color;
    msTileColor?: Color;
    appleMobileWebAppCapable?: AppleMobileWebAppCapable;
    appleMobileWebAppStatusBarStyle?: AppleMobileWebAppStatusBarStyle;
    assetsVersion?: string;
    manifestPath?: string;
    iconPaths?: {
        favicon32?: string;
        favicon16?: string;
        appleTouchIcon?: string;
        maskIcon?: string;
        msTileImage?: string;
    };
}