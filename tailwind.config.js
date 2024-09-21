/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 50%);",
      },
    },
  },
  plugins: [],
};
