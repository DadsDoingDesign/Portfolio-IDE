/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ide': {
          'bg-primary': 'var(--color-bg-primary)',
          'bg-secondary': 'var(--color-bg-secondary)',
          'bg-tertiary': 'var(--color-bg-tertiary)',
          'bg-elevated': 'var(--color-bg-elevated)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-tertiary': 'var(--color-text-tertiary)',
          'text-accent': 'var(--color-text-accent)',
          'accent-primary': 'var(--color-accent-primary)',
          'accent-success': 'var(--color-accent-success)',
          'accent-warning': 'var(--color-accent-warning)',
          'accent-error': 'var(--color-accent-error)',
          'border-primary': 'var(--color-border-primary)',
          'border-secondary': 'var(--color-border-secondary)',
          'border-active': 'var(--color-border-active)',
        }
      },
      fontFamily: {
        'mono': ['var(--font-mono)'],
        'sans': ['var(--font-sans)']
      },
    },
  },
  plugins: [],
}
