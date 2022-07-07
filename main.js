status= "";
video= "";
objects= [];

function preload(){
    video= createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas= createCanvas(380,480);
    canvas.center();
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status- detecting objects";
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
    video.loop();
    video.speed(0.5);
    video.volume(0);
}

function draw(){
    image(video, 0, 0, 380, 480);



    if(status != ""){
        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML= "Status- objects detected";
            document.getElementById("number_of_objects").innerHTML= "Number of objects- "+ objects.length;

            percent= floor(objects[i].confidence*100);

            fill('#ff0000');
            stroke('#ff0000');
            text(objects[i].label+ " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }

}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}