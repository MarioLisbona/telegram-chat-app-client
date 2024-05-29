/** @type {import('tailwindcss').Config} */
const forms = require("@tailwindcss/forms");
const aspectRatio = require("@tailwindcss/aspect-ratio");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms, aspectRatio],
};
