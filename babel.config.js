module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo", // includes React Native and modern JS support
    ],
  };
};
