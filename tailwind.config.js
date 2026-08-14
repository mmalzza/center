module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',

        primary: {
          10: '#D4F8F8',
          500: '#007777',
          600: '#006969',
          700: '#005454',
        },

        neutral: {
          900: '#373D44',
          700: '#4E5760',
          500: '#7E8A96',
          300: '#B6BDC4',
          200: '#D2D6DB',
          50: '#F3F5F7',
        },

        red: {
          500: '#F0143C',
        },
      },

      borderRadius: {
        button: '12px',
        input: '8px',
        card: '12px',
      },

      fontSize: {
        body: '14px',
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
    },
  },
};
