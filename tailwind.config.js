const {fontFamily} = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1f8e6d",
        "background-light": "#f8fafc",
        "background-dark": "#12201c",
        "accent-purple": "#8b5cf6",
        green: {
          DEFAULT: '#1F8F6D',
          light: '#E8F5F1',
          mid: '#2aa880'
        },
        purple: '#7C6FCD',
        rose: '#F43F5E',
        background: '#F4F7F6',
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#F9FAFB',
        },
        border: '#E8EDEC',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        display: ["Inter", ...fontFamily.sans],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}

