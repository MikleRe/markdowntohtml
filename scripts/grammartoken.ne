@builtin "whitespace.ne"
@builtin "number.ne"

@{%
var appendItem = function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a].concat(d[b]); } };
var emptyStr = function (d) { return ""; };
var empty = function (d) { return []; };
%}

expressions		  -> expression newline:*
				   | expressions expression				{% d => d[0] + d[1] %}

expression 		  -> title								{% d => d[0] %}	
				   | paragraph							{% d => d[0] %}	

title 			  -> "#" __ string	     			 	{% d => "<h1>" + d[2] + "</h1>" %}	
				   | "##" __ string    	            	{% d => "<h2>" + d[2].join("") + "</h2>" %}
				   
paragraph		  -> text:+ newline						{% d => "<p>" + d[0] + "</p>" %}

index			  -> newline int "." __	string			{% d => "&emsp;" + d[0] + ". " + d[3] + "<br>" %} 
				   | newline "-" __	string				{% d => "&emsp;• " + d[2] + "<br>" %} 

text			  -> string newline

string       	  -> char:+                   			{% d => d[0].join("") %} 

char              -> [^\n\r\\"#]  			         	{% id %}
				   | "\\"							 	{% d => "<br>" %}

dbnewline		  -> newline newline
				   | "\r"

newline			  -> "\n"        					 	{% emptyStr %}