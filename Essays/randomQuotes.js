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

function hoverQuoteArea(group) {
	if (isClicked){
		return;
	}

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

	document.getElementById("quote_text").style.top = "-7vh";
	document.getElementById("quote_text").style.left = 0;
	
	var p_elem = document.createElement("p");
	p_elem.innerHTML = text;
	
	document.getElementById("quote_area").appendChild(p_elem);
	p_elem.id = "essay_text";
	p_elem.style.position = "relative";
	p_elem.style.top = "-5vh";
	p_elem.style.left = 0;
	p_elem.style.transition = "1s ease";
	p_elem.style.opacity = 0;
	p_elem.style.color = "white";
	p_elem.style.fontSize = "4vh";
	p_elem.style.fontWeight = "450";
	p_elem.style.textAlign = "justify";

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
				setTimeout(function(){quoteArea.removeChild(child);},400);
			}
		});
}

function resetQuoteArea() {
	var quoteArea = document.getElementById('quote_area');
	isHovered = false;
	
	setTimeout(function(){
		writeQuote();
	},400);

	if(!isClicked){
		removeEssayText();	
	}

	quoteArea.classList.remove('hovered');
}

function clickGroupButton() {
	isClicked = true;
	
	var quoteArea = document.getElementById('quote_area');
	
	var countP = 0;
	quoteArea.childNodes.forEach(child => {
		if(child.nodeName == "P" && child.id == "essay_text"){
			countP++;
		}
		if(countP > 1 && child.nodeName == "P" && child.id == "essay_text"){
			quoteArea.removeChild(child);
		}
	});
	
	quoteArea.classList.add("clicked");
	quoteArea.classList.remove("hovered");
	
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

	var quote_area = document.getElementById("quote_area");
	quote_area.classList.remove("clicked");
	
	setTimeout(function() {
		back_button.style.visibility = "hidden";
		back_button.style.opacity = 0;
	}, 500);

	removeEssayText();

	setTimeout(function() {
		writeQuote();
	}, 200);
}

randomlyChangeQuote();

