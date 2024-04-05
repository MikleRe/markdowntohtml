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
            const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

            parser.feed(markdownContent);

            console.log(parser.results);

            document.querySelector("content").innerHTML = parser.results;
        })
        .catch(
            error => console.error('Error fetching html:', error)
        );
}

loadMarkdownFile("./pages/home.md");

var home = `# Title

## Small title

Little paragraph.

test
test

test \\
test

`;

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed(home);

console.log(parser.results);

//document.querySelector("content").innerHTML = parser.results;