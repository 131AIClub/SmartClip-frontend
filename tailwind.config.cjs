/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    boxShadow: {
      around: "0 0 10px 5px rgba(0, 0, 0, 0.06)"
    }
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  corePlugins: {
    preflight: false
  }
}
