$(document).ready(function() {
	$('#buy-form-link').click(function(e) {
		$('#buy-form').show();
		$('#sell-form').hide();
		$('#sell-header').removeClass('orderform-sell-active');
		$('#buy-header').addClass('orderform-buy-active');
		e.preventDefault();
	});
	$('#sell-form-link').click(function(e) {
		$('#sell-form').show();
		$('#buy-form').hide();
		$('#buy-header').removeClass('orderform-buy-active');
		$('#sell-header').addClass('orderform-sell-active');
		e.preventDefault();
	});
});
