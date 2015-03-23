$(function () {
    var viewer = $('#container').iviewer({
        src: "http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-51908.jpg",
        update_on_resize: false,
        onMouseMove: function (ev, coords) { }
    });

    var $myElement = $("#container");
    $myElement.distance = null;
    $myElement.on("touchmove", function (event) {
        var elementPosX = $(this).position().left;
        var elementPosY = $(this).position().top;

        var distance = function (origX, origY, destX, destY) {
            var axisX = origX - destX;
            var axisY = origY - destY;

            return Math.sqrt(axisX * axisX + axisY * axisY);
        };

        var midpoint = function (origX, origY, destX, destY) {
            return { x: Math.abs(origX + destX) / 2, y: Math.abs(origY + destY) / 2 };
        };

        event.preventDefault();

        var origX = event.originalEvent.touches[0].pageX - elementPosX;
        var origY = event.originalEvent.touches[0].pageY - elementPosY;

        if (event.originalEvent.touches.length === 2) {
            var nextX = event.originalEvent.touches[1].pageX - elementPosX;
            var nextY = event.originalEvent.touches[1].pageY - elementPosY;
            var newDist = distance(origX, origY, nextX, nextY);
            var origin = midpoint(origX, origY, nextX, nextY);

            $("#X").text(origin.x);
            $("#Y").text(origin.y);

            $("#firstX").text(origX);
            $("#firstY").text(origY);

            $("#secondX").text(nextX);
            $("#secondY").text(nextY);

            if (newDist - $myElement.distance > 0) {
                viewer.iviewer("zoom_by", 0.98, origin);
            } else {
                viewer.iviewer("zoom_by", -0.98, origin);
            }

            $myElement.distance = newDist;
            event.stopPropagation();
        } 

    }).on("touchend", function () {
        $myElement.distance = null;
    });

});
