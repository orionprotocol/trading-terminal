// GENERAL
$('#asks-general').on('scroll', function() {
    $('body').attr('orderbook-general','false')
});
$('#bids-general').on('scroll', function() {
    $('body').attr('orderbook-general','false')
});

$('#orderbook-general').on('click',function () {
    $('body').attr('orderbook-general','true')
    $('#asks-general').scrollTop(1000);
    $('#bids-general').scrollTop(0);
})

// MODAL GENERAL
$('#modal-asks-general').on('scroll', function() {
    $('body').attr('modal-orderbook-general','false')
});
$('#modal-bids-general').on('scroll', function() {
    $('body').attr('modal-orderbook-general','false')
});

$('#modal-orderbook-general').on('click',function () {
    $('body').attr('modal-orderbook-general','true')
    $('#modal-asks-general').scrollTop(1000);
    $('#modal-bids-general').scrollTop(0);
})


// BITTREX GENERAL
$('#modal-asks-btr').on('scroll', function() {
    $('body').attr('modal-orderbook-bittrex','false')
});
$('#modal-bids-btr').on('scroll', function() {
    $('body').attr('modal-orderbook-bittrex','false')
});

$('#modal-orderbook-bittrex').on('click',function () {
    $('body').attr('modal-orderbook-bittrex','true')
    $('#modal-asks-btr').scrollTop(1000);
    $('#modal-bids-btr').scrollTop(0);
})

// BINANCE GENERAL
$('#modal-asks-bnn').on('scroll', function() {
    $('body').attr('modal-orderbook-binance','false')
});
$('#modal-bids-bnn').on('scroll', function() {
    $('body').attr('modal-orderbook-binance','false')
});

$('#modal-orderbook-binance').on('click',function () {
    $('body').attr('modal-orderbook-binance','true')
    $('#modal-asks-bnn').scrollTop(1000);
    $('#modal-bids-bnn').scrollTop(0);
})

// POLONIEX GENERAL
$('#modal-asks-plnx').on('scroll', function() {
    $('body').attr('modal-orderbook-poloniex','false')
});
$('#modal-bids-plnx').on('scroll', function() {
    $('body').attr('modal-orderbook-poloniex','false')
});

$('#modal-orderbook-poloniex').on('click',function () {
    $('body').attr('modal-orderbook-poloniex','true')
    $('#modal-asks-plnx').scrollTop(1000);
    $('#modal-bids-plnx').scrollTop(0);
})