function group1(){
	var title = `PiS' Historical Policy and the EU`;
	var text = `
	<h3>Abstract</h3>
	
	<p align="right"> Populism seems to become stronger 
	the more intellectuals criticize it (Taguieff 1995, 43). </p> <br/><br/>

	With the election of Viktor Orbán as prime minister in Hungary in 2010 and Andrzej Duda as 
	president in Poland in 2015, as well as the large increase of seats by Jimmie Åkesson in Sweden 
	in 2022 and Caroline van der Plas in the Netherlands in 2023, it is safe to say that populism is 
	on the rise. On the European stage, two countries are often regarded as ruled by populists, 
	which often coincides with an anti-European stance. One of these countries, Poland, has even 
	attempted to weaponize history in a bid to portray Poland as nothing but a victim. In light of 
	this development and the broader context of the Polish constitutional crisis, which was give a 
	new impulse with monday's ruling by the Court of Justice of the European Union, it is important 
	to analyze how the ruling Law and Justice Party (Prawo i Sprawiedliwość: PiS) weaponizes 
	history to further its own interests. As such, the research question of this essay has been 
	established as follows: <br/><br/>

	<center>
	How does the PiS history policy help explain its anti-European stance?
	</center> <br/><br/>

	In section I, a conceptual framework of populism will be presented, as well as a short overview 
	of the ruling party which for the purposes of this essay is considered populist. For the precise 
	populist dynamics regarding the PiS, see Stanley and Cześnik (2019), as well as Zabdyr-Jamróz 
	et al. (2021). In section II, the historical policy of the party will be analyzed. It shows that a 
	recurring theme in Polish interpretations of history is victimhood. This ranges from demanding 	
	reparations from Germany because of the damages inflicted in the Second World War, to 
	questioning official reports surrounding the 2010 Smolensk air disaster. All these events are 
	interpreted to transform a “pedagogy of shame,” which allegedly signifies an attack on Polish 
	values, to a “pedagogy of pride.” The latter will be interpreted by looking into the official Law 
	and Justice party manifesto from 2019 (PiS, 2019). To understand the Polish view on identity 
	and education, this will be contrasted with European integration policies in section III. 
	Although the member states have considerable autonomy regarding history, core values are 
	laid down by means of treaties. The essay concludes that the way in which history is governed, 
	is fundamentally incompatible with guidelines set out by the EU. As such, skepticism toward 
	supranational organizations is no incident created by individuals, but the product of a long 
	process. 

	<h3>Section I: Populism and PiS</h3>
	<h4>Section I.a: Populism</h4>

	Populism is a contested term. Oftentimes, the term is used to discredit political opponents, 
	which led Ralf Dahrendorf to argue that “des einen Populismus ist des anderen Demokratie, 
	und umgekehrt” (Dahrendorf 2003, 156). As such, one should always be skeptical when the 
	term is used by politicians or media. That being said, the term does hold academic value. An 
	often-cited definition of populism is by Cas Mudde:<br/><br/>

	<center>
	“an ideology that considers society to be ultimately separated into two homogeneous 
	and antagonistic groups, ‘the pure people’ versus ‘the corrupt elite’, and which argues 
	that politics should be an expression of the volonté générale (general will) of the 
	people” (Mudde 2004, 543).
	</center><br/><br/>

	However, Mudde argues, populism is only a ‘thin-centered ideology’ (2004, 544), meaning it 
	can easily be fused with other - both thick and thin - ideologies. In the European context, 
	populism is most commonly associated with the far-right, but this needs not be so. In the case 
	of the ruling party of Poland, PiS, the carrying ideology is one of national conservatism. 
	Conservatism in Poland has a history going back to the fall of communism. Following the fall 
	of communism, thought collectives were founded that spread ideas from conservative thinkers 
	such as Leo Strauss (1959) and Eric Voegelin (2000). The first Pole to write on Voegelin, was 
	Ryszard Legutko (1985), a political philosopher in Krakow, who would later found Eastern 
	Europe’s first conservative think-tank with an anti-liberal view in 1992: the ‘Educational and 
	Scientific Society - The Center for Political Thought,’ also in Krakow. As a departure point, 
	national conservatism takes a principled opposition to liberalism (Varga and Buzogány 2000, 
	1097). It claims to defend the national state as the quintessential institution to protect traditions, 
	which, allegedly, are attacked by liberals (Blokker 2019). This anti-liberal voice is still loud 
	and manifests itself, inter alia, in a distrust towards the EU, as shall be discussed later. <br/><br/>
	
	The second - and main - part of Mudde’s definition emphasizes the distinction between ‘the 
	pure people’ and ‘the corrupt elite.’ Ernesto Laclau argued that ‘the people’ is essentially an 
	‘empty signifier,’ meaning that populists can decide on the shared identity and articulation of 
	the volonté général (Laclau 2005, 151). On the other hand is the ‘the corrupt elite,’ which 
	includes everyone “who hold high-ranking positions within politics, the economy and the 
	media, but excludes the populists themselves” (Gwiazda 2021, 582, emphasis added; see also 
	Mudde and Kaltwasser 2017). The elite will be discussed later, but first a brief introduction of 
	the populists - speaking on behalf of the people - is necessary.

	<h4>Section I.b: What is the PiS party?</h4>

	The PiS party was founded in 2001 by Jarosław and Lech Kaczyński. In their view, the 
	liberal-left wing of Solidarity, which helped bring down communism, “betrayed the idea of a 
	complete break with the communist regime” (Folvarčný and Kopeček 2020, 166). Although 
	initially supportive of Lech Wałęsa as president - Jarosław Kaczyński was even chief of office 
	- the twin brothers were quickly disappointed by a lack of decommunisation. In the 2001 Sejm 
	elections PiS received 9.5% of votes, but it rapidly grew and Lech Kaczyński was elected 
	president in 2005. However, Lech Kaczyński died in the 2010 Smolensk air disaster, creating 
	discord in Polish society. In fact, the PiS still rejects “the official inquest into the causes of the 
	Smolensk plane disaster and to this day seeks to prove that it was a murder of Polish leaders” 
	(Folvarčný and Kopeček 2020, 167). More on that will be discussed below. <br/><br/>
	
	Although Jarosław Kaczyński participated in the 2010 presidential elections, he was beaten by 
	Bronisław Komorowski and subsequently stepped back from major offices. However, he still 
	remains chairman of the party to this day. The PiS was represented by Andrzej Duda in the 
	2015 parliamentary elections, which he won. Duda has since been president of Poland. He 
	became most infamous for the escalation of what has been dubbed the “Polish constitutional 
	crisis.” Before the elections, the Civic Platform party (Platforma Obywatelska: PO) had 
	attempted to elect three new judges to the Constitutional Tribunal. This much was legal, but 
	PO also attempted to elect two judges set to retire after the elections. In response, Duda refused 
	to swear in any of the five judges and instead elected his own. Since then, the government and 
	the Constitutional Tribunal have been in a deadlock (Kelemen 2016).<br/><br/>

	Worried by these developments, the EU intervened in January 2016 with an Article 7 TEU 
	procedure. Under Article 7, certain rights can be suspended - including voting rights in the 
	European Council. In December 2017, the European Commission held that:<br/><br/>

	<center>
	“Over a period of two years, the Polish authorities have adopted more than 13 laws 
	affecting the entire structure of the justice system in Poland, impacting the 
	Constitutional Tribunal, Supreme Court, ordinary courts, National Council for the 
	Judiciary, prosecution service and National School of Judiciary. The common pattern 
	is that the executive and legislative branches have been systematically enabled to 
	politically interfere in the composition, powers, administration and functioning of the 
	judicial branch” (European Commission 2017).
	</center> <br/><br/>

	Since then, the crisis has not been resolved. Since October 2021, Poland has received a daily 
	fine of €100,000,000 (lowered to €500,000 in April 2023). On June 6th, 2023, the Court of 
	Justice of the European Union sided with the European Commission, which is supposed to 
	settle the issue but which does not “affect Poland’s obligation to make the daily penalty 
	payments due in respect of the past.” In response, “Sebastian Kaleta, a Polish deputy justice 
	minister, called the verdict a “farce,”” and “according to him “[a]lthough the EU does not have 
	the authority in the Treaties to assess the organization of the judiciary, the CJEU has found that 
	it can assess the Polish one” (Camut 2023). <br/><br/>
	
	<h3>Section II: The PiS party's historical policy</h3>
	<h4>Section II.a: What is the foundation of the PiS party’s historical policy?</h4>

	In this section, we investigate the basis behind the PiS party's historical policy. In other words, 
	we present the PiS party’s views on Polish history and how it should be interpreted. At its core, 
	the PiS party’s history policy is based on the idea that Poles were repeatedly treated as victims 
	throughout history. In particular, the PiS party narrative repeatedly stresses the tragedy of 
	Polish suffering at the hands of external invaders (Hackmann 2018). Indeed, the country of 
	Poland has been militarily conquered several times since the start of the eighteenth century 
	(Biskupski 2018). The Partition of Poland of 1795 ended the existence of the Polish-Lithuanian 
	commonwealth to be split between Russia, Prussia and Austria. As a result, the state of Poland 
	ceased to exist for over a century until the ratification of the Treaty of Versailles revived the 
	state at the end of the First World War. However, the rebirth of Poland was short-lived since 
	they were invaded simultaneously by the Germans and the Soviets just a few decades later 
	during the early stages of the Second World War. As such, the Molotov-Ribbentrop pact 
	marked the second Partition of Poland in modern history. Poland’s Institute of National 
	Remembrance estimates that around six million Poles perished throughout the Second World 
	War (INR 2009). These losses at the hands of foreign powers constitute an important source of 
	outrage and victimhood among Poland’s political discourse. For example, the former prime 
	minister of Poland, Mateusz Morawiecki once said in a press conference that “the impact of 
	such losses are still felt to this day. We lost the elite, outstanding engineers and scientists. And 
	the entire Polish economy could not develop normally.” (Tilles 2022). In addition, in 
	September 2022, the head of PiS Jarosław Kaczynski claimed war reparations from Germany 
	for its actions throughout the Second World War, amounting to $1.3 trillion. Kaczynski further 
	stated that “such compensation will be paid for decades, but it is bearable for the German 
	economy” (Tilles 2022). <br/><br/>

	In light of this troubled past, Poland’s diplomatic relations with Germany and Russia were 
	fragile to say the least. However, these relations were further exacerbated after the Smolensk 
	air disaster of April 2010. This event refers to the crash of Polish Air Force Flight 101 near the 
	city of Smolensk (Tilles 2022). As stated above, this deadly crash killed a significant portion 
	of Poland’s political elite, including the President of Poland Lech Kaczynski, as well as the 
	former president of Poland in exile Ryszard Kaczorowski, the chief of the Polish General Staff, 
	the president of the National Bank of Poland, Polish Government officials, 18 members of the 
	Polish Parliament, and other senior Polish military officers. Both Polish and Russian 
	investigations concluded that there were no technical issues with the aircraft and that the crash 
	was likely due to human error, failing to adopt the necessary safety precautions due to the 
	turbulent weather conditions. However, the PiS party came to a different conclusion which is 
	more aligned with their victimhood view of Polish history. Namely, the party claimed that the 
	crash was “decided at the highest levels of the Kremlin” (Tilles 2022). In particular, the PiS 
	began spreading various conspiracy theories, claiming that the Russians intentionally shot 
	down the plane and that the government of the time, primarily consisting of the Civic Platform 
	led by Donald Tusk, helped cover up the plot. When the PiS party regained power in 2015, 
	they launched their own investigation into the causes of the crash. The head of the PiS 
	investigation Antoni Macierewicz claimed that the investigation yielded definitive proof that 
	the crash was not an accident (Tilles 2022). To this day, the investigation has yet to provide 
	any evidence to overturn the conclusions reached by the former Polish and Russian 
	investigations. Families of the victims of the crash were granted access to the report. Barbara 
	Nowacka, an opposition member of parliament whose mother died in the crash, was given 
	access to the text, describing it as a “political report (…) that has very little to do with the real 
	evidence” (Tilles 2022). This highlights the fact that the PiS interpretation of Polish history has 
	a significant effect on their political discourse. <br/><br/>

	<h4>Section II.b: Pedagogy of shame.</h4>

	A recurring theme that is observed among the discourse of PiS party officials is to characterize 
	any narrative that does not conform to the aforementioned victimhood view of Polish history 
	as “pedagogy of shame.” This type of discourse is described by PiS officials as a bad-faith 
	perspective of Polish history that is marked by exaggerating negative Polish national 
	characteristics or highlighting dark episodes of Polish history (Kobylarek 2020). As a result, 
	this allows the PiS party to label any opposing view under the same umbrella term which stifles 
	the development of a nuanced debate regarding Polish history. <br/><br/>

	A critical example of "pedagogy of shame" is the Jedwabne pogrom. This refers to a massacre 
	of Polish Jews in the city of Jedwabne in the summer of 1941 (Hackmann 2018). In 2001, the 
	president Aleksander Kwaśniewski issued a national apology after acknowledging that ethnic 
	Poles were responsible for the killings. Ten years later, the apology was repeated by president 
	Bronisław Komorowski. The current President Andrzej Duda has openly criticized his 
	predecessors’ apologies since the current president views the event as "an attack on Polishness, 
	Polish values and Polish identity" (Michlic 2017). Shortly after coming to power, the party 
	called for a re-evaluation of the Jedwabne pogrom, citing a misjudgment of the importance of 
	the role of nazis and communists in the affair (Ambrosewicz-Jacobs and Szuchta 2014). The 
	education Minister Anna Zalewska stated that the event should be viewed in the context of 
	German occupation, despite acknowledging the fact that ethnic Poles were responsible for the 
	killings. <br/><br/>

	Another example that is commonly labeled as pedagogy of shame is President Barack Obama's 
	2012 speech in Warsaw where he used the term "Polish death camps" to denote the 
	concentration camps used to exterminate Jews during the Second World War (Komorowski 
	2012). In response, Jaroslaw Kaczynski stated, "We need to make it clear today (…) the end of 
	the pedagogy of shame, the end of this constant expiation of our nation, for whatever reason, 
	self-blame, because this is what makes it easier and even encourages us to do this kind of 
	activity, it causes terrible losses for us" (Majmurek 2016). Subsequently, regulations became 
	tighter under the PiS party. This culminated in 2018 in the banning of public speech attributing 
	responsibility for the Holocaust to Poland (Bucholc 2019). <br/><br/>

	<h4> Section II.c: Implementing a pedagogy of pride. </h4>

	In contrast, PiS party officials claim that any “pedagogy of shame” should be replaced with a 
	“pedagogy of pride”, a term used by various PiS Party officials including Jarosław Kaczynski 
	(Kazlauskaitė 2022) and education minister Przemysław Czarnek (Tilles 2021) placing an 
	overwhelming emphasis on the positive actions of Poles throughout history compared to the 
	dark episodes of Polish history (Ray and Kapralski 2019). When it comes to the Polish 
	historical curriculum, Czarnek claims that it is time for Poland to “finally end the pedagogy of 
	shame” and promote a “pedagogy of pride, as does every normal country in Europe and the 
	world” (Tilles 2021). While he does include that the curriculum should not forget about the 
	“ugly parts of Poland’s past”, he argues that an emphasis should be placed on “showing what 
	is beautiful in our history”. <br/><br/>
	
	To bring about this “pedagogy of pride” on a large scale, the PiS party has proposed a few 
	solutions which can be found in the official PiS party programme from 2019. In particular, we 
	focus on Chapter III.4 of the manifesto on the subject of education and Chapter IV.3 on the 
	notion of identity. To start, the PiS party aims to reform the Institute of National Remembrance 
	and use it as a tool in "shaping Polish identity" (Prawo i Sprawiedliwość 2019). The institute 
	dates back to the end of the Second World War. Its original purpose was to investigate and 
	prosecute nazi and communist crimes committed between 1917 and 1990. However, in 
	subsequent years, the Institute took on an academic role, documenting and disseminating 
	information about the aforementioned crimes (INR 2006). In recent times, some scholars have 
	criticized the Institute for being used as a political tool under PiS party rule (Ray and Kapralski 
	2019). These criticisms refer to the controversial 2018 amendment to the Act on the Institute 
	of National Remembrance, which penalizes public speech which attributes responsibility for 
	the Holocaust to Poland and of the Polish nation. The current president’s Andrzej Duda 
	defended his stance by stating that "carrying out the historical policy is one of the most 
	important activities of the president" (Duda 2015). Thus, protecting "the reputation of the 
	Republic of Poland and the Polish nation" at all costs can be seen as one of its core missions. <br/><br/>
	
	Furthermore, we claim that the PiS party aims to appoint museum directors whose views are 
	aligned with the party’s historical policy. To bring about a strong sense of Polish cultural 
	identity, the party mobilizes a network of around 30 museums to "spread the Polish point of 
	view" (Prawo i Sprawiedliwość 2019). In particular, some view the objective of these museums 
	as "pushing the narrative that the Poles have suffered just as much as the Jews during the 
	Holocaust" (Jaskułowski and Majewski 2022). To illustrate this, prior to the party's ascension 
	to power in 2015, the foyer of the Gdansk Second World War Museum included hundreds of 
	photographs of Jews that were murdered during the Holocaust. After PiS came to power, a 
	wall-sized photo of a Polish family that was killed for hiding Jews, along with information 
	regarding the proportion of the population killed in each country during the war were 
	subsequently displayed to stress the uniqueness of the Polish nation's suffering (Walker 2019). 
	The historian Paweł Machcewicz claims that the “main goal of these institutions is to introduce 
	the Polish and Central European perspective to the world's narrative and historical memory, 
	within which our experiences often take up little space and are not sufficiently known and 
	understood (...). And the best way to do this is to show the Polish experience in a historical 
	context, against the background of the experiences of other nations and of the entire European 
	continent and the world, because the Second World War was a global conflict. Such a view 
	does not pose a threat to “Polishness”; on the contrary, it allows a better understanding of the 
	specificity of Polish history’ (Machcewicz 2019). In addition, some authors have noted that 
	"since 2015, the Polish Museum landscape has turned into a battleground between politicians 
	and historians" (Etges et al. 2018). These scholars are referring to the party's attempts to dismiss 
	museum directors that did not share the party's historical perspective. For example, Dariucz 
	Stola, the former director of the POLIN Museum of the History of Polish Jews was pressured 
	by PiS officials to resign his position after winning in by popular vote (Bill 2020). Eventually, 
	the party succeeded by appointing Zygmunt Stepinski for the role in March 2020, a historian 
	whose views are aligned with the party's interpretation of history. This can be seen from the 
	fact that Stepinski was awarded the Knight's Cross of the Order of Polonia Restituta by 
	President Lech Kaczyński for "outstanding merits in activities for democratic changes in 
	Poland” (Kaczyński 2008). <br/><br/>

	Moreover, the manifesto also singles out the importance of the European Solidarity Center in 
	the city of Gdansk. Its aim is to circulate information about Gdansk shipyard strikes which they 
	claim is the "greatest phenomenon of Polish republicanism" (Prawo i Sprawiedliwość 2019). 
	The overthrow of communism in the western world is predominantly associated with the fall 
	of the Berlin Wall. However, the party is of the opinion that the significance of the Gdansk 
	agreements outweighs that of the fall of the Berlin Wall and that consequently institutions 
	should be created to "fight for the image of Polish Solidarity" (Prawo i Sprawiedliwość 2019). 
	For example, they are currently planning the establishment of another institution that is similar 
	to the European Solidarity Center in the city of Szczecin to commemorate the Szczecin 
	Agreements of 1980. <br/><br/>

	Lastly, the PiS party cites the downplaying of Polish history and literature as one of the main 
	problems afflicting the current Polish educational landscape (Prawo i Sprawiedliwość 2019). 
	To rectify this problem, PiS party proposes to implement a “patriotic education” component in 
	the Polish national curriculum. This is achieved through frequent school trips to the 
	aforementioned museums including the Warsaw Uprising Museum, the Second World War 
	Museum in Gdansk and the Cursed Soldiers Museum, all of which stress the victimization of 
	Poles throughout World War II (Kazlauskaitė 2022). They write that “students will be 
	acquainted with Poland's period of enslavement by communist regimes”. Moreover, they also 
	aim to instill "patriotic values" into students by using reading material that is appropriate and 
	consistent with the party's view of Polish history (Prawo i Sprawiedliwość 2019). Lastly, they 
	view "respect for national heroes'' as an important part of a student's education. However, the 
	virtue of the aforementioned goal depends on whom the party deems worthy of the title of 
	"national hero". To illustrate this last statement, the party displayed Romuald Rajs and Józef 
	Kuraś as "national heroes'' during a 2017 exhibition at the Gdansk Second World War Museum 
	(Tilles 2021) However, as commanders of underground partisan units, they committed crimes 
	against humanity, including the immolation of Jewish, Slovak and Belarusian civilians. In 
	essence, the overarching theme of the education reform has been described by critics as 
	"reducing education to the process of internalization of major national myths and transferring 
	a simplified vision of reality" (Zuk 2018). <br/><br/>

	<h3>The PiS Party Historical Policy and the European Union</h3>
	<h4>Section III.a: Legal autonomy of EU member states regarding the historical policy</h4>

	Poland has been a member country of the European Union (EU) since 2004. Thus, it is pertinent 
	to discuss to what extent does the PiS party’s historical policy outlined in section II agree with 
	guidelines provided by the EU. While the EU primarily focuses on issues regarding economic 
	integration, trade, and political cooperation, questions regarding historical narratives and 
	remembrance practices have naturally emerged within its framework (van Hecke 2003). 
	However, the EU does not possess a comprehensive set of guidelines or policies specifically 
	dedicated to historical representation (Littoz-Monnet 2012). Instead, historical representation 
	largely falls within the jurisdiction of member states' educational systems and cultural 
	institutions. Matters of historical narratives remain the responsibility of individual member 
	states, with the EU intervening only in cases requiring European-level action, as per the 
	principle of subsidiarity (van Hecke 2003). Consequently, member states retain considerable 
	autonomy in shaping their own historical narratives and remembrance practices. <br/><br/>
	
	Nevertheless, European integration efforts, such as the creation of the European Union itself, 
	have shaped historical narratives within the member states. The pursuit of a common European 
	identity has led to increased emphasis on transnational historical narratives that highlight 
	shared experiences, cultural heritage, and lessons drawn from the continent's past conflicts. 
	(Calligaro 2015). Efforts to promote historical dialogue and reconciliation, particularly among 
	countries with historically strained relationships, have been supported by EU initiatives 
	through the establishment of commemorative events and joint historical research projects 
	(Littoz-Monnet 2012). In particular, the “Active European Remembrance”, part of the “Europe 
	for Citizens Programme” from 2007 to 2013, aimed to preserve “the main sites and memorials 
	associated with the mass deportations, the former concentration camps and other large-scale 
	martyrdom and extermination sites” of Nazism and Stalinism “as well as the archives 
	documenting these events” (European Commision 2007). Additionally, this program aimed to 
	keep alive the memory of both the victims and those who participated in the saving of potential 
	victims (European Commision 2007). <br/><br/>

	However, this “Active European Remembrance” action received criticism for its focus on 
	imposing a “singular remembrance culture” (Prutsch 2013). This emphasizes the need for 
	member states to critically assess their own national history outside of National Socialism and 
	Stalinism (Prutsch 2013). Thus, in 2013, support policies promoting a critical “European 
	culture of remembering” were proposed (Prutsch 2013). In any case, the historical policies of 
	EU member states are expected to “approach Europe’s past on the foundation of European 
	core values, create an open sphere of discussion, address uncomfortable segments of national 
	histories, base judgements of the past exclusively on the examination of historical facts, 
	and acknowledge the potential risks in legislating for a specific view on or memory of the 
	past” (Prutsch 2013). The core values on which the member states should base their historical 
	policies are listed in article two of the Lisbon Treaty and developed in the EU Charter of 
	Fundamental Rights (European Union, 2012). <br/><br/>

	<h4>Section III.b: The compatibility of the PiS party’s historical policy with the EU’s expectations</h4>

	At first glance, the PiS party's historical policy seems to exhibit both converging and diverging 
	aspects in relation to the expectations of the European Union. On the one hand, Poland’s 
	commemorative institutions such as the Warsaw Uprising Museum and the European 
	Solidarity Centre in Gdansk strongly emphasize the remembrance of the victims of National 
	Socialism and Stalinism (Kazlauskaitė 2022). As such, one might conclude that the PiS party 
	is not afraid to address uncomfortable and dark periods of Poland’s history, however, the PiS 
	party’s victimhood narrative in tandem with the pedagogy of pride prevents the Polish nation 
	from addressing episodes where ethnic Poles were seen as perpetrators. For example, the PiS 
	party refuses to attribute full responsibility to the ethnic Poles that were responsible for the 
	Jedwabne pogrom, stating that the event should be interpreted in the context of German 
	occupation (Ambrosewicz-Jacobs and Szuchta 2014). In other words, the PiS party is only 
	willing to address dark episodes of Polish history as long as Poles are viewed in a position of 
	moral superiority (Ray and Kapralski 2019). The overwhelming emphasis on positive actions 
	of Poles along with the downplaying of dark episodes of Polish history raises concerns about 
	historical accuracy and objectivity brought by the historical policies of the PiS party. What is 
	more, this pedagogy of pride allows for the PiS party to group any opposing view under the 
	same label of pedagogy of shame which stifles the development of a nuanced debate regarding 
	Polish history (Ray and Kapralski 2019). Ultimately, the EU advocates for a balanced and 
	factual representation of history (Prutsch 2013) and the historical dogma implemented by the 
	PiS party that accentuates occurrences of Polish heroics and diminishes the uncomfortable 
	actions of ethnic Poles is in direct contradiction of those expectations. <br/><br/>

	Furthermore, the PiS party’s amendment to the Institute of National Remembrance, banning 
	public speech attributing responsibility for the Holocaust to Poland contradicts the freedom of 
	expression and information listed in article 11 of the EU Charter of Fundamental rights that 
	states: “Everyone has the right to freedom of expression. This right shall include freedom to 
	hold opinions and to receive and impart information and ideas without interference by public 
	authority and regardless of frontiers” (European Union, 2012). By imposing restrictions on 
	discussions about Polish involvement in the Holocaust, the PiS party's policy not only hinders 
	the pursuit of truth but also undermines the EU's commitment to human rights and open 
	discussion. Moreover, in its early stages, the amendment to the Institute of National 
	Remembrance was heavily criticized by various scholars and journalists (Ray and Kapralski 
	2019) before being ratified by the Sejm in 2018. This shows a failure to consider potential risks 
	in legislating for a specific view on or memory of the past. <br/><br/>

	A study in 2019 that was conducted in all EU Member States except Sweden, Portugal, Spain, 
	UK, Ireland, Malta and Cyprus concluded that Holocaust revision is ongoing in Europe with 
	central European members Poland, Croatia, Hungary, Poland, Croatia, and the Baltics bing the 
	worst offenders (Echikson 2019) The aforementioned study focused on how European 
	governments are minimizing their own guilt in the attempted extermination of Jews, which is 
	clearly on the agenda of the PiS party. In particular, its dismissal of museum directors and the 
	appointment of individuals who align with the party's perspective, raises concerns regarding 
	the politicization of cultural institutions. Such actions undermine the objectivity and academic 
	integrity of historical research and presentation. The PiS party’s historical policy and its efforts 
	to control historical representation to promote this specific, victimized version of Polish history 
	/ self-understanding restricts the diversity of narratives and impedes the development of a more 
	nuanced awareness which accurately describes Poles as both victims and perpetrators of 
	European history within the Polish context. <br/><br/>

	This is especially evident in the PiS party’s appointments of museum directors and newer 
	cultural institutions, previously mentioned in section II.c, which reinforce a narrative that not 
	only promotes the image of Polish victimhood but also downplays or omits certain historical 
	episodes that may complicate or challenge the preferred narrative. In doing so, the PiS party 
	facilitates an interpretation of Polish history that emphasizes the positive actions and 
	contributions of Poles while downplaying or disregarding instances that may reflect negatively 
	on the nation. By emphasizing the victimization of Poles throughout history, particularly during 
	World War II under Nazi Germany and the USSR, the PiS party fosters an already-present 
	sense of national identity rooted in resistance and resilience (Klajn 2018, Echikson 2019). This 
	narrative helps create a collective memory that positions Poland as a valiant defender of its 
	people and culture against external aggressors, reinforcing a sense of national pride and 
	solidarity (Klajn 2018). <br/><br/>
	
	Furthermore, Echikson describes Poland’s “historical understanding of itself as the ‘Jesus of 
	the Nations,’ a deeply religious country which has suffered for too long under the might of its 
	powerful neighbors” (Echikson, 2019). As the EU expects its members to encourage nuanced, 
	open, and factual discourse about their uncomfortable history, the discussion of Poland as 
	perpetrator and not only a victim of Nazism and Stalinism is necessary. However, this 
	discussion threatens many Poles’ understanding of their national identity (Echikson, 
	2019). Therefore, by promoting this victimized narrative, the PiS party strengthens its political 
	position by appealing to segments of the population that are skeptical of European integration 
	and to those who relate to Poland as the perpetual sufferer for Europe. The presentation of 
	Poland as a nation that has endured historical injustices and struggles against external forces 
	allows the PiS party to construct a narrative that fosters skepticism towards supranational 
	institutions like the EU, framing them as potential sources of infringement on Polish autonomy 
	and national identity. This selective approach to history serves the party's anti-European agenda 
	by encouraging a sense of national exceptionalism and self-sufficiency, reinforcing the notion 
	that Poland's interests and identity should take precedence over European integration and 
	cooperation. <br/><br/>

	Overall, the PiS party strategically employs a specific narrative of Polish history centered on 
	victimhood, resistance, and national identity to advance its anti-European agenda. By 
	constructing a collective memory that reinforces Polish exceptionalism, downplays negative 
	historical episodes, and portrays the supranational bodies as a potential threat, the party 
	strengthens its political support and increases skepticism towards European integration. 
	Through its control of cultural institutions and the circulation of a particular historical narrative, 
	the PiS party shapes public perception and influences the understanding of Polish history in a 
	manner that aligns with its anti-European objectives. <br/><br/>

	We attempt to explain the PiS Party’s anti-European stance by exploring to what extent the 
	history policy of the PiS party is incompatible with core European values. We argue that the 
	PiS party aims to portray Poland as a victim on the world stage, claiming that Poles have been 
	repeatedly mistreated by foreign powers throughout history. The PiS party claims that anything 
	that is not consistent with this view is regarded as pedagogy of shame. Instead, Poland’s history 
	should be viewed from a more positive perspective which is labelled as pedagogy of pride. 
	According to their 2019 manifesto, the PiS party aims to implement this pedagogy of pride 
	through various methods, including institutions such as the Institute of National Remembrance, 
	the Gdansk Solidarity Center and a network of museums including the Second World War 
	museum in Gdansk and the Warsaw Uprising museum. While EU member states are free to 
	determine their historical policy as they see fit, they should follow certain guidelines which are 
	consistent with the core values of the EU. Namely, member states should create an open sphere 
	of discussion, address uncomfortable segments of national histories, base judgements of the 
	past exclusively on the examination of historical facts, and acknowledge the potential risks in 
	legislating for a specific view on or memory of the past. We argue that the historical policy of 
	the PiS party violates every single guideline outlined above. These incompatibilities help 
	understand the motivation behind PiS party’s scepticism towards supranational institutions 
	such as the EU.`;

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
	var title = `Populists Explain the World:<br/>
	The Narrative of the Polish PiS Party about
	the Refugee Crisis in 2015`;
	var text = `1. Introduction<br/><br/>
	
	“Migrants carry ‘parasites and protozoa,’ warns Polish opposition leader.” (Cienski, 2015).
	This statement by Jarosław Kaczyński, the leader of the Polish party Prawo i Sprawiedliwość
	(Law and Justice, later referred to in this essay as the PiS party or PiS) hit the headlines
	shortly before the Polish parliamentary elections in October 2015 (Cienski, 2015). How was
	it possible that in the 21st century a politician from an Eastern European country would
	launch such a verbal attack on people from war-torn countries seeking refuge in Europe?
	(Carnegie Europe, 2015)<br/><br/>

	In order to situate this claim, the broader political context at that time must be considered. In
	2015, Europe faced the largest influx of asylum seekers in decades, as around 1.3 million
	people, mainly from Syria, Iraq, and Afghanistan, sought protection in Europe. (Luxton,
	2016). At the same time, European right-wing populism was strengthened (Halikiopoulou &
	Vlandas, 2022). This suggests that the refugee crisis might have enabled right-wing
	populism in Europe to thrive. One country which seemed to be affected by both
	developments was Poland. Shortly after the peak of the refugee crisis in 2015, the
	conservative and Eurosceptic PiS party won the parliamentary elections with 37.6% of the
	votes, marking the beginning of this party’s rule in the country (BBC News, 2015). During the
	election campaign, but even more so since taking office, PiS has also polarised within and
	divided the EU on the migration issue, as demonstrated by its refusal to meet its
	responsibility to receive refugees from the European Mediterranean neighbours in 2015
	(Cienski, 2017).<br/><br/>

	In this essay, we analyse the PiS party’s populist narrative about the refugee crisis in 2015,
	in order to understand how PiS could win the elections and later justify its harsh policy
	towards refugees. Furthermore, this paper will also contain a historical component. Given
	that 97% of the Polish population is ethnically Polish and 95% catholic (UNHCR, 2007), this
	paper will consider whether and, if so, how Polish populists dealt with Poland’s historical
	development towards this ethnically and religiously homogeneous population in their
	narrative. Drawing on academic literature on Polish history, politics, and discourse, this
	paper argues that the PiS party’s narrative on the refugee crisis deliberately lacked
	information about Poland's complex historical relationship to migration, because otherwise
	the populists' claimed battle of “good” Poles against “evil” refugees and “elitist” EU
	institutions would not have worked.<br/><br/>

	The essay proceeds as follows: First, we clarify what is meant by right-wing populism before
	elaborating on Yanchenko’s concept of the populist narrative. These theoretical foundations
	of the paper are essential, as they allow us to justify why the Polish PiS party can be
	considered right-wing populist and, therefore, can be expected to have created a populist
	narrative on the refugee crisis. Second, we will briefly review how Poland has historically
	emerged as an ethnically and religiously homogeneous state. Based on this historical
	background and Yanchenko’s concept of the populist narrative, we will then examine the PiS
	party’s portrayal of refugees, the EU and its Western European member states as well as
	Poland in their narrative on the refugee crisis, paying attention to references to historical
	facts.<br/><br/>
	
	2. Setting The Groundwork: What the PiS Party Has to Do
	with Right-Wing Populism <br/><br/>

	The year 2015 not only saw the refugee crisis, but also the rise of right-wing populism
	(Halikiopoulou & Vlandas, 2022). In order to comprehend how populists perceive the political
	reality, it is necessary to explain populism and in particular its right-wing version, to define
	the populist narrative, and to justify why the Polish PiS party can be considered right-wing
	populist.<br/><br/>

	2.1. Defining Right-Wing Populism and Presenting the Concept of the
	Populist Narrative<br/><br/>


	Although since the turn of the millennium the populist Zeitgeist, as Mudde puts it, has
	attracted scholarly attention, no agreement on a common definition of this phenomenon has
	been reached (Mudde, 2004). Yanchenko’s (2021) pioneering concept of the populist
	narrative, which is the key concept for this essay, seems to have been inspired by Mudde’s
	definition of populism. <br/><br/>

	The Dutch political scientist Cas Mudde (2004) defines populism as an ideology which
	divides society into “two homogeneous and antagonistic groups, ‘the pure people’ versus
	‘the corrupt elite’” (p. 543). Seen in this light, populism is to be understood as a rejection of
	elitism and pluralism. According to populists, the “evil” elite abuses politics only to represent
	the elite’s and not the people’s interests (Mudde, 2004). Hence, populism demands that
	politics should represent the general will of the people (Mudde, 2004). In terms of
	constructing the society, populism denies the existence of a society composed of different
	groups and individuals, each with their own beliefs, preferences, and desires (Mudde, 2004).
	Instead, populism assumes the people to be a homogenous group which defines itself as
	being the opposite of the elite (Mudde, 2004). But what then characterises right-wing
	populism?<br/><br/>

	Mudde (2004) observes that populism can be described as a “thin-centred ideology” (p.
	544). This means that populism as an ideology is not as sophisticated and, therefore, should
	be distinguished from other political ideologies such as liberalism or socialism. Rather, along
	this definition, populism and other political ideologies, such as nationalism, can coalesce to
	form a more specific type of populism (Mudde, 2004).<br/><br/>

	When it comes to delineating right-wing populism, Anton Pelinka’s definition should be taken
	into account. He posits that “[a]ny kind of populism directed against an ethnically and/or
	nationally and/or religiously defined ‘other’ can be seen as ‘right wing’” (Pelinka, 2013, p. 7).
	Right-wing populism is thus a political ideology that combines elements of conservative or
	right-wing ideology with populist rhetoric and policies. In keeping with Pelinka’s definition,
	right-wing populism typically emphasises the importance of national identity, cultural
	traditions, and a strong, authoritarian leader who can protect the country against perceived
	threats from immigrants, globalism, and other outside forces. It also tends to reject liberal
	values and institutions, such as human rights, pluralism, and the rule of law, in favour of a
	more authoritarian and nationalist approach to governance (Kinowska-Mazaraki, 2021). In	light of these elements of right-wing populism, the question arises as to how they are
	reflected in Yanchenko’s concept of the populist narrative. <br/><br/>

	Broadly speaking, Yanchenko defines the populist narrative as <br/><br/>

	<center>“a politically relevant story about the conflict between a positive homogenous in-group and a
	negative homogenous out-group with the latter being hierarchically higher than the former”<br/><br/>
	
	(Yanchenko, 2021, p. 14).</center><br/><br/>
	
	Based on this definition, Yanchenko identifies six elements, three of which are necessary for
	a narrative and the remaining three for a narrative’s populist character. Although Yanchenko
	argues that all these attributes need to be sufficiently present for a narrative to be labelled
	populist, for the purposes of this essay, the focus will be on the populist features of this
	concept (Yanchenko, 2014). It is, nevertheless, interesting to shortly clarify what Yanchenko
	means by a political narrative.<br/><br/>

	From a narratological perspective, Yanchenko (2021) expects a political narrative to consist
	of a plot, characters and a political meaning. While a plot, typically in the form of a beginning,
	a middle and an end, describes a sequence of events, the characters, typically being heroes,
	victims or villains, can either actively influence this sequence of events or are affected by
	them. Interestingly, Yanchenko argues that in political narratives not only different groups of
	human beings can be characters, but also political or economic phenomena such as inflation
	or democracy. In order for a narrative to have a political meaning, two conditions are to be
	met. First, the story must have a moral, which gives the narrative a meaning. Often,
	however, the meaning intended by the narrator can differ from the meaning recipients
	ascribe to the narrative. Second, this meaning is considered political if a narrative concerns
	a community’s or a society’s way of life and organisation.<br/><br/>

	Concerning the populist characteristics of the populist narrative, Yanchenko seems to adopt
	Mudde’s definition of populism. In particular, Mudde’s juxtaposition of two seemingly
	homogenous people on which populism relies, but also the populists’ moral judgement that
	the elite acts against the will of the moral people, is reflected in Yanchenko’s concept
	(Mudde, 2004).<br/><br/>

	Yanchenko (2021) argues that a political narrative can be labelled populist if three common
	elements of populism are translated into the narrative. A populist narrative captures the
	people-centric nature of populism by having a positively presented in-group which
	represents “the people”. This in-group finds itself in a conflict with a negatively depicted
	out-group which refers to the anti-elitist feature of populism. In the populist narrative, the
	negatively represented out-group, being either the political establishment, rich people,
	intellectuals or media representatives, are accused of acting immorally, inefficiently, selfishly
	or even depriving the people of their political power. In accordance with the anti-elitist
	feature, this out-group also has a hierarchical higher standing and is, therefore, more
	advantaged than the in-group. Furthermore, it is important to note that both groups constitute
	“homogenous entities”. Subsequently, the in- and out-group are exclusively positively or
	negatively presented respectively, without allowing for the possibility of characters belonging
	to multiple groups.<br/><br/>
	
	With these theoretical foundations in mind, the tracing of these populist elements in the PiS
	party’s discourse during the refugee crisis from 2015 until 2017 will be more clear. However,
	it still needs to be justified why PiS can be considered a right-wing populist party and can,
	therefore, be assumed to have adopted a populist narrative during this crisis.

	2.2. The PiS Party - a Right-Wing Populist Organisation <br/><br/>
	The PiS party, which has been in power in Poland since 2015, can be classified as a
	right-wing populist party for several reasons. The party's platform is based on traditional
	conservative values, including the importance of family, religion, and patriotism (Kaczyński,
	2020). Hence, the PiS party has been pursuing policies that appeal to nationalist sentiments,
	such as promoting the use of the Polish language. One such government initiative is the
	NAWA Programme, which seeks to “promote the Polish language related to elements of
	Polish history and culture by financing undertakings contributing to improving the quality of
	teaching Polish as a foreign language and its prestige, thus exerting a lasting impact on the
	image of Poland in the world” (NAWA, n.d.).<br/><br/>

	In order to protect the Polish people’s interests and defend the country’s sovereignty against
	external threats, PiS also emphasises the need for a strong, centralised government
	(Ministry of Foreign Affairs Republic of Poland, 2017). This is particularly reflected in its
	appeals to the Polish working class, which has felt left behind by globalisation and economic
	liberalisation. The party, therefore, has promised to provide greater social protections for
	workers, such as higher wages, more affordable housing, and increased access to
	healthcare (Ptak, 2019; Harper, 2019; Sussman, 2019). At the same time, this position has
	also resulted in the PiS party seeking to control the media and judiciary in order to
	consolidate power and limit dissent, with the “state-owned media in Poland hav[ing] become
	a propaganda tool of the ruling party”, and the government’s opponents being portrayed as
	‘‘enemies of the nation’ and ‘foreign forces’” (Żuk, 2020, p. 1).<br/><br/>

	On an international level, the PiS party has been critical of the European Union and its
	perceived encroachment on Poland's sovereignty, and has thus pursued policies that are
	often at odds with EU norms and values (Kinowska-Mazaraki, 2021). What, however, unites
	views articulated by the PiS party on both the domestic and international level is their
	communication that “contai[ns] clear and distinct messages due to the use of drastic
	vocabulary, which was to guarantee their resonance among the general public” (Jakusz,
	2019, p. 115). Furthermore, the PiS party's authoritarian tendencies and disregard for
	democratic norms and institutions have been a source of concern for many observers. The
	party has been accused of “undermining the independence of the judiciary system”,
	“violat[ing] democratic standards, such as excessive use of emergency powers and
	limitations of media freedoms”, and limiting the rights of minority groups, such as “LGBT
	groups’ which allegedly ‘threaten the integrity of the traditional Polish family and its values”
	(Gwiazda, 2021, p. 585; Mikuli, 2018, p. 1; Orzechowski et al., 2021, p. 147; Prawo i
	Sprawiedliwość, 2019, as cited in Gwiazda, 2021). In addition, its use of divisive rhetoric and
	the spread of conspiracy theories to stir up public support and consolidate power has also
	been viewed critically (Kinowska-Mazaraki, 2021). <br/><br/>

	Essentially, the PiS party can be considered a right-wing populist party due to its emphasis
	on nationalism, authoritarianism, and protectionism, as well as its appeal to the working class and rejection of liberal values and institutions. Additionally, its disregard for democratic
	norms and institutions has raised concerns about the erosion of democratic governance in
	Poland. <br/><br/>

	3. Historical Background: How Poland became an Ethnically and Religiously Homogeneous Population <br/><br/>
	
	Today, Poland’s ethnic and religious homogeneity stands out in Europe, as 97% of the
	population is Polish and 95% are catholic (UNHCR, 2007). Assuming that this fact and its
	historical background might have been a part of the PiS party’s populist narrative on the
	refugee crisis, this section provides an overview of Poland’s evolution towards an ethnically
	and religiously homogeneous population against which the PiS narrative could be
	understood. <br/><br/>
	
	3.1. The Initial Situation: A Multiethnic Polish-Lithuanian Commonwealth <br/><br/>

	The predecessor of what is today known as Poland was the Polish-Lithuanian
	Commonwealth (PLC), having officially lasted from 1569 to 1795 (Friedrich & Pendzich,
	2009). This state was much larger than modern-day Poland and, at the height of its
	expansion, occupied territories from the Baltic Sea to the Northern part of the Carphatian arc
	(Wandycz, 1984). As a result, various ethnic and religious groups became part of Polish
	society and, therefore, Polish identity. Through different political acts and decisions, such as
	the act of the Warsaw Confederation, tolerance towards other ethnicities such as
	Lithuanians, Ruthenians, Germans, and Tatars as well as followers of religions other than
	the Roman Catholic faith such as Orthodox, Jews and Muslims was ensured (Buchowski et
	al., 2010). For several centuries, the PLC was thus indeed a heterogenous state with regard
	to its composing ethnic groups. <br/><br/>

	However, the PLC’s ethnic and religious heterogeneity was lost due to the partitions, as
	discussed in Buchowski et al. (2010) and Wandycz (1984). After the first partition in 1772,
	the PLC was split between Prussia and the Habsburg and Russian Empires. With each
	subsequent partition, more and more of the lands were taken away, reducing the PLC in
	both size and ethnic diversity. The final partition of 1795 meant the end of a truly
	independent PLC and thus Poland, at least until after the end of World War I (Wandycz,
	1984). <br/><br/>

	Under the rule of the aforementioned empires, the lives of Poles and other ethnic groups, at
	all strata of society, drastically changed. Lands were taken away, a new bureaucracy was
	imposed, and Polish culture as a heterogeneous entity was gone (Wandycz, 1984). Yet,
	Poland was not forgotten. Culturally speaking, Poland persisted as a phenomenon in the
	minds of the Polish people who still believed that Poland could exist again sometime. Due to
	the increase of nationalistic idealism in the 19th century across Europe, the concept of the
	Polish identity shifted from an idea based on diversity to one based on mono-ethnic ideals,
	leading to the rise of Polish nationalism and the idea of Poland as it is known today
	(Wandycz, 1984). Following World War I, Poland was revived as a state, though it had
	already existed as a nation for the people in the occupied lands. Still, Poland’s existence
	was threatened from the start by the Red Army of the Soviet Union. However this threat was
	countered by the Poles, succeeding thus in becoming an independent state and nation with
	no immediate threats. At the start of World War II, Poland was thus larger than its modern
	form, though not as large and as diverse as the PLC. <br/><br/>

	3.2. The Turning Point: World War II and Its Aftermath <br/><br/>

	World War II and its immediate aftermath marked a turning point in Polish history regarding
	its ethnic composition. The three reasons historians usually give for this are that the mass
	killings during World War II, as well as the border changes and the associated mass
	expulsions afterwards, led to Poland becoming ethnically homogeneous (Davies, 2004).
	On the one hand, the German occupation at the beginning of the war led to an almost total
	extermination of the Jews living in Poland. As Ther (2014) explains, in their efforts to
	establish an ethnically homogeneous Lebensraum, the German occupiers targeted both
	non-Jewish and Jewish Poles. However, both groups were differently affected. While Polish
	Jews were sent to ghettos or quickly killed, non-Jewish Poles were treated less “harshly” by
	the Germans. In fact, the Germans even planned to resettle around 17 million Poles outside
	the territory of the German Lebensraum, while later they also considered to declare some
	Poles assimilable or to exploit them as labour slaves (Ther, 2014). That is not to say that one
	is more acceptable than the other, but after the end of World War II, the differences in
	treatment were reflected in the number of survivors. According to historians, around 80
	percent of non-Jewish Poles did survive the German occupation, whereas only 10 percent of
	the Jewish Poles did (Ther, 2014). <br/><br/>

	On the other hand, in the aftermath, Polish borders were newly defined, leading to a
	migration of different ethnic groups. Already at the 1943 Tehran Conference, the three Allies
	being the UK, the USA, and the USSR, decided that Poland’s territory should be reordered.
	In accordance with their power interests and the defeat of the Germans in Stalingrad, the
	USSR was promised most Polish eastern territories (Ther, 2014). As a consequence,
	Poland’s western border was moved further west to the Oder river after the war, which was
	to be accompanied by a creation of an ethnically homogeneous population. Churchill and
	Roosevelt, in particular, were convinced that for the future, an ethnically mixed population
	should be avoided in this region, which would be possible thanks to new technologies and
	modes of transportation (Ther, 2014). So while Germans were expelled and resettled, Poles
	migrated from what was now Soviet territory to the newly demarcated Poland (Ther, 2014).
	Also, the Ukrainian minority in Poland was affected by the post-war homogenisation. Of the
	roughly 700,000 Ukrainians living in Poland, 482,000 were sent to the Ukrainian SSR in the
	first two years after 1945 (Ther, 2014). World War II and its aftermath, thus, led to today’s
	Polish state being predominantly made up of ethnic Poles for the first time in history, a
	situation that deepened during the communist era. <br/><br/>

	3.3. The Result: An Ethnically Homogeneous Population in the 1990s <br/><br/>

	Today’s idea of an ethnically homogenous Polish population belonging to the Polish state
	was the result of communist and post-communist policies. During the communist era, the
	Polish government pursued policies which promoted the dominance of ethnic Poles
	(Majewicz & Wicherkiewicz, 1998). This included the suppression of minority languages and
	cultures and the assimilation of non-Poles into Polish society. While these policies were
	often denounced for their heavy-handedness, they did contribute to a greater sense of
	national unity and a shared Polish identity among the population, which became especially
	evident in the aftermath of communism (Majewicz & Wicherkiewicz, 1998).
	After the fall of communism in 1989, Poland experienced a period of rapid political and
	economic transformation (Gomułka, 2016). Besides building a modern, democratic state and
	promoting economic growth and development, the government also put a renewed emphasis
	on national identity and unity. Therefore, policies were introduced, which should preserve
	and “[uphold] cultural or ethnic identity” among Polish people, as well as, history, traditions
	and values (Gwiazda, 2021, p. 582). Additionally, the government sought to strengthen ties
	between ethnic Poles living in Poland and those living abroad, in order to foster a sense of
	shared identity and culture among all Poles. This was important, as, according to Borowska
	(2017), “[t]he teaching of the Polish language and its promotion among Poles and people of
	Polish descent living abroad is a major component of national identity and the promotion of
	Polish tradition and culture” (p. 229). In that way, the Polish state thus hoped to address as
	many people with Polish roots and foreigners as possible (Borowska, 2017). Another key
	factor contributing to Poland's homogeneity was the influx of return émigrés from the British
	Isles between 2007 and 2009 after the financial crisis had also hit Ireland and the UK (Hołda
	et al., 2011). This only strengthened the country’s homogeneous ethnic composition (Hołda
	et al., 2011) and “constitute[d] a symbolic affirmation of Polish collective identity” (White,
	2014, p. 27). <br/><br/>

	In conclusion, the country’s ethnic and religious homogeneity is only a fairly recent
	phenomenon, because there has never been an era in earlier Polish history when
	exclusively Polish people lived on Polish territory (Davies, 2004). Poland's shift towards
	ethnic homogeneity was the result of a combination of historical factors and contemporary
	policies aimed at promoting national unity and identity. While the country's homogeneity has
	been praised for its contribution to a sense of shared culture and identity among the
	population, it has also been criticised for its exclusion of ethnic minorities and their cultures.
	In light of the refugee crisis in 2015, it is now interesting to examine whether the PiS party’s
	narrative referred to history and if so, whether it reinforced the “traditional nationalist
	mythology linking the Polish ‘land’ exclusively with the Polish ‘nation’” (Davies, 2004, p. 143). <br/><br/>
	
	4. Analysing the PiS Party’s Narrative of the Migration Crisis <br/><br/>

	4.1. The 2015 Migration Crisis, Poland and the Rise of the PiS Party <br/><br/>

	With around 1.3 million people seeking asylum in EU member states, Norway, and
	Switzerland, the migration crisis in 2015 posed a challenge to Europe and the EU in
	particular (Luxton, 2016). The main trigger for this crisis was the war in Syria. Since the war
	had been going on in this country for four years, Syrians who were still living in Syria or who
	had already fled to neighbouring countries felt helpless and, therefore, wanted to come to
	Europe in the hope of building a new life there. Likewise, people from Eritrea and Somalia,
	who were persecuted and oppressed because of their identity, believed they could easily
	reach Europe by taking the Balkan route through Turkey and Greece (Carnegie Europe,
	2015). As transport costs became cheaper at that time and the refugees could not stay in the
	African countries at the Mediterranean coast, they made their way to the European continent
	(Carnegie Europe, 2015). <br/><br/>

	Interestingly, Poland was not as strongly affected by the refugee crisis as one would
	assume. In fact, Poland was not directly located on the Balkan route, while most refugees
	also avoided entering that country, because they did not want to stay there (Klaus et al.,
	2018). Prior to 2015, migration as a topic was not broadly present in Polish politics, media,
	or in society (Krzyżanowska and Krzyżanowski, 2018). Only the refugee crisis, its related
	policies and the PiS party’s success in including this issue in its electoral campaign led to
	migration becoming for the first time a topic of national debate (Hargrave et al., 2022). The
	main impetus for this was the decision of the then resigning Polish government to implement
	the EU refugee resettlement and relocation scheme by agreeing to take in 7,000 refugees in
	2016 and 2017 (Klaus et al., 2018). However, once the PiS party was in government, Poland
	withdrew from this commitment (Klaus et al., 2018). <br/><br/>

	At home, the PiS government also decided to take a tougher stance on refugees. More
	restrictions were introduced against people seeking international protection, and the Polish
	police became stricter toward refugees arriving at the Polish-Belarusian eastern border
	(Klaus et al., 2018). The perception of migrants as a security threat to Poland was probably
	best reflected in an anti-terrorism bill passed in June 2016. Assuming that any foreigner on
	Polish territory, including other EU citizens, could potentially pose a threat to Poland’s
	security, the Polish police was authorised to monitor foreigners’ communication with other
	persons as soon as there was a suspicion that that person might be involved in terrorist
	activities. This did not require the foreigner to know about it, nor did the act guarantee
	judicial control. Moreover, the Interior Minister could immediately expel foreigners accused of
	involvement in terrorist activity (Klaus et al., 2018). But how exactly could the PiS party
	justify such harsh refugee policies? In order to answer that question, the PiS party’s
	narrative about refugees must be closely examined. <br/><br/>
	
	4.2. The Refugees: The Dangerous Others <br/><br/>

	The first and most obvious antagonists in the PiS party’s narrative were the refugees who, in
	Yanchenko’s words, were portrayed as a negatively depicted out-group (Kabata and Jacobs,
	2022). First and foremost, refugees were not seen as peaceful individuals looking to escape
	the horrors of conflict, but rather as violent terrorists (Kabata and Jacobs, 2022). PiS
	exacerbated this by casting refugees not only as terrorists in the classical, but also in a
	cultural way. They were seen as “non-integrable”, “forcing” their culture onto Poland that had
	accepted them (Kabata and Jacobs, 2022), being a significant threat to “European culture”
	and most importantly to Polish values. By doing this, PiS painted refugees as a threat to
	Polish society and thus Polish identity. <br/><br/>

	Furthermore, refugees were not seen as people in need, but rather PiS emphasised that
	they were “different” from what the Polish society expected. That is, refugees were part of
	groups that did not fit into Polish society. Othering the refugees further separated them from
	what is considered to be a “true” Polish individual, resulting in seeing refugees not as equal
	humans but rather as “others”. This process mainly focused on the refugees’ religion, the 
	Islam, as opposed to the predominant religion in Poland, Roman-Catholicism. PiS added to
	the refugees’ image by in fact depicting what their “desired” migrants were: white, Christian,
	and Eastern European - all traits that describe Poland in general. Such an explicit
	description only served to cast aside any other immigrant, be it an economic migrant or a
	refugee, solely based on characteristics that did not align with Polish ideals, because they
	could not “integrate” into the Polish society (Kabata and Jacobs, 2022).
	Finally, the element that completes this image is the linguistic aspect. Yermakova (2019)
	argues that PiS intentionally did not use the word “refugee” or “asylum seeker” but rather
	“migrants” in order to other the refugees that are not part of the “accepted group”. Since the
	word “migrant”, in Polish “migracyjny”, has negative connotations (Krzyżanowska &
	Krzyżanowski, 2018), this further insinuated that “migrants” were not welcome in Polish
	society.<br/><br/>

	While PiS portrayed refugees in a negative light, it is also important to know how Poles
	themselves viewed refugees. With the refugee crisis happening and migration becoming a
	hot-button issue, more and more Poles started voicing their opinions, even those with
	controversial takes that followed PiS's ideology. Narkowicz (2018) presents this increase,
	and mentions some of the involved communities. On the one hand, there were the people
	agreeing with PiS, riding on the wave generated by the electoral win of PiS and their agenda
	on migration, and those that went a step further and incited acts of violence against migrants
	or other "foreign" communities. On the other hand, social movements were pushing against
	this anti-migration tide, which rose as a response to the ever-increasing xenophobic points
	presented by the other side (Narkowicz, 2018). Still, Kabata and Jacobs (2022) mention that
	during the refugee crisis the Poles’ acceptance of refugees has dropped significantly, from
	75% to just about 33%. During the crisis the image of refugees had dramatically worsened,
	with more Polish people considering them as being detrimental or even a threat to their way
	of living. This might be attributed to the narrative pushed by PiS, though it is unlikely to be
	the only factor given Poland’s history on migration. <br/><br/>

	4.3. The EU and Western European Member States: the Leftist and
	Elitist Villains <br/><br/>

	The other and more active antagonist in the PiS party’s narrative was the EU and its
	Western European member states. In relation to these actors, PiS adopted a dynamic of “us”
	against “them”, which was usually used to visualise Poland’s struggle against the elites in
	Brussels, who, according to their narrative, were more receptive to the interests of the older,
	Western European member states (Yermakova, 2019). Depending on which translations and
	sources the analysis is based on, the portrayal of the EU and EU partners in the PiS
	narrative will be less or more extreme. <br/><br/>

	Kabata and Jacobs (2022) would suggest that the PiS government depicted the EU rather as
	a weak actor going down the wrong road. Their analysis reveals that PiS pointed out the
	mistakes in the EU’s crisis management. Among other things, the EU was accused of not
	having closed the external borders, of playing with the security of Europeans, and of failing
	to register the refugees’ identity (Kabata and Jacobs, 2022). Using Brussels as a scapegoat
	provided the PiS government with the ideal justification for rejecting the EU relocation
	mechanism not least because this raised serious security concerns (Kabata and Jacobs,
	2022). Simultaneously, the PiS narrative insinuated the EU to deviate from Christian values
	and to try to act in a politically correct way (Kabata and Jacobs, 2022), as the following quote
	by PiS member of parliament Pięta shows (as cited in Kabata and Jacobs, 2022, p. 8): <br/><br/>

	<center>“Western Europe lost its identity fighting against Christianity. The European left
	destroyed the spirit of community. Social egoism, which is the leading idea of the
	liberal-left states of the Old Continent, turns out to be deadly for Western
	communities. It turns out that Western European societies have lost their instinct for
	self-defence, and despite the deaths of hundreds of innocent people, they still intend
	to plunge into the absurdities of false tolerance and political correctness.”</center><br/><br/>

	This quote demonstrates that the PiS especially thought that so-called left-wing politicians of
	Western European countries wanted refugees to enter the EU, throwing Christian morality
	overboard. In that way, however, the image of an EU in crisis was only reinforced.<br/><br/>

	In contrast, Yermakova’s (2019) analysis is more concerned with the PiS narrative’s
	treatment of the EU relocation mechanism. In her view, PiS characterised the EU as a
	demon whose bureaucratic elites lacked democratic legitimacy (Yermakova, 2019). In
	particular, the PiS narrative sought to convince the Polish people that the relocation
	mechanism had been “forced” on Poland, which was not true though, (Yermakova, 2019)
	and that Poland would oppose “the forced relocation of refugees” (PiS, 2017, as cited in
	Yermakova, 2019, p. 188). Moreover, PiS argued that “[n]obody [could] impose a migration
	policy on [Poland]” and that the EU was pursuing “the policy of pressure” (PiS, 2017, as cited
	in Yermakova, 2019, p. 189). Instead, the PiS party insisted that Poland had the right to
	“decide who [Poland] want[s] to accept, whom [Poland] want[s] to accept temporarily, and
	whom [Poland] do[es] not want to accept” (PiS, 2018, as cited in Yermakova, 2019, p. 188). <br/><br/>
	
	However, not only has the EU been called hypocritical, but the PiS party’s narrative also
	gave the impression that the EU was abused by politicians from Western European member
	states. It suggested that Germany and her then chancellor Angela Merkel made a mistake
	by opening its borders, which was not only a sign of “authoritarian” politics but also a breach
	of EU decision-making procedures (PiS, 2017, as cited in Yermakova, 2019, p. 184).
	Therefore, the EU’s response to this fatal decision, in the form of implementing the relocation
	mechanism, was “a complete mistake” (PiS, 2017, as cited in Yermakova, 2019, p. 184) and
	should be “a wakeup call showing the hypocrisy of the Brussels elites” (PiS, 2017, as cited in
	Yermakova, 2019, p. 184). The EU institutions were thus blamed for wanting to vouch for
	Germany’s mistakes. <br/><br/>

	As a result, the EU and its Western European member states played the role of villains in the
	PiS party’s narrative of the migration crisis. Due to the strong and bad influence of the
	Western European states, the Brussels elites made decisions in the interest of Western
	European leaders, according to the narrative. At this point, Poland’s role came into play. <br/><br/>

	4.4. Poland: a Victim Becoming a Hero <br/><br/>

	In the PiS party’s narrative, the Polish population, in whose name PiS claimed to act, was
	depicted as the positive in-group. As already mentioned above, the PiS narrative featured a
	pronounced “us vs them” dynamic, with the “us” referring to the PiS government speaking on
	behalf of the Polish population. However, the “us” also sometimes included the Visegrad
	countries or the central and eastern European region in general (Yermakova, 2019). Above
	all, however, PiS saw the Polish population and state threatened in mainly two ways.<br/><br/>
	
	First, the PiS party wanted to ensure the “security of Poland and Poles” (PiS, 2015, as cited
	in Yermakova, 2019, p. 183). Claiming that sharia law would already apply in other Western
	European countries such as in Sweden, France, the UK, or Germany, PiS maintained that
	Poles should be able to move freely without fear that something bad might happen to them
	in their own country (PiS, 2017, as cited in Yermakova, 2019, p. 186). Against this backdrop,
	the most important task for the party was to avoid a similar development by prioritising the
	security of their citizens (PiS, 2017, as cited in Yermakova, 2019, p. 186), as reflected in
	published PiS documents with the titles “Security of Poles is our priority” (PiS, 2017, as cited
	in Yermakova, 2019, p. 187) or “Poland defends its own interests today” (PiS, 2017, as cited
	in Yermakova, 2019, p. 188-189).<br/><br/>

	The second theme was the threat to Polish sovereignty (Yermakova, 2019). Regarding this
	aspect, Yermakova even challenges the view that migrants were the main problem for the
	PiS party. Instead, she suggests that PiS feared that “[Poland’s] monopoly on
	decision-making (...) [was] jeopardi[s]ed by the EU” (Yermakova, 2019, pp. 188). The
	problem, then, was not migrants entering Poland. Rather, the problem was the EU’s decision
	to implement the relocation mechanism constituting a violation of Poland’s sovereignty,
	which was why PiS argued that “[the Poles] have the right to defend [their] sovereignty” (PiS,
	2015, as cited in Yermakova, 2019, p. 188). Indeed, the party claimed that “[s]uch a decision
	would abolish the sovereignty of the weaker member States of the European Union [and that
	the Poles] must oppose, because [they] are and will be masters in [their] own land” (PiS,
	2016, as cited in Yermakova, 2019, p. 188).<br/><br/>

	Portraying Poland as a victim of foreign oppressive powers, the PiS party insisted that the
	country had to resist the EU’s “evil” influence. More importantly, the PiS party’s narrative
	claimed that Poland was a hero, because it was willing to sacrifice itself, also in order to
	protect the interests of other Central and Eastern European countries (Yermakova, 2019).
	Using sometimes very strong language, mainly during the election campaign, PiS party
	members purported to save Poland “from [its] mortal enemies, people mad from hatred to
	our country [sic]” (PiS, 2015, as cited in Yermakova, 2019, p. 185). In this context, PiS
	presented itself as Poland’s only and true saviour, arguing, for example, that “(...) if it were
	not for the Government of Law and Justice and a tough policy in this matter, the Poles would
	not feel safe today [sic]” (PiS, 2017, as cited in Yermakova, 2019, p. 189).<br/><br/>

	However, the party’s narrative also knew how to play Poles against each other. On the one
	hand, PiS identified the Civic Platform party, which became the largest main opposition party
	after the election, as an enemy of the Polish people (Yermakova, 2019). Prior to the
	elections, this party had agreed to the EU resettlement programme, which was reason
	enough for the PiS party to accuse it of “[not being] able to conduct a sovereign migration
	policy and a sovereign policy towards the EU” (PiS, 2017, as cited in Yermakova, 2019, p.
	189). In order to personalise the image of the enemy, Donald Tusk, the Civic Platform’s party
	leader and the then President of the European Council, became the main target, as he was
	accused, for example, of “high treason” (Yermakova, 2019, p. 190) and “pursu[ing] German	
	interests” (Yermakova, 2019, p. 189). On the other hand, PiS considered anyone who was
	against their policies as an enemy of Poland. Hence, Poles who had another political opinion
	or favourised other values and demonstrated that publicly were blamed for “wan[ting] the
	Polish life to be disturbed” (PiS, 2017, as cited in Yermakova, 2019, p. 190).<br/><br/>

	All in all, the PiS party’s narrative portrayed PiS as the defender of Polish security and
	sovereignty, as Polanpainted the opposition in a bad light and attacked dissidents as traitors
	to the Polish state. <br/><br/>
	
	5. Conclusion <br/><br/>

	The narrative the PiS party spread about the refugee crisis in 2015 can be considered a
	populist narrative. Following the usual David versus Goliath, or good versus evil schema,
	their narrative tells the story of the battered but rising Poland fighting against the evil EU
	institutions and its Western European member states that have neglected the danger
	presented by the admission of Arab and African refugees in Europe. Interestingly, however,
	the analysis of the PiS narrative also reveals that the Polish right-wing populists did not
	invoke history to strengthen their argument. In particular, the period after World War II, which
	was marked by Poland's development into an ethnically and religiously homogeneous
	population, could have been used by the PiS party to support its claim that it must preserve
	the Polish population and identity. Instead, the results of the analysis suggest that the PiS
	party implicitly assumed that Poland has always belonged only to the Polish population. It is,
	therefore, not surprising that the narrative excluded a discussion of the multiethnic and
	religiously diverse PLC, because this would not fit into the populists’ worldview that the
	Polish population has always existed as a homogenous group. <br/><br/>

	This essay thus demonstrates how populists effectively wrap reality in a narrative in which
	the “good” people have to defend themselves against the “bad” and “elitist” enemies. In this
	respect, populists seem to aim at creating and telling a story which easily explains the
	political world to the people. Of course, populists do not have to refer to history to
	substantiate their narrative, but with the necessary historical knowledge, Polish people could
	have critically questioned the populist narrative. While this paper did not examine what
	Polish people know about the evolution of their country into an ethnically homogenous and
	religious state, the fact that the PiS party won the parliamentary elections in 2015 shows
	how strong and convincing the dynamic of “us” vs “them”of the PiS populist narrative must
	have been. Had the PiS party acknowledged that the Polish population, state and identity as
	they exist today are only a relatively recent phenomenon, their opposition of the “good”
	unified Polish population against the “evil” and “dangerous” refugees would not have worked.
	To reinforce this narrative, the populists have additionally integrated the EU, its Western
	member states and partly also dissenting Poles as evil actors into their narrative. <br/><br/>

	The challenge for Poles, but also for people in other countries, lies now in identifying,
	questioning, and criticising populist narratives, because they can strongly influence people’s
	perceptions of politics. With sufficient historical knowledge and a better understanding of
	populism, this will hopefully become possible despite an increasingly complex political world.`;

	return [title, text];
}