(function () {

    window.addEventListener('DOMContentLoaded', function () {
        var isStreaming = false;
        var start = document.getElementById('start');
        var video = document.getElementById('v');
        var canvas = document.getElementById('c');
        var ctx = canvas.getContext('2d');
        var effect = document.getElementById('effect');
        var light = document.getElementById('light')
        var isEffectActive = false;
        var light_status = false;

        start.addEventListener('click', function (e) {
            var address = document.getElementById('address').value;
            var protocol = location.protocol === "https:" ? "wss:" : "ws:";
            var wsurl = protocol + '//' + address;

            if (!isStreaming) {
                signal(wsurl,
                        function (stream) {
                            console.log('got a stream!');
                            var url = window.URL || window.webkitURL;
                            video.src = url ? url.createObjectURL(stream) : stream;
                            video.play();
                        },
                        function (error) {
                            alert(error);
                        },
                        function () {
                            console.log('websocket closed. bye bye!');
                            video.src = '';
                        },
                        function (message) {
                            alert(message);
                        }
                );
            }
        }, false);

        // Wait until the video stream can play
        video.addEventListener('canplay', function (e) {
            if (!isStreaming) {
                canvas.setAttribute('width', video.videoWidth);
                canvas.setAttribute('height', video.videoHeight);
                isStreaming = true;
            }
        }, false);

        // Wait for the video to start to play
        video.addEventListener('play', function () {
            // Every 33 milliseconds copy the video image to the canvas
            setInterval(function () {
                if (video.paused || video.ended) {
                    return;
                }
                var w = canvas.getAttribute('width');
                var h = canvas.getAttribute('height');
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(video, 0, 0, w, h);
                if (isEffectActive) {
                    detectFace(canvas);
                }
            }, 33);
        }, false);

        effect.addEventListener('click', function () {
            isEffectActive = !isEffectActive;
        }, false);
    });
})();
