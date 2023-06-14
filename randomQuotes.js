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
	var quoteArea = document.getElementById('quote_area');

	var width = quoteArea.innerWidth*0.01 - quote.length*0.01*10;
	var height = quoteArea.innerHeight*0.01 - quote.length*0.01*10;

	var randomXPos = Math.floor(Math.random() * width);
	var randomYPos = Math.floor(Math.random() * height); 

	randomXPos *= Math.round(Math.random()) ? 1 : -1;

	// document.getElementById("quote_text").style.top = randomYPos + "vh";
	// document.getElementById("quote_text").style.left = randomXPos + "vw";

	document.getElementById("quote_text").style.top = 0 + "vh";
	document.getElementById("quote_text").style.left = 0 + "vw";
}

function randomlyChangeQuote(){
	writeQuote();
	setInterval(writeQuote, 5000);
}

function hoverQuoteArea() {
	var quoteArea = document.getElementById('quote_area');
	var upperArea = document.getElementById("upper_area");
	
	quoteArea.classList.add('hovered');
	upperArea.classList.add("hovered");
}

function resetQuoteArea() {
	var quoteArea = document.getElementById('quote_area');
	var upperArea = document.getElementById("upper_area");


	quoteArea.classList.remove('hovered');
	upperArea.classList.remove("hovered");
}


randomlyChangeQuote();