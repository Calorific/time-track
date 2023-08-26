/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  plugins: [
    require("preline/plugin")
  ]
}