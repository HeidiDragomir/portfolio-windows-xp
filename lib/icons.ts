/** Base path for the user-provided Windows XP icon pack (served from /public). */
export const ICON_BASE = "/assets/Windows XP Icons";

/** Build a URL for an icon in the pack by its file name (with extension). */
export function icon(name: string): string {
  return `${ICON_BASE}/${name}`;
}

export const WALLPAPER = "/assets/Wallpaper.jpg";
export const STARTUP_SOUND = "/assets/windows-xp-startup.mp3";
export const CV_PDF = "/assets/CV.pdf";
export const AVATAR = "/assets/avatar.JPG";
