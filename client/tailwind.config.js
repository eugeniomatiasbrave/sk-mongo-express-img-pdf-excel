/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: { 
          "primary": "#0a7399", // #0a7399   (azul petroleo)
          "secondary": "#f6d860",
          "warning": "b3e240", // #b3e240 (verde limon)
          "info": "#0a7399",
          "accent": "#65b8ca",
          "neutral": "#3d4451",
          "base-100": "#ffffff"
        }
      }
    ]
  }
}

//ok personalizar colores

