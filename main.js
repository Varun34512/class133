img="" ;
status="" ;
objects=[] ;

function preload(){
img = loadImage("dog_cat.jpg") ;
}

function setup() {
    canvas = createCanvas(640,420) ;
    canvas.center()
    objectDetector= ml5.objectDetector('cocossd', modelLoaded) ;
    document.getElementById("status").innerHTML="Status : Detecting Object" ;
}

function draw(){
    image(img,0,0,640,420) ;
    if (status!="") {
        document.getElementById("status").innerHTML = "Status: Object Detected" ;
        for (i =0 ; i<objects.length ; i++) {
            fill("#FF0000") ;
            percent = floor(objects[i].confidence*100) ;
            text(objects[i].label + " " + percent + "%" ,objects[i].x +15 , objects[i].y + 15 ) ;
            noFill() ;
            stroke("#FF0000") ;
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height) ;
        }
    }
    /*fill("#FF0000") ;
    text("Dog",55,55) ;
    noFill() ;
    stroke("#FF0000") ;
    rect(45,40,270,350) ;
    fill('#FF0000') ;
    text("Cat",320,130) ;
    noFill() ;
    stroke("#FF0000") ;
    rect(290,100,300,300) ; */
}

function modelLoaded() {
    console.log("model is loaded") ;
    status=true ;
    objectDetector.detect(img, gotResult) ;
}

function gotResult(error,results) {
    if (error) {
        console.log(error) ;
    } else {
        console.log(results) ;
        objects=results ;
    }
}