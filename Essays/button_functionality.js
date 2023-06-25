function randomlyChangeQuote(){
	writeQuote();
	setInterval(writeQuote, 5000);
}

function hoverQuoteArea(group) {
	if (isClicked){
		return;
	}

	var quoteArea = document.getElementById('quote_area');
	
	isHovered = true;

	getText(group);

	if(group === "g4" || group === "g5" || group === "g6"){
		quoteArea.classList.add('hovered');
	}
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

	document.getElementById("quote_text").style.fontSize = "calc(3vh + 2vw)";
	
	var p_elem = document.createElement("p");
	p_elem.innerHTML = text;
	
	document.getElementById("quote_area").appendChild(p_elem);
	p_elem.id = "essay_text";
	p_elem.style.position = "relative";
	p_elem.style.margin = "5vw";
	p_elem.style.top = "-5vh";
	p_elem.style.left = 0;
	p_elem.style.transition = "1s ease";
	p_elem.style.opacity = 0;
	p_elem.style.color = "white";
	p_elem.style.fontSize = "4vh";
	p_elem.style.fontWeight = "450";
	p_elem.style.textAlign = "left";

	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = title;
		p_elem.style.opacity = 1;	
		container.style.opacity = 1;
	}, 400);
}

function removeEssayText(){
	var quoteArea = document.getElementById('quote_area');
	
		quoteArea.childNodes.forEach(child => { // to remove extra text instances
			if(child.nodeName == "P" && child.id == "essay_text"){
				child.style.opacity = 0;
				child.parentNode.removeChild(child);
			}
		});
}

function resetQuoteArea(group) {
	var quoteArea = document.getElementById('quote_area');
	isHovered = false;
	
	setTimeout(function(){
		writeQuote();
	},400);

	if(!isClicked){
		removeEssayText();	
	}

	if(group === "g4" || group === "g5" || group === "g6"){
		quoteArea.classList.remove('hovered');
	}
}

function clickGroupButton() {
	isClicked = true;
	
	var quoteArea = document.getElementById('quote_area');

	var quote_text = document.getElementById("quote_text");
	var p_elem = document.getElementById("essay_text");

	console.log(quote_text.style.top);
	
	var countP = 0;
	quoteArea.childNodes.forEach(child => {
		if(child.nodeName == "P" && child.id == "essay_text"){
			countP++;
		}
		if(countP > 1 && child.nodeName == "P" && child.id == "essay_text"){
			quoteArea.removeChild(child);
		}
	});
	
	p_elem.style.top = "3vh";

	quoteArea.classList.remove("hovered");
	quoteArea.classList.add("clicked");
	
	var back_button = document.getElementById("goBack_essay");
	back_button.style.transition = "opacity 0.6s";

	setTimeout(function() {
		back_button.style.visibility = "visible";
		back_button.style.opacity = 1;
	}, 400);
}

function goBackSelection() {
	isClicked = false;

	var htmlElem = document.documentElement;
	var htmlBody = document.body;

	htmlElem.style.overflow = "hidden";
	htmlBody.style.overflow = "hidden";

	var quote_text = document.getElementById("quote_text");
	var p_elem = document.getElementById("essay_text");

	quote_text.style.top = "-3vh";
	
	var back_button = document.getElementById("goBack_essay");
	back_button.style.transition = "opacity 0.2s";

	var quote_area = document.getElementById("quote_area");
	quote_area.classList.remove("clicked");
	back_button.style.opacity = 0; 
	
	setTimeout(function() {
		back_button.style.visibility = "hidden";
	}, 200);

	removeEssayText();

	setTimeout(function() {
		writeQuote();
	}, 200);
}