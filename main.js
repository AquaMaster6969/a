Webcam.attach('#camera');
camera=document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version: ', ml5.version);
// Initialize the image classifier method
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0pfH3qYdp/model.json', modelLoaded);
// when the model is loaded
function modelLoaded() {
    console.log('model Loaded');
}
function check() {
    img=document.getElementById('selfie_image');
    classifier.classify(img,gotResult);
}
//function to run when we get an error and the results

function gotResult(error, results) {
    if (error) {
        console.error("error");
    }
    else {
        //this results are in an array ordered by confidence
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}