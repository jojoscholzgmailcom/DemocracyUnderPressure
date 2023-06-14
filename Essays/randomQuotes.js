var quotes = {
	"Confucious": ["That is a very nice quote you've got"],
	"Biden": ["SODAAA", "Hehe"],
	"Heisy": ["I'm the one who knocks", "Say my name", "I am become Walter"],
	"Geralt": ["The wind is howling"],
	"Civ VI player": ["One more turn, then I'm done", "One more research focus, I promise", "Why did you just nuke me Gandhi?!"]
};

var lastQuote = "";

var isHovered = 0;
var isClicked = false;

function getQuote(){
	var authors = Object.keys(quotes);
	var randomIdx = Math.floor(Math.random() * authors.length);
	var author = authors[randomIdx];
	var quote = quotes[author];

	if (quote.length > 1){
		randomIdx = Math.floor(Math.random() * quote.length);
		quote = quote[randomIdx]
	} else {
		quote = quote[0];
	}

	return [quote, author];
}

function writeQuote(){
	if (isHovered > 0 || isClicked == true){
		return;
	}
	var [quote, author] = getQuote();
	
	while (lastQuote === quote){
		[quote, author] = getQuote();
	}

	var container = document.getElementById("quote_text");
	container.style.opacity = 0;
	container.style.transition = "ease 1s";

	randomPosition(quote);
	
	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = `"${quote}" <br/> ${author}`;
		container.style.opacity = 1;
	}, 400);
	

	lastQuote = quote;
}

function randomPosition(quote){
	var width = window.innerWidth/2*0.75 - quote.length*5;
	var height = window.innerHeight/2*0.75 - quote.length*5;

	var randomXPos = Math.floor(Math.random() * width);
	var randomYPos = Math.floor(Math.random() * height); 

	randomXPos *= Math.round(Math.random()) ? 1 : -1;

	document.getElementById("quote_text").style.top = randomYPos + "px";
	document.getElementById("quote_text").style.left = randomXPos + "px";
}

function randomlyChangeQuote(){
	writeQuote();
	setInterval(writeQuote, 5000);
}

function hoverQuoteArea(group) {
	var quoteArea = document.getElementById('quote_area');
	
	isHovered += 1;
	
	if (isHovered === 1) {
	  getText(group);
	} else {
	  // Clear existing text
	  var essayText = document.getElementById("essay_text");
	  essayText.parentNode.removeChild(essayText);
	}

	quoteArea.classList.add('hovered');
}

function getText(group){
	container = document.getElementById("quote_text");
	container.style.transition = "ease 1s";
	container.style.opacity = 0;
	container.innerHTML.text = "";

	switch(group){
		case "g1":
			var [title, text] = group1();
		break;
		case "g2":
			var [title, text] = group2();
		break;
		case "g3":
			var [title, text] = group3();
		break;
		case "g4":
			var [title, text] = group4();
		break;
		case "g5":
			var [title, text] = group5();
		break;
		case "g6":
			var [title, text] = group6();
		break;
	}


	document.getElementById("quote_text").style.top = "5px";
	document.getElementById("quote_text").style.left = 0;
	
	var p_elem = document.createElement("p");
	p_elem.id = "essay_text"
	p_elem.style.top = "15px";
	p_elem.style.left = 0;
	p_elem.style.transition = "ease 1s";
	p_elem.style.opacity = 0;
	p_elem.style.color = "white";
	p_elem.style.fontSize = "x-large";
	p_elem.style.fontWeight = "450";
	p_elem.style.textAlign = "center";
	var node = document.createTextNode(text);

	p_elem.appendChild(node);
	
	document.getElementById("quote_area").appendChild(p_elem);

	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = title;
		p_elem.style.opacity = 1;	
		container.style.opacity = 1;
	}, 400);
}



function resetQuoteArea() {
	var quoteArea = document.getElementById('quote_area');
	isHovered = false;
	writeQuote();

	isHovered = 0;

	var p_elem = document.getElementById("essay_text");
	p_elem.style.opacity = 0;

	quoteArea.childNodes.forEach(child => { // to remove extra text instances
		if(child.nodeName == "P" && child.id == "essay_text"){
			quoteArea.removeChild(child);
		}
	});


	quoteArea.classList.remove('hovered');
}

function clickGroupButton(group) {
	isClicked = true;

	var quoteArea = document.getElementById('quote_area');
	var htmlElem = document.documentElement;
	var htmlBody = document.body;

	quoteArea.classList.add("clicked");
	quoteArea.classList.remove("hovered");

	htmlElem.style.overflow = "auto";
	htmlBody.style.overflow = "auto";

	getText(group);

	var back_button = document.getElementById("goBack");
	
	setTimeout(function() {
		back_button.style.visibility = "visible";
		back_button.style.opacity = 1;
	}, 500);

}

function goBackSelection() {
	isClicked = false;

	var htmlElem = document.documentElement;
	var htmlBody = document.body;

	htmlElem.style.overflow = "hidden";
	htmlBody.style.overflow = "hidden";

	var back_button = document.getElementById("goBack");
	var p_elem = document.getElementById("essay_text");

	var quote_area = document.getElementById("quote_area");
	quote_area.classList.remove("clicked");

	setTimeout(function() {
		back_button.style.visibility = "hidden";
		back_button.style.opacity = 0;
	}, 500);

	setTimeout(function() {
		quote_area.removeChild(p_elem);
	}, 400);

	setTimeout(function() {
		writeQuote();
	}, 200);
}

randomlyChangeQuote();


function group1(){
	var title = "Title in latin 1";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}

function group2(){
	var title = "Title in latin 2";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}

function group3(){
	var title = "Title in latin 3";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}

function group4(){
	var title = "Title in latin 4";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}

function group5(){
	var title = "Title in latin 5";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}

function group6(){
	var title = "Title in latin 6";
	var text = "Lorem ipsum stuff stuff in latin";

	return [title, text];
}