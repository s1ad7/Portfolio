/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f9ff",
          100: "#e8f0ff",
          200: "#d2e2ff",
          300: "#a9c9ff",
          400: "#78a7ff",
          500: "#4a86ff",
          600: "#2f66e6",
          700: "#244fc0",
          800: "#213f96",
          900: "#1f3577"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(2,14,40,.25)",
        glow: "0 0 40px rgba(74,134,255,.35)"
      },
      backgroundImage: {
        'radial-faded': "radial-gradient(1000px 600px at 10% -10%, rgba(74,134,255,0.25), transparent), radial-gradient(800px 400px at 90% -20%, rgba(99,102,241,0.25), transparent)"
      }
    }
  },
  plugins: []
}