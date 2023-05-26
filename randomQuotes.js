var quotes = {
	"Confucious": ["That is a very nice quote you've got"],
	"Biden": ["SODAAA", "Hehe"],
	"Heisy": ["I'm the one who knocks"]
};

function writeQuote(){
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

	var container = document.getElementById("quote_text");
	container.style.opacity = 0;
	container.style.transition = "ease 1s";

	
	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = `"${quote}" <br/> ${author}`;
		container.style.opacity = 1;
	}, 1000);
	
	lastQuotelength = quote.split(" ").length;
}

function getRandomInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomlyChangeQuote(){
	writeQuote()

	setInterval(writeQuote, 5000);
}

randomlyChangeQuote();