import { violet, blackA, grass, mauve } from "@radix-ui/colors";

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {...violet, ...blackA, ...mauve,'custom-bg-x' : 'rgba(36,45,52,0.5)'},
    screens: {
      'h-sm': { raw: '(max-height: 480px)' },
      'h-md': { raw: '(min-height: 600px)' },
      'h-lg': { raw: '(min-height: 768px)' },
      'h-xl': { raw: '(min-height: 960px)' },
      'h-2xl': { raw: '(min-height: 1080px)' },
      'h-3xl': { raw: '(min-height: 1600px)' },
    }
  }
};

export const plugins = [];
export const darkMode = 'selector';