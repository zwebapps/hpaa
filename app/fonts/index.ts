import localFont from "next/font/local";

/**
 * Self-hosted fonts (latin subset, WOFF2), served from this site.
 *
 * Previously loaded with next/font/google, which downloads the fonts from Google
 * at build time: a failed download on the server broke a production build and took
 * the site down. Hosting the files here removes that dependency, and visitors'
 * browsers never contact Google either. All families are SIL Open Font License.
 *
 * The CSS variable names are unchanged, so globals.css needs no edits.
 */

export const outfit = localFont({
  src: "./outfit-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-outfit",
  display: "swap",
});

export const cormorant = localFont({
  src: "./cormorant-garamond-latin-variable.woff2",
  weight: "300 700",
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const playfair = localFont({
  src: "./playfair-display-latin-variable.woff2",
  weight: "400 900",
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const bebas = localFont({
  src: "./bebas-neue-latin-400.woff2",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const dmSans = localFont({
  src: "./dm-sans-latin-variable.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
});

export const spaceMono = localFont({
  src: [
    { path: "./space-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./space-mono-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});
