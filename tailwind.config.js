import scrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [scrollbar],
}
