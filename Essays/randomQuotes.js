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
	p_elem.style.transition = "ease 1s";
	p_elem.style.opacity = 0;
	p_elem.style.color = "white";
	p_elem.style.fontSize = "4vh";
	p_elem.style.fontWeight = "450";
	p_elem.style.textAlign = "justified";

	setTimeout(function() {
		document.getElementById("quote_text").innerHTML = title;
		p_elem.style.opacity = 1;	
		container.style.opacity = 1;
	}, 400);
}

function removeEssayText(){
	var quoteArea = document.getElementById('quote_area');

	
	setTimeout(function() {
		quoteArea.childNodes.forEach(child => { // to remove extra text instances
			if(child.nodeName == "P" && child.id == "essay_text"){
				child.style.opacity = 0;
				quoteArea.removeChild(child);
			}
		});
	}, 400);
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