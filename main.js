let narizesImg, nariz;
let canvas, video, poseNet;
let narizX, narizY, narizT;

function preload() {
    narizesImg = [];
    for (let i = 1; i <= 6; i++) {
        const url = "./nariz/nariz" + i + ".png";
        narizesImg.push(loadImage(url));
        const btn = createButton("");
        btn.size(80, 80);
        btn.value(i);
        btn.class("btn mx-1");
        btn.style('background', 'url(' + url + ')');
        btn.style('background-size', 'cover');
        btn.parent('divNarizes');
        btn.mouseClicked(() => {
            nariz = i - 1;
        })
    }
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    imageMode(CENTER);
    nariz = 1;
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotResults);
    narizX = width / 2;
    narizY = height / 2;
    narizT = 120;
}

function draw() {
    const espelho = ml5.flipImage(video);
    // image(video, width / 2, height / 2);
    image(espelho, width / 2, height / 2);
    image(narizesImg[nariz], narizX, narizY, narizT, narizT);
}

function modelLoaded() {
    console.log("Estooooooooooou Prontooooooooo!");
}

function gotResults(results) {
    if (results.length) {
        // console.log(results[0].pose)
        const r = results[0].pose.nose
        if (r.confidence > 0.7) {
            narizX = width - r.x;
            narizY = r.y;
            narizT = abs(results[0].pose.leftEar.x - results[0].pose.rightEar.x);
        }
    }
}