module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("dateLocale", (date) =>
    new Date(date).toLocaleDateString()
  );
  eleventyConfig.addFilter("filter", (arr, value) =>
    arr.filter((v) => v !== value)
  );

  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
