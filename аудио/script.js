var audio, context, analyser, src, array, logo;
logo = document.getElementById("logo").style;
audio = document.getElementById("audio");

window.onclick = function() {
    if (context) {
        preparation();
    }
    if (audio.paused) {
        audio.play();
        loop();
    } else {
        audio.pause();
    }
}

function preparation() {
    context = new AudioContext();
    analyser = context.createAnaliser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop() {
    if (!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    logo.minHeight = (array[20]) + "px";
    logo.width = (array[20]) + "px";
}