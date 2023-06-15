// Default config here: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [{
        pattern: /bg-(prim|blue|orange|red|yellow|gray|green)-100/,
    }, {
        pattern: /border-(prim|blue|orange|red|yellow|gray|green)-100/,
    },
        'bg-yellow-100',
        'from-prim-800',
        'to-prim-900',
        'from-second-500',
        'to-second-600',
        'from-yellow-900',
        'to-warning-900',
    ],
    theme: {
        extend: {
            boxShadow: {
                '3xl': '0px 1px 0px #D7DAE7',
                '4xl': '0px 1px 5px rgba(0, 0, 0, 0.15)',
                '5xl': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            background: '#F5F7F8',
            prim: {
                100: '#07209F',
                90: '#2ea1ff',
                40: '#A3AED2',
                10: '#E9EBF4',
                5: '#F3F5F9',
            },
            gray: {
                900: '#131313',
                800: '#333333',
                700: '#515151',
                600: '#646464',
                500: '#8B8B8B',
                400: '#ACACAC',
                300: '#D1D1D1',
                200: '#E3E3E3',
                100: '#EEEEEE',
                50: '#F7F7F7',
            },
            danger: {
                900: '#D11A2A',
                800: '#FF6A77',
                500: '#FFF6F8',
                100: '#FF6B6B',
                50: '#FFF6F8',
            },
            success: {
                900: '#54B767',
                800: '#54B767',
                50: '#F4FEF7',
                100: '#6BCB77',
            },
            warning: {
                900: '#FFA34B',
                800: '#F5ECE3',
                50: '#FFF9F3',
            },
            yellow: {
                900: '#FFD66B',
            },
        },
        fontSize: {
            '2xs': ['10px', { lineHeight: '14px' }],
            xs: ['12px', { lineHeight: '18px' }],
            sm: ['13px', { lineHeight: '20px' }],
            base: ['14px', { lineHeight: '22px' }],
            lg: ['16px', { lineHeight: '24px' }],
            xl: ['18px', { lineHeight: '28px' }],
            '2xl': ['20px', { lineHeight: '30px' }],
            '3xl': ['24px', { lineHeight: '36px' }],
            '4xl': ['36px', { lineHeight: '48px' }],
            '5xl': ['39px', { lineHeight: '51px' }],
            '6xl': ['46px', { lineHeight: '54px' }],
            '7xl': ['56px', { lineHeight: '64px' }],
        },
        borderRadius: {
            none: '0px',
            sm: '4px',
            DEFAULT: '8px',
            md: '10px',
            lg: '16px',
            xl: '20px',
            full: '9999px',
        },
        variants: {
            container: ['responsive'],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '5rem',
            },
        },
    },
};