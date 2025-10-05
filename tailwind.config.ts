import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Cores básicas
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      // Cores da FATEC Sorocaba
      background: "#F2F2F2", // Cinza claro
      foreground: "#44555D", // Cinza escuro

      primary: {
        DEFAULT: "#AE0C0D", // Vermelho FATEC
        foreground: "#FFFFFF", // Branco
      },
      secondary: {
        DEFAULT: "#44555D", // Cinza escuro
        foreground: "#F2F2F2", // Cinza claro
      },
      tertiary: {
        DEFAULT: "#243E63", // Azul escuro
        foreground: "#FFFFFF", // Branco
      },
      accent: {
        DEFAULT: "#00C1CF", // Ciano
        foreground: "#FFFFFF", // Branco
      },
      info: {
        DEFAULT: "#005C6D", // Azul petróleo
        foreground: "#FFFFFF", // Branco
      },
      muted: {
        DEFAULT: "#F2F2F2", // Cinza claro
        foreground: "#44555D", // Cinza escuro
      },

      // Cores do sistema
      card: {
        DEFAULT: "#FFFFFF", // Branco
        foreground: "#44555D", // Cinza escuro
      },
      popover: {
        DEFAULT: "#FFFFFF", // Branco
        foreground: "#44555D", // Cinza escuro
      },
      border: "#E5E5E5", // Cinza para bordas
      input: "#E5E5E5", // Cinza para inputs
      ring: "#AE0C0D", // Vermelho FATEC para focus
      destructive: {
        DEFAULT: "#EF4444", // Vermelho para ações destrutivas
        foreground: "#FFFFFF", // Branco
      },
    },
    extend: {
      fontFamily: {
        "roboto-slab": ["var(--font-roboto-slab)", "serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
