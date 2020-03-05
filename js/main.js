window.onload = function () {
    window["game"] = new Canvas();
    var handler = document.getElementById("start");
    var clear = document.getElementById("clear");
    var randomize = document.getElementById("randomize");
    var speedHandler = document.getElementById("speed");
    var speedDisplay = document.getElementById("speed_value");
    handler.addEventListener("click", function () {
        if (!window["game"].running) {
            window["game"].start();
            handler.innerHTML = "Stop";
        }
        else {
            window["game"].stop();
            handler.innerHTML = "Start";
        }
    });
    clear.addEventListener("click", function () {
        window["game"].clear();
    });
    randomize.addEventListener("click", function () {
        window["game"].randomize();
    });
    speedHandler.addEventListener("change", function (e) {
        window["game"].changeSpeed(e.target["value"]);
        speedDisplay.innerHTML = e.target["value"];
    });
};
