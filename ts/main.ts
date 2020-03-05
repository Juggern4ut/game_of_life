window.onload = () => {
  window["game"] = new Canvas();

  const handler = document.getElementById("start");
  const clear = document.getElementById("clear");
  const randomize = document.getElementById("randomize");
  const speedHandler = document.getElementById("speed");
  const speedDisplay = document.getElementById("speed_value");

  handler.addEventListener("click", () => {
    if (!window["game"].running) {
      window["game"].start();
      handler.innerHTML = "Stop";
    } else {
      window["game"].stop();
      handler.innerHTML = "Start";
    }
  });

  clear.addEventListener("click", () => {
    window["game"].clear();
  });

  randomize.addEventListener("click", () => {
    window["game"].randomize();
  });

  speedHandler.addEventListener("change", e => {
    window["game"].changeSpeed(e.target["value"]);
    speedDisplay.innerHTML = e.target["value"];
  });
};
