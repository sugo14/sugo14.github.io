const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addFilter("blogDateFormat", function(date) {
        return DateTime.fromJSDate(new Date(date), { zone: 'utc' }).toFormat("yyyy-MM-dd")
    });

    const md = markdownIt({
        html: true,
        highlight: function (str, lang) {
            const escaped = md.utils.escapeHtml(str);
            const languageClass = lang ? `lang-${lang}` : "";
            return `<pre><code class="${languageClass} prettyprint">${escaped}</code></pre>`;
        }
        
    });

    md.renderer.rules.hr = function (tokens, idx, options, env) {
        return '<p class="hor-bar thin"></p>\n';
    };

    eleventyConfig.addGlobalData("eleventyComputed", {
        layout: (data) => {
            if (data.page && data.page.inputPath.startsWith("./blog/") && data.page.inputPath.endsWith(".md")) {
                return "blog-layout.html";
            }
            return data.layout;
        },
        permalink: (data) => {
            if (data.page && data.page.inputPath.startsWith("./blog/") && data.page.inputPath.endsWith(".md")) {
                if (data.slug) {
                    return `blog/${data.slug}/index.html`;
                }
            }
            return data.permalink;
        },
        viewcnt: async (data) => {
            /*
            var r = new XMLHttpRequest();
r.addEventListener('load', function() {
    document.querySelector('#view-count-value').innerText = JSON.parse(this.responseText).count
})
r.open('GET', 'https://sugo14.goatcounter.com/counter/' + '.json')
r.send()
            */
            const res = await fetch('https://sugo14.goatcounter.com/counter/' + '.json');
            const body = await res.json();
            return body.count;
        }
    });

    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addCollection("blogs", function(collectionApi) {
        const blogs = collectionApi.getFilteredByGlob("./blog/*.md");
        return blogs.sort((a, b) => {
            return new Date(b.date) - new Date(a.date); // descending
        });
    });

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }
    };
}
