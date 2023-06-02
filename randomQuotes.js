var quotes = {
	"Confucious": ["That is a very nice quote you've got"],
	"Biden": ["SODAAA", "Hehe"],
	"Heisy": ["I'm the one who knocks", "Say my name", "I am become Walter"],
	"Geralt": ["The wind is howling"],
	"Civ VI player": ["One more turn, then I'm done", "One more research focus, I promise", "Why did you just nuke me Gandhi?!"]
};

var lastQuote = "";

var isHovered = false;
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
	if (isHovered == true || isClicked == true){
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
	writeQuote()
	setInterval(writeQuote, 5000);
}

function hoverQuoteArea(group) {
	var quoteArea = document.getElementById('quote_area');
	
	isHovered = true;
	
	getText(group);

	quoteArea.classList.add('hovered');
}

function getText(group){
	container = document.getElementById("quote_text");
	container.style.transition = "ease 1s";
	container.style.opacity = 0;
	container.innerHTML.text = "";

	try{
		fetch(`essay_text/${group}.json`).then(response => response.json()).then(
			data => {
				title = data["title"]; 
				text = data["text"];

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
		);
	} catch (error) {
		console.error('Error:', error);
	}
}

function resetQuoteArea() {
	var quoteArea = document.getElementById('quote_area');
	isHovered = false;
	writeQuote();

	var p_elem = document.getElementById("essay_text");
	p_elem.style.opacity = 0;
	// p_elem.style.position = "relative";
	// p_elem.style.transition = "ease top 1s";
	// p_elem.style.top = "100px";	
	
	setTimeout(function() {
		quoteArea.removeChild(p_elem);
	}, 400);


	quoteArea.classList.remove('hovered');
}

function clickGroupButton(group) {
	isClicked = true;

	var quoteArea = document.getElementById('quote_area');
	
	quoteArea.classList.add("clicked");

	getText(group);

	var back_button = document.getElementById("goBack");
	back_button.style.visibility = "visible";
	back_button.style.opacity = 1;

	quoteArea.classList.removed("hovered");
}

function goBackSelection() {
	isClicked = false;

	var back_button = document.getElementById("goBack");

	quoteArea.classList.removed("clicked");
	back_button.style.visibility = "hidden";
	back_button.style.opacity = 0;
}

randomlyChangeQuote();