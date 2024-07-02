/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
import autoprefixer from "autoprefixer"

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans Thai"', 'sans-serif'],
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
  },

  plugins: [daisyui, autoprefixer],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#013d5a",
          "primary-content": "#FBF9F7",
          "secondary": "#BDD3CE",
          "secondary-content": "#013A58",
          "accent": "#707C69",
          "accent-content": "#FEFBFD",
          "neutral": "#FCF3E3",
          "neutral-content": "#0B3B53",
          "base-100": "#FFFCF5",
          "base-200": "#FEF2E4",
          "base-300": "#EFE0C2",
          "base-content": "#4C4C54",
          "info": "#0000ff",
          "info-content": "#c6dbff",
          "success": "#00ff00",
          "success-content": "#001600",
          "warning": "#F4A258",
          "warning-content": "#140a03",
          "error": "#ff0000",
          "error-content": "#160000",
        },
      },
    ],
  },
}
