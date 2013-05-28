var Liip = Liip || {};
Liip.resizer = (function ($) {
    var mainCanvas;

    var init = function () {
        $("#resize").click(startResize);
    };

    /* 
     * Creates a new image object from the src
     * Uses the deferred pattern
     */
    var createImage = function (src) {
        var deferred = $.Deferred();
        var img = new Image();

        img.onload = function() {
            deferred.resolve(img);
        };
        img.src = src;
        return deferred.promise();
    };

    /* 
     * Create an Image, when loaded pass it on to the resizer
     */
    var startResize = function () {
        $.when(
            createImage($("#inputImage").get(0).src)
        ).then(resize, function () {console.log('error')});
    };

    /*
     * Draw the image object on a new canvas and half the size of the canvas
     * until the darget size has been reached
     * Afterwards put the base64 data into the target image
     */
    var resize = function (image) {
        mainCanvas = document.createElement("canvas");
        mainCanvas.width = 1024;
        mainCanvas.height = 768;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
        size = parseInt($('#size').get(0).value, 10);
        while (mainCanvas.width > size) {
            mainCanvas = halfSize(mainCanvas);
        }
        $('#outputImage').get(0).src = mainCanvas.toDataURL("image/jpeg");
    };

    /*
     * Draw initial canvas on new canvas and half it's size
     */
    var halfSize = function (i) {
        var canvas = document.createElement("canvas");
        canvas.width = i.width / 2;
        canvas.height = i.height / 2;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(i, 0, 0, canvas.width, canvas.height);
        return canvas;
    };

    return {
        init: init
    };

})(jQuery);

jQuery(function($) {
    Liip.resizer.init();
});

