$(document).on('ready', function() {
  	$('.form').hide();

  	$('#addQuote').on('click', function(){
  		$(this).hide();
  		$('.form').slideDown('slow');
  		$('#editname').val($('#name').text());
		$('#editbio').val($('#bio').text());

  	});

  	$('#saveQuote').on('click', function(){
  		$('.form').slideUp('slow');
  		$('#addQuote').show();
  		$('#name').text($('#editname').val());
		$('#bio').text($('#editbio').val());
  	});
});

