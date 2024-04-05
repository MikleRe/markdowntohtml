const nearley = require("nearley");
const grammar = require("./grammar.js");

function loadMarkdownFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdownContent => {
            var parsed = acorn.parse(markdownContent, markdownOptions);
            document.querySelector("content").innerHTML = parsed;
        })
        .catch(
            error => console.error('Error fetching html:', error)
        );
}

//loadMarkdownFile("./pages/home.md");

var home = `# Title

## Small title

Little paragraph.

`;

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed(home);

console.log(parser.results);

document.querySelector("content").innerHTML = parser.results;