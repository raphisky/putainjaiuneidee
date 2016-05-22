$(document).ready(function(){

	noIdeas = function(){
		return ["Plus d'idée. Ajoute la tienne si tu en as une !"]
	}

	getIdeasFromFile = function(gss){
		var ideas = [];
		for(var el in gss.feed.entry){
			ideas.push(gss.feed.entry[el].title.$t);
		}
		return ideas;
	}

	getRandomIdea = function(ideas){
		if(ideas.length > 0){
			var i = Math.floor(Math.random()*ideas.length);
			var r = ideas[i];
			ideas.splice(i, 1);
		} else {
			var r = getRandomIdea(noIdeas());
		}
		return r;
	}

	printRandomIdea = function(ideas){
		$('#idee_display').text(getRandomIdea(ideas));
	}

	$.getJSON('https://spreadsheets.google.com/feeds/list/1954RrPSlDyFIyIsyjObpqDgKlPWBUaW2SUaV72j5oO0/2/public/basic?alt=json')
	 .always(function(ideas, textStatus){
	 	if(textStatus == "error")
	 		var ideas = noIdeas()
	 	else
	 		var ideas = getIdeasFromFile(ideas);

	 	console.log(ideas)

	 	//on load
	 	printRandomIdea(ideas)
	 	//au click
	 	$('.moar').on('click', function(){
		 	printRandomIdea(ideas);
	 	})
	 })

})
