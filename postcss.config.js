module.exports = {
  plugins: {
    "tailwindcss": {},
    "autoprefixer": {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
      stage: 3,
      autoprefixer: false,
    },
  },
};
