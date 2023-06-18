var lastQuote = "";
var isClicked = false;
var isHovered = false;

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
	if(isClicked || isHovered){
		return;
	}

	var [quote, author] = getQuote();
	
	while (lastQuote === quote){
		[quote, author] = getQuote();
	}

	var quote_length_scale = 1/(quote.length*quote.split(" ").length) * 1000;

	if(quote_length_scale < 0.1){
		quote_length_scale = 0.75;
	} else if(quote_length_scale > 0.1 && quote_length_scale < 1){
		quote_length_scale = 1.2
	} else if(quote_length_scale > 1.5){
		quote_length_scale = 1.5
	}

	var container = document.getElementById("quote_text");
	container.style.opacity = 0;
	container.style.transition = "ease 0.3s";
	setTimeout(function() {
		container.style.fontSize = `calc(4vh * ${quote_length_scale} + 1vw * ${quote_length_scale})`;
	}, 300);
	
	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = `"${quote}" <br/> ${author}`;
		container.style.opacity = 1;
	}, 600);
	
	lastQuote = quote;
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