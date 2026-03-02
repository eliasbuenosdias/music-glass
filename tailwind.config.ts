/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                glass: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    dark: 'rgba(0, 0, 0, 0.2)',
                },
                accent: {
                    DEFAULT: '#3b82f6',
                    glow: '#60a5fa',
                }
            },
            backdropBlur: {
                xl: '20px',
            },
            borderRadius: {
                '3xl': '1.5rem',
            },
            boxShadow: {
                'glow': '0 0 15px 2px rgba(96, 165, 250, 0.5)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 15px 2px rgba(96, 165, 250, 0.3)' },
                    '50%': { opacity: 0.8, boxShadow: '0 0 25px 4px rgba(96, 165, 250, 0.6)' },
                }
            }
        },
    },
    plugins: [],
}
