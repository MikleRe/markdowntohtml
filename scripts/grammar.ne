@builtin "whitespace.ne"

@{%
var appendItem = function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var emptyStr = function (d) { return ""; };
var empty = function (d) { return []; };
%}

lines			  -> line
				   | lines newline newline line		 {% d => d[0] + d[3] %}

line 		      -> "#" __ string 					 {% d => "<h1>" + d[2] + "</h1>" %}	
				   | "##" __ string 			     {% d => "<h2>" + d[2] + "</h2>" %}	
            	   | string				 			 {% d => d[0] %}

string    		  -> null                            {% emptyStr %}
                   | string newline:? char           {% d => d[0] + d[2] %}

char              -> [^\n\r"#]                       {% id %}

newline			  -> "\n"                     	     {% emptyStr %}