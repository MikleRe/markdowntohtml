echo "Compiling grammar..."
nearleyc ./scripts/grammar.ne -o ./scripts/grammar.js

echo "Compiling npm modules..."
browserify ./scripts/pages.js -o ./scripts/bundle.js

echo "Finished."
echo ""