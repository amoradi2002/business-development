import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pcg-green": "#3d9b3d",
        "pcg-dark-green": "#2d7a2d",
        "pcg-red": "#b22222",
        "pcg-dark": "#1a1a1a",
        "pcg-light": "#f7f7f7",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        inter: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
