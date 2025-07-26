const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("src");
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("code.css");
    eleventyConfig.addPassthroughCopy("images");

    eleventyConfig.addFilter("blogDateFormat", function(date) {
        return DateTime.fromJSDate(new Date(date)).toFormat("yyyy-MM-dd")
    });

    const md = markdownIt({
        html: true,
        highlight: function (str, lang) {
            const escaped = md.utils.escapeHtml(str);
            const languageClass = lang ? `lang-${lang}` : "";
            return `<pre><code class="${languageClass} prettyprint">${escaped}</code></pre>`;
        }
    });

    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        },
        format: "directory"
    };
}
