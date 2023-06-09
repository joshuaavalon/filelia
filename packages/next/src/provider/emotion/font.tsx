import { Noto_Sans_JP, Noto_Sans_TC, Nunito_Sans } from "next/font/google";

const fontJp = Noto_Sans_JP({
  preload: true,
  subsets: ["latin"],
  display: "swap"
});

const fontTc = Noto_Sans_TC({
  weight: "400",
  preload: true,
  subsets: ["latin"],
  display: "swap"
});

const fontNunito = Nunito_Sans({
  preload: true,
  subsets: ["latin"],
  display: "swap"
});

export const fontFamily = `${fontNunito.style.fontFamily}, ${fontJp.style.fontFamily}, ${fontTc.style.fontFamily}, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`;
