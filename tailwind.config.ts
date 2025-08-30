import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#15803d', light: '#16a34a', soft: '#d1fae5' }
      }
    }
  },
  plugins: []
}
export default config
