$(document).on('ready', function() {
	var quoteToDelete = null;
	

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
  		sortByRating();
	});

  	// removes a quote when the delete icon is clicked on
	$(document).on('click','.deletebutton', function(){

		quoteToDelete = $(this).parent('.quotedelete').parent('.quoteholder');

		lastDeletedID = $(this).parent('.quotedelete').parent('.quoteholder').attr('id');
		quoteToDelete.detach();
		sortByRating();

		// puts the last deleted quote back when the undo button is clicked
		$(document).on('click', '#undoaction', function(){
  			quoteToDelete.appendTo($('.quotesgohere'));
  		});
  	});

  	//sorts on author name when the sort by author button is pressed
  	$(document).on('click', '#authorsort', function (){
  		sortUsingNestedText($('.quotesgohere'), "div", "div.authorText");
  	});

  	//sorts by rating of the quote when the sort by rating is clicked
  	$(document).on('click', '#ratingsort', function (){
  		sortByRating();
  	});

  	$(document).on('click', '.ratingcontainer', function(){
  		sortByRating();
  	});

  	//sorts by the newest one when sort by new is clicked
  	$(document).on('click', '#newsort', function(){
  		sortByNew();
  	});

  	//hides all quotes not by that author when the author link is clicked on a quote
  	$(document).on('click', '.authorlink', function(){

  		var linktext = $(this).text();
  		console.log(linktext);
  		authorFilter(linktext);
  	});

  	//makes all the hidden (not the deleted) quotes show up again
  	$(document).on('click', '#showall', function (){
  		$('.quoteholder').css('display', 'block');
  	});

  	// functionality for random quote button
  	$(document).on('click', '#random', function (){
  		var randm = randomizer(0, quotecount);
  		var bkg = createPopupBackground();
  		var cts = createPopupContents();
  		var randomid= '#'+randm;
  		var randomquote = $(randomid);
  		$(randomid).find('.deletebutton').hide();
  		applyPopup(bkg, cts);
  		$('.popupContent').append(randomquote);

  		$(document).on('click', '#popupclose', function (){
  			$(randomid).appendTo('.quotesgohere');
  			$(randomid).find('.deletebutton').show();
  			$('.popupContainer').remove();
  			sortByRating();
  		});

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
		var quoteauthor = '- ' + '<a href="#" class="authorlink">'+ this.author +'</a>'
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
		authortext.html(quoteauthor);
		quoteholder.append(ratingcontainer);

	};

	Quote.prototype.addQuote = function () {
		quoteArray.push(this);
		this.render();
	};

};

function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
};

function sortByRating () {
	$(".quotesgohere > div").tsort('input.scores', {order: 'desc', attr: 'value'});
};

function sortByNew () {
	$('.quotesgohere > div').tsort({order: 'desc', attr: 'id'});
};

function authorFilter (clickedText) {
	var authorname = clickedText;

	var quotes = $('.quotesgohere').children('.quoteholder');
	console.log(authorname, quotes);
	var lookForAuthor = function (quotes, authorname) {
		var others = quotes.filter(function(){
			return $(this).find('.authorlink').text() !== authorname;
		}).hide();
	
	};
	lookForAuthor(quotes, authorname);
	
};

//Popup creation functions! YAYYYYYY
function createPopupBackground () {
	var popupContainer = $('<div>')
		.addClass('popupContainer')
		.css({ 
			'position':'fixed', 
			'top': '0px', 
			'left':'0px', 
			'background':'rgba(0,0,0,0.7)', 
			'width':'100%', 
			'height': '100%', 
			 });
	return popupContainer;

};

function createPopupContents (popupTitle, popupItems) {
	var thisPopupTitle = popupTitle;
	var thisPopupDivs = popupItems;


	var popupContent = $('<div>')
	    .addClass('popupContent')
	    .css({
	        'z-index': '2',
	        'background': '#D3CCC6',
	        'width': '50%',
	        'padding': '20px',
	        'border-radius': '10px',
	        'position': 'absolute',
	        'top': '50%',
	        'left': '25%',
	        'padding-top': '50px'
	        
	    });
	var popupLinkHolder = $('<div>')
	    .addClass('popupLinkHolder')
	    .css('float', 'right');
	var popupCloseLink = $('<a href="#" id="popupclose">Close</a>')
	    .addClass('closeLink')
	    .addClass('closebutton')
	    .css({
	    	'position':'absolute',
	    	'top':'10px',
	    	'right':'10px'
	    });

	popupContent.append(thisPopupTitle);
	popupContent.append(thisPopupDivs);
	popupContent.append(popupLinkHolder);
	popupLinkHolder.append(popupCloseLink);

	return popupContent;

}

function applyPopup (popupContainer, popupContent) {
	var thisPopupContainer = popupContainer;
	var thisPopupContent = popupContent;
	$('body').append(thisPopupContainer);
	thisPopupContainer.append(thisPopupContent);
} 

// generates a random number for the random quote button
function randomizer(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}