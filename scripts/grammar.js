// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

var appendItem = function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var emptyStr = function (d) { return ""; };
var empty = function (d) { return []; };
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "lines", "symbols": ["line"]},
    {"name": "lines", "symbols": ["lines", "newline", "newline", "line"], "postprocess": d => d[0] + d[3]},
    {"name": "line", "symbols": [{"literal":"#"}, "__", "string"], "postprocess": d => "<h1>" + d[2] + "</h1>"},
    {"name": "line$string$1", "symbols": [{"literal":"#"}, {"literal":"#"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "line", "symbols": ["line$string$1", "__", "string"], "postprocess": d => "<h2>" + d[2] + "</h2>"},
    {"name": "line", "symbols": ["string"], "postprocess": d => d[0]},
    {"name": "string", "symbols": [], "postprocess": emptyStr},
    {"name": "string$ebnf$1", "symbols": ["newline"], "postprocess": id},
    {"name": "string$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "string", "symbols": ["string", "string$ebnf$1", "char"], "postprocess": d => d[0] + d[2]},
    {"name": "char", "symbols": [/[^\n\r\\"#]/], "postprocess": id},
    {"name": "char", "symbols": [{"literal":"\\"}], "postprocess": d => "<br>"},
    {"name": "newline", "symbols": [{"literal":"\n"}], "postprocess": emptyStr}
]
  , ParserStart: "lines"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
