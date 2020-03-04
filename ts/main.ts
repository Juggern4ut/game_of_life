window.onload = () => {
  window["game"] = new Canvas();
  
  const handler = document.getElementById("start");
  const clear = document.getElementById("clear");
  const randomize = document.getElementById("randomize");

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
};
