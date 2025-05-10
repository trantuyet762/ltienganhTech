module.exports = {
  content: [
    "*.php",
    "template/**/*.php"
  ],
  theme: {
    extend: {
      container: {
        padding: "1rem",
        center: true,
      },
      fontFamily: {
        baloo: ["'Baloo'"],
        'iciel-pony': ["'iCiel Pony'"],
      },
      colors: {
        'color-v1': '#050754',
        'color-v2': '#2d9065',
        'color-v3': '#4f8af0',
        'color-v4': '#ba3838',
      }
    },
    screens: {
      xs: "450px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1252px",
    },
  },
  plugins: [],
}
