const axios = require("axios");

const ignoreKeywords = [
  "11ty",
  "11ty-plugin",
  "eleventy",
  "eleventy-plugin",
  "plugin"
];

module.exports = async () => {
  const res = await axios.get("https://api.npms.io/v2/search/?q=keywords:eleventy-plugin&size=250");
  const map = new Map();

  for (const plugin of res.data.results) {
    const kwArr = (plugin.package.keywords || [])
      .map(kw => kw.toLowerCase())
      .filter(kw => !ignoreKeywords.includes(kw));
    plugin.package.keywords = kwArr.length ? kwArr : ["NO_KEYWORDS"];
    plugin.package.keywords.forEach(keyword => {
      const _plugins = map.get(keyword) || [];
      _plugins.push(plugin);
      map.set(keyword, _plugins);
    });
  }

  return [...map.keys()]
    .sort()
    .map(name => {
      const plugins = map.get(name)
        // Sort plugins by arbitrary npms.io score, descending.
        .sort((a, b) => b.score.final - a.score.final);
      return { name, plugins };
    });
};
