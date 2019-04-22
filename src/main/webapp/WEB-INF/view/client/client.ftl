<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
    <style>
        html {
            height: 100%;
        }

        body {
            min-height: 100%;
        }
    </style>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Exchange notifier</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/bootstrap/css/bootstrap-toggle.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <!-- Ionicons -->
    <link rel="stylesheet" href="/resources/Ionicons/css/ionicons.min.css">

    <!-- OrderFrom -->
    <link rel="stylesheet" href="/resources/css/orderform.css">

    <!-- Orders -->
    <link rel="stylesheet" href="/resources/css/orders.css">

    <!-- Orders -->
    <link rel="stylesheet" href="/resources/css/custom.css">

    <!-- OrderBook -->
    <link rel="stylesheet" href="/resources/css/orderbook.css">

    <!-- Balance -->
    <link rel="stylesheet" href="/resources/css/balance.css">

    <!-- Balance -->
    <link rel="stylesheet" href="/resources/css/details.css">

    <!-- Modal -->
    <link rel="stylesheet" href="/resources/css/modal.css">


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <link href="/resources/css/toastr.min.css" rel="stylesheet"/>
</head>
<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to get the
desired effect
|---------------------------------------------------------|
| SKINS         | skin-blue                               |
|               | skin-black                              |
|               | skin-purple                             |
|               | skin-yellow                             |
|               | skin-red                                |
|               | skin-green                              |
|---------------------------------------------------------|
|LAYOUT OPTIONS | fixed                                   |
|               | layout-boxed                            |
|               | layout-top-nav                          |
|               | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->
<body enableScroll="true" style="overflow-x: hidden">
<div id="app" style="background-color: #edf0f4; min-height: 100%">
</div>
<script type="text/javascript" src="/resources/js/charting_library/charting_library.min.js"></script>
<script type="text/javascript" src="/resources/js/datafeeds/udf/dist/polyfills.js"></script>
<script type="text/javascript" src="/resources/js/datafeeds/udf/dist/bundle.js"></script>
<script type="text/javascript" src="/resources/js/datafeeds/udf/lib/dex-history.js"></script>

<script src="/resources/jquery/dist/jquery.min.js"></script>
<script src="/resources/js/bundle.js"></script>
<script src="/resources/js/orderform.js"></script>
<script src="/resources/js/orders.js"></script>
<script src="/resources/js/orderbook.js"></script>


<!-- Bootstrap 3.3.7 -->
<script src="/resources/bootstrap/js/bootstrap.min.js"></script>
<script src="/resources/js/toastr.min.js"></script>
</body>
<script>
    $(document).ready(function () {
        var windowHeight = $(window).height();
        var form = $('#order-form').height();

        var top = windowHeight - form;
        var ordbookMax = top / 2.5;

        console.log("WINDOW HEIGHT " + windowHeight)
        console.log("FORM " + form)
        console.log("TOP " + top)

        $('#orders-open-container').height(form - 25);
        $('#orders-history-container').height(form - 25);

    });
</script>

</html>