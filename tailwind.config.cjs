/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
  themes: [
    {
      planship: {
        'primary': '#65b5f9',
        'primary-content': '#fff4ee',
        'secondary': '#53d4a4',
        'accent': '#ff5149',
        'neutral': '#190900',
        'neutral-content': '#fff4ee',
        'base-100': '#fff4ee',
        'info': '#65b5f9',
        'success': '#96cc37',
        'success-content': '#fff4ee',
        'warning': '#FBBD23',
        'error': '#ff5149',
      },
    },
  ],
  },
  plugins: [
    require('daisyui'),
  ],
}
