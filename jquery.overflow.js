(function($){

    $.fn.overscroll = function(options) {
        options = $.extend({}, $.fn.overscroll.defaultOptions, options);

        var ts = Math.round((new Date()).getTime() / 1000);

        console.log("overscroll enabled");

        $("body").append("<div id=\"overscroll-nib\"></div>");

        $("#overscroll-nib").on("click", function(e) {
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            console.log("clicked nib"); }); 
        var thiz = $(this);

        $(this).on("mousemove", function(e) {
            var x = e.pageX - 32;
            var y = e.pageY - 32;
            $("#overscroll-nib").css({
                "top": y,
                "left": x
            });

            var isDragging = false;
            $("#overscroll-nib").mousedown(function() {
                $(window).mousemove(function() {
                    isDragging = true;
                    $(window).unbind("mousemove");

                    var offset = thiz.offset();
                    var xoff = x - offset.left;
                    console.log("xoff: " + xoff);
                    $(".overscroll").scrollLeft(xoff);
                });
            }).mouseup(function(e) {
                var wasDragging = isDragging;
                isDragging = false;
                $(window).unbind("mousemove");
                if (wasDragging) {
                    var offset = thiz.offset();
                    var xoff = x - offset.left;
                    $(".overscroll").scrollLeft(xoff);
                }
            });

        });

        return this;
    };

    $.fn.overscroll.defaultOptions = {
        version: "0.1.0"
    };

})(jQuery);
