$('#asks').on('scroll', function() {
    $('body').attr('enableScroll','false')
});

$('#orderbook-align').on('click',function () {
    $('body').attr('enableScroll','true')
    $('#asks').scrollTop(1000);
    $('#bids').scrollTop(0);
    console.log($('#orderbook-align').attr('enableScroll'))
})