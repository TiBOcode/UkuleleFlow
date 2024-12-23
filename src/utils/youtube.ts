// Existing code...

export function getPlaylistId(url: string): string {
  const regExp = /[&?]list=([^&]+)/i;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

export const UKULELE_FLOWS_PLAYLIST = 'PLhdWSzLbFz3nJSZd98mgPJ1DImJYgEbS-';