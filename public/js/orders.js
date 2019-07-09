$(document).ready(function() {
    $("#open-orders-link").click(function(e) {
        $("#orders-open-container").show();
        $("#orders-history-container").hide();
        $("#orders-history-tab").removeClass("orders-tab-active-history");
        $("#orders-open-tab").addClass("orders-tab-active-open");
        e.preventDefault();
    });
    $("#history-orders-link").click(function(e) {
        $("#orders-history-container").show();
        $("#orders-open-container").hide();
        $("#orders-open-tab").removeClass("orders-tab-active-open");
        $("#orders-history-tab").addClass("orders-tab-active-history");
        e.preventDefault();
    });
});
