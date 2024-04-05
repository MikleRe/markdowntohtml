# compile: nearleyc markdowngrammar.ne -o markdownparser.js
# test: nearley-test -i "# test ## allo \n hehe" markdownparser.js

@builtin "whitespace.ne"

@{%
var appendItem = function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var empty = function (d) { return []; };
var emptyStr = function (d) { return ""; };
%}

main              -> lines						{% function(d){ return {lines: d}; } %}


lines             -> line						
				   | lines dbnewline line		{% appendItem(0,2) %}


line              -> "#" __ string              {% d => "<h1>"+ d[2] + "</h1>" %}
                   | "##" __ string             {% d => "<h2>"+ d[2] + "</h2>" %}
				   | string
				   
string            -> [^]:+                      {% d => d[0].join("") %}

dbnewline		  -> newline newline			{% d => "<br>" %}

newline           -> "\r" "\n"
			   	   | "\r" | "\n"