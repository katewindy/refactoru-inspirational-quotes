$(document).on('ready', function() {
	
	

  	$('.form').hide();

  	$('#addQuote').on('click', function(){
  		$(this).hide();
  		$('.form').slideDown('slow');
  	});

  	$('#saveQuote').on('click', function(){
  		$('.form').slideUp('slow');
  		$('#addQuote').show();
  		if ($('#enterquote').val() !== '' && $('#enterauthor').val() !== '') {
	  		var tempQuote = $('#enterquote').val();
	  		var tempAuthor = $('#enterauthor').val();
	  		var myQuote = new Quote (tempQuote, tempAuthor);
	  		myQuote.addQuote();
  		} 
  		else {
  			swal({     
  				title: "Error!",     
  				text: "You have to enter both a quote and an author.  That's how quotes work, dummy!",    
  				type: "error",     
  				confirmButtonText: "Ok, I know, FINE."   });
  		};
  		$('#enterquote').val('');
  		$('#enterauthor').val('');
	});

  	// removes a quote when the delete icon is clicked on
	$(document).on('click','.deletebutton', function(){

		$(this).parent('.quotedelete').parent('.quoteholder').hide();
		lastDeletedID = $(this).parent('.quotedelete').parent('.quoteholder').attr('id');
  	});

  	// puts the last deleted quote back when the undo button is clicked
  	
  	$(document).on('click', '#undoaction', function(){
  		$('#' + lastDeletedID).show();
  	});

  	//sorts on author name when the sort by author button is pressed
  	$(document).on('click', '#authorsort', function (){
  		sortUsingNestedText($('.quotesgohere'), "div", "div.authorText");
  	});

});
var quotecount = 0;
var quoteArray = [];
var lastDeletedID = ''

var Quote = function(text, author) {
	this.text = text;
	this.author = author;
	this.rating = null;
	this.quotenumber = quotecount;
	quotecount = quotecount + 1;

	Quote.prototype.render = function () {
		var quotetext = this.text;
		var quoteauthor = '- ' + this.author;
		var quoteholder = $('<div class="quoteholder" id="'+this.quotenumber+'"></div>');
		var quotedelete = $('<div class="quotedelete"></div>');
		var deletebutton = $('<a href="#" class="deletebutton"><i class="fa fa-times"></i></a>');
		var quotedtext = $('<div class="quoteText"></div>');
		var authortext = $('<div class="authorText"></div>');
		if (this.rating === null){
			var ratingcontainer = $('<div class="ratingcontainer"></div>').raty();
		}
		else {
			var ratingcontainer = $('<div class="ratingcontainer"></div>').raty({score: this.rating });
		};
		


		$('.quotesgohere').append(quoteholder);
		quoteholder.append(quotedelete);
		quotedelete.append(deletebutton);
		quoteholder.append(quotedtext);
		quotedtext.text(quotetext);
		quoteholder.append(authortext);
		authortext.text(quoteauthor);
		quoteholder.append(ratingcontainer);

	};

	Quote.prototype.addQuote = function () {
		quoteArray.push(this);
		this.render();
	};

};

// function authorSort () {
// 	var divs = $('.quoteholder');
// 	for (var i = 0; i < divs.length; i++){
// 		if (divs[i].$('.authortext').text() < divs[i+1].$('.authortext').text()) {
// 			divs[i+1].append(divs[i]);
// 		};
// 	};

function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
};

// var items = $('.quoteholder').find($('input'));

function sortByRating () {
	var items = $('.quotesgohere').find( function(a,b) {
		$('input'));
};






















