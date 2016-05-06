var Capture = function (obj,width,height) {
    this.width = width;
    this.height = height;
    this.pixels = new Pixels(width,height);
    this.pixels.getImageData();
    this.imageData = this.pixels.getImageData();
    this.imageData.width = width;
};
var url;
//var jsVideo;
Capture.prototype.start = function() {
    var video = document.createElement("video");
    video.width = this.width;
   video.height = this.height;
    video.autoplay = true;

    if(navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia({audio:true, video:true}, function(stream) {
            url = window.webkitURL.createObjectURL(stream);
            video.src = url;
        });
    } else  if(navigator.mozGetUserMedia){
        navigator.mozGetUserMedia(
            {video: true},
            function(stream) {
                video.mozSrcObject=stream;
                video.play();
                streaming = true;
            },
            function(err) {
                alert("An error occured! " + err);
            }
        );
    } else if(navigator.getUserMedia) {
        navigator.getUserMedia("audio, video", success, error);
    }
    this.pixels.setVideo(video);
};
Capture.prototype.loadPixels = function() {
};
Capture.prototype.available = function() {
    return true;
};
Capture.prototype.read = function() {
    //return true;
};
Capture.prototype.toImageData = function() {
    return this.pixels.getImageData();
};

//Captureクラスで内部的に使用するクラス
var Pixels = function(width,height) {
    this.width=width;
    this.height=height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
};

Pixels.prototype.getPixel = function (idx) {
    if(!this.mypixels) {
         this.mypixels = [];

        console.log(this.video.width+","+ this.video.height);
        var context = this.context;
        var mypixels = this.mypixels;
        var video = this.video;

       setInterval(function() {
           //video.src = url;
           //console.log("start capture");
            //console.log(video.width+","+ video.height);
        context.drawImage(video,0,0,video.width,video.height);
        var imgData = context.getImageData(0,0,video.width,video.height);

        var i = 0;
       var  j = 0;
        for(var y = 0; y < video.height; y++) {
        for(var x = 0; x < video.width; x++) {
            mypixels[i++] = (imgData.data[j]<<16)
                |(imgData.data[j+1]<<8)
                |(imgData.data[j+2]);

            //CanvasのimageはRGBAなので
            j = j + 4;
        }
    }
       //console.log(imgData.data[0]);
       },100);


    var i = 0;
        for(var y = 0; y < this.video.height; y++) {
        for(var x = 0; x < this.video.width; x++) {
            this.mypixels[i++] = 128<<16|128<<8|128;
        }
    }
    }
    return this.mypixels[idx];
};
Pixels.prototype.setVideo = function(video) {
    this.video = video;
};
Pixels.prototype.getImageData = function() {
    return this.context.getImageData(0,0,this.width,this.height);
};
