$(document).ready(function(){

	var ideas = [];
	var idImgur = [];
	var sollications = ["Tu as sûrement une idée lumineuse à partager ! <br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Ajouter une idée lumineuse</a>","Plus on est de fous, plus on rit : <br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Ajouter une putain d'idée</a>","Toi aussi, participe :<br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Oh que oui</a>","Tu as sûrement une idée lumineuse <br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Eh bien figurez-vous que..</a>","Il n'y a pas de bonne ou de mauvaise idée.<br>Il n'y a que des putain d'idées. <br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Entrer dans la ronde</a>","Tout est possible :<br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>huhu</a>","Et soudain, l'épiphanie :<br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>ajouter une putain d'épiphanie</a>","Et si ton idée allait rejoindre les autres<br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>J'y compte bien</a>"];
	var click = 0;
	var isSollicated = false;
	var ordre = "random";
	var lastKey = null;

	noIdeas = function(){
		return ["Plus d'idée. Ajoute la tienne si tu en as une ! <br> <a class='typeform-share link' href='https://jaiuneidee.typeform.com/to/ITMPGZ' data-mode='2' target='_blank'>Ajouter une putain d'idée</a>"];
	}

	getIdeasFromFile = function(gss){
		for(var el in gss.feed.entry){
			ideas.push(gss.feed.entry[el].title.$t);
			idImgur.push(gss.feed.entry[el].content.$t.replace('idimgur: ', ''));
		}
		return [ideas, idImgur];
	}

	getRandomIdea = function(ideas, idImgur){
		var html = false;
		console.log(ordre);
		if(ideas.length > 0){
			if(ordre == "random")
				var i = Math.floor(Math.random()*ideas.length);
			else if(ordre == "date_desc")
				var i = ideas.length-1;
			else if(ordre == "date_asc")
				var i = 0;
			else if(ordre == "length_asc"){
				tmp = ideas.map(function(el){return el.length;})
				var i = tmp.indexOf(Math.min.apply(Math, tmp))
			}
			else if(ordre == "length_desc"){
				tmp = ideas.map(function(el){return el.length;})
				var i = tmp.indexOf(Math.max.apply(Math, tmp))
			}
			var r  = ideas[i];
			var id = idImgur[i];
			ideas.splice(i, 1);
			idImgur.splice(i, 1);
		} else {
			var r = getRandomIdea(noIdeas());
			html  = true;
			var id = "EuhgzRn";
		}
		return [r, id, html];
	}

	printRandomIdea = function(ideas, idImgur, click){
		var idea, html;
		var $display  = $('#idee_display');
		var id = "EuhgzRn";
		var proba = 1/7;
		if(Math.random() < proba && click > 5 && isSollicated == false){
			idea = sollications[Math.floor(Math.random()*sollications.length)];
			isSollicated = true;
			html = true;
		} else {
			var ideaArray = getRandomIdea(ideas, idImgur);
			idea          = ideaArray[0];
			id            = ideaArray[1];
			html          = ideaArray[2];
			isSollicated  = false;
		}

		if(html)
			$display.html(idea);
		else
			$display.text(idea);
		linkToImgur(id);
	}

	linkToImgur = function(id){
		var link = 'http://imgur.com/'+id;
		$(".twitter-share-button").remove();
	    var tweet = $('<a>')
	        .attr('href', "https://twitter.com/share")
	        .attr('id', "tweet")
	        .attr('class', "twitter-share-button tw")
	        .attr('data-lang', "fr")
	        .attr('data-via', "putain_didee")
	        .attr('data-related', "raphisky")
	        .attr('data-size', "large")
	        .text('Tweeter');
	    $(".tw").prepend(tweet);
	    tweet.attr('data-text', "Putain d'idée ( via putainjaiuneidee.com ) :");
	    tweet.attr('data-url', link);
		twttr.widgets.load();
// 		FB.ui({
//   method: 'share',
//   mobile_iframe: true,
//   href: 'https://developers.facebook.com/docs/',
// }, function(response){});

		$('.fb-share-button').data('href', link);
		$('.appear a').attr('href', link).text('imgur.com/'+id);
		return;
	}

	$.getJSON('https://spreadsheets.google.com/feeds/list/1B9i6s7tehfLeckySQiNNxpOfJ6QqvMFd_KeoV3l1mcI/2/public/basic?alt=json')
	 .done(function(ideas){
	 	files = getIdeasFromFile(ideas);
	 	ideas = files[0];
	 	idImgur = files[1];

	 	//on load
	 	printRandomIdea(ideas, idImgur, click)
	 	//au click
	 	$('.moar').on('click', function(){
	 		console.log(ideas.length);
	 		click++;
		 	printRandomIdea(ideas, idImgur, click);
		 	console.log(click);
	 	})
	 })
	 .fail(function(){
	 	// en cas de fail
	 	printRandomIdea(ideas, idImgur, click)
	 })

	 $(document).keyup(function(e){
	 	var code = e.keyCode || e.which;
		if(code == 68) {
			ordre = (ordre == "date_desc")?"date_asc":"date_desc";
			lastKey = 68;
		} else if (code == 82){
			ordre = "random";
		} else if (code == 83 && e.shiftKey){
			ordre = "length_asc";
		} else if (code == 83){
			ordre = "length_desc";
		}
		console.log(ordre);
	 })

})
