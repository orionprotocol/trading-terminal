export class Toastr {

    static configureToastr(toastr) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    static showSuccess(text) {
        var $ = require("jquery");
        var toastr = require('toastr');
        Toastr.configureToastr(toastr);
        toastr.success(text);
    }
    static showWarn(text) {
        var $ = require("jquery");
        var toastr = require('toastr');
        Toastr.configureToastr(toastr);
        toastr.warning(text);
    }
    static showError(text) {
        var $ = require("jquery");
        var toastr = require('toastr');
        Toastr.configureToastr(toastr);
        toastr.error(text);
    }
}