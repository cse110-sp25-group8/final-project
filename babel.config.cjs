module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // only transform ESM → CJS (leave other modern syntax alone)
        targets: { node: "current" }
      }
    ]
  ]
};