var Liip = Liip || {};
Liip.resizer = (function ($) {
    var cc;

    var init = function () {
        $("#resize").click(startResize);
    };

    var createImage = function (src) {
        var deferred = $.Deferred();
        var img = new Image();
        img.onload = function() {
            deferred.resolve(img);
        };
        img.src = src;
        return deferred.promise();
    };

    var startResize = function () {
        $.when(
            createImage($("#inputImage").get(0).src)
        ).then(resize, function () {console.log('error')});
    };

    var resize = function (image) {
        cc = document.createElement("canvas");
        cc.width = 1024;
        cc.height = 768;
        var ctx = cc.getContext("2d");
        ctx.drawImage(image, 0, 0, cc.width, cc.height);
        size = parseInt($('#size').get(0).value, 10);
        while (cc.width > size) {
            cc = halfSize(cc);
        }
        $('#outputImage').get(0).src = cc.toDataURL("image/jpeg");
    };

    var halfSize = function (i) {
        var cc = document.createElement("canvas");
        cc.width = i.width / 2;
        cc.height = i.height / 2;
        var ctx = cc.getContext("2d");
        ctx.drawImage(i, 0, 0, cc.width, cc.height);
        return cc;
    };

    return {
        init: init
    };

})(jQuery);

jQuery(function($) {
    Liip.resizer.init();
});

