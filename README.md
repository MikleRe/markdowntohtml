# Markdown to HTML

A little parser made using [nearley](https://nearley.js.org/) to parse Markdown into HTML.

## Use nearley

Compile:
```bash
nearleyc grammar.ne -o grammar.js
```

Test:
```bash
nearley-test -i "# test \n  ## allo \n hehe" grammar.js
```

Remove npm:
```bash
browserify ./grammar.js -o ./bundle.js
```

Or use `cmd+shift+b` if using VSCode or just run the `update.sh` script.