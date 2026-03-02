/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      width: {
        'w': '28%',
        'w79': '79%',
        'w58': '58%',
        'w45': '45rem',
        'w45': '45%',
        'wid9/10': '90%',
        'wk': '-webkit-fill-available',
        'w47.5.5': '47%',
        'w48': '48%',
        'w95': '98%'
      },
      fontSize: {
        'xxs': '0.62rem',
        'xm': '0.875rem',
        'ls': '0.8rem',
        'icon': '1.1rem',
        'tab': '0.8rem',
        'lm': '0.65rem',
        'Update': '0.55rem',
        'smicon': "1.25rem",
        'mobile': "1.525rem"
      },
      colors: {
        "clr": "tomato",
        "catClr": "#40A9FF"


      },
      backgroundColor: {
        "mainclr": "#ff7158bf",
        "bgClrHoliday": "#40A9FF"

      },
      fontFamily: {
        'poppins': ['Poppins'],
        'calibrilight': ['Calibri Light', 'sans-serif'],
        'calibri': ['Calibri', 'sans-serif'],
        'baijamuree': ['Baijamuree-Regular', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      height: {
        'hp': '382px',
        "h72": "72vh",
        "h86": "86vh",
        "lh1.2": "1.2rem"
      },
      flexGrow: {
        '3': '3'
      },
      margin: {
        'margin5': '5%',
        'gap': '0.2rem',
        'tiny': '0.1rem',
        'margin1': '1%',
        'margin3': '3%',
        'margin10': '10%',
        'margin24': '24%',
        'margin65': '65%',
        'margin8': '8%',
        'margin58': '58%',
        "row": '0.25rem',
        'lm': '0.65rem',
      },
      padding: {
        'pd4': '4%',
        'ygap': '0.1rem',
        'ynav': '0.15rem'
      },
      boxShadow: {
        'box': 'rgb(170, 170, 170) 0px 0.25em 0.62em',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }100%

        'xl': '1600px',
        // => @media (min-width: 1280px) { ... }90%

        '2xl': '1800px',
        // => @media (min-width: 1536px) { ... }80%

      },


    },
  },


  plugins: [
    require("flowbite/plugin"),
  ],

}

