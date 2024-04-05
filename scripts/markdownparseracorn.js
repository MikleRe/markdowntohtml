const acorn = require("acorn");

const markdownOptions = {
    parse: (input, options) => {
        const parser = acorn.Parser(options, input);
        return parseMarkdown(parser);
    }
}

function parseMarkdown(parser) {
    let markdownAST = [];

    while (!parser.eof()) {
        const token = parser.lookahead();

        if (token.type.label === 'comment' && token.value.startsWith('#')) {
            // Parse headings
            markdownAST.push({
                type: 'heading',
                level: token.value.indexOf('#') + 1,
                text: token.value.replace(/^#+\s*/, '')
            });
            parser.next();
        } else if (token.type.label === 'operator' && (token.value === '*' || token.value === '-')) {
            // Parse unordered lists
            const listItem = {
                type: 'list_item',
                text: ''
            };

            while (token.type.label === 'operator' && (token.value === '*' || token.value === '-')) {
                listItem.text += token.value + ' ';
                parser.next();
                token = parser.lookahead();
            }

            markdownAST.push(listItem);
        } else if (token.type.label === 'number' && token.value.match(/^\d+\./)) {
            // Parse ordered lists
            const listItem = {
                type: 'list_item',
                text: ''
            };

            while (token.type.label === 'number' && token.value.match(/^\d+\./)) {
                listItem.text += token.value + ' ';
                parser.next();
                token = parser.lookahead();
            }

            markdownAST.push(listItem);
        } else if (token.type.label === 'string' && token.value.startsWith('[')) {
            // Parse links
            const linkText = token.value.slice(1, token.value.indexOf(']'));
            parser.next(); // Skip '['
            parser.next(); // Skip link text
            parser.next(); // Skip ']'
            parser.next(); // Skip '('
            const linkUrl = parser.lookahead().value;
            parser.next(); // Skip link URL
            parser.next(); // Skip ')'

            markdownAST.push({
                type: 'link',
                text: linkText,
                url: linkUrl
            });
        } else if (token.type.label === 'operator' && token.value === '`') {
            // Parse code blocks
            let codeBlock = '';
            parser.next(); // Skip '`'

            while (parser.lookahead().type.label !== 'operator' || parser.lookahead().value !== '`') {
                codeBlock += parser.lookahead().value + ' ';
                parser.next();
            }

            parser.next(); // Skip '`'

            markdownAST.push({
                type: 'code_block',
                code: codeBlock
            });
        } else {
            // Skip other tokens
            parser.next();
        }
    }

    return markdownAST;
}

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

var home = `
# Title

## Small title

Little paragraph. \
with line break

- List
- List

1. numbered List
2. Numbered List
`;

var parsed = acorn.parse(home, markdownOptions);
document.querySelector("content").innerHTML = parsed;