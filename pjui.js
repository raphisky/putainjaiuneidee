$(document).ready(function(){

	var ideas = [];

	noIdeas = function(){
		return ["Plus d'idée. Ajoute la tienne si tu en as une ! <br> <a class='typeform-share link' href='https://raphisky.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Ajouter une putain d'idée</a>"];
	}

	getIdeasFromFile = function(gss){
		var ideas = [];
		for(var el in gss.feed.entry){
			ideas.push(gss.feed.entry[el].title.$t);
		}
		return ideas;
	}

	getRandomIdea = function(ideas){
		var html = false;
		if(ideas.length > 0){
			var i = Math.floor(Math.random()*ideas.length);
			var r = ideas[i];
			ideas.splice(i, 1);
		} else {
			var r = getRandomIdea(noIdeas());
			html = true;
		}
		return [r, html];
	}

	printRandomIdea = function(ideas){
		var ideaArray = getRandomIdea(ideas);
		var idea      = ideaArray[0];
		var html      = ideaArray[1];
		var $display  = $('#idee_display');
		if(html)
			$display.html(idea);
		else
			$display.text(idea);
	}

	$.getJSON('https://spreadsheets.google.com/feeds/list/1954RrPSlDyFIyIsyjObpqDgKlPWBUaW2SUaV72j5oO0/2/public/basic?alt=json')
	 .done(function(ideas){
	 	ideas = getIdeasFromFile(ideas);
	 	console.log(ideas);

	 	//on load
	 	printRandomIdea(ideas)
	 	//au click
	 	$('.moar').on('click', function(){
	 		console.log(ideas.length);
		 	printRandomIdea(ideas);
	 	})
	 })
	 .fail(function(){
	 	// en cas de fail
	 	printRandomIdea(ideas)
	 })

})
