function toArrayOrNull(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.filter(Boolean);
  return [val];
}
require("dotenv").config();
module.exports = function (eleventyConfig) {
  
  eleventyConfig.addGlobalData("hymns", () => {
    const hymns = require("./src/_data/wa-hymns.json");

    return hymns.map(h => ({
      ...h
    }));
  });
  eleventyConfig.addGlobalData("auth", process.env.AUTH);

  eleventyConfig.addGlobalData("waHymns", require("./src/_data/wa-hymns.json"));

  eleventyConfig.addGlobalData("hymnHeaders", () => {
    const hymns = require("./src/_data/wa-hymns.json");
    return hymns.length > 0 ? Object.keys(hymns[0]) : [];
  });

  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addFilter("toTags", function(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    return [val];
  });

  eleventyConfig.addFilter("joinList", function(val) {
  if (!val) return "";
  if (Array.isArray(val)) {
    return val.filter(Boolean).join(", ");
  }
  return val;
});

  return {
    dir: { input: "src", output: "dist", includes: "_includes" }
  };
};