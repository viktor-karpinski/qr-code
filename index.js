// Replace the entire JavaScript code with the following:

let generate = document.getElementById("generate"),
  text = document.getElementById("text"),
  x = document.getElementById("x"),
  xinfo = document.getElementById("xinfo"),
  y = document.getElementById("y"),
  yinfo = document.getElementById("yinfo"),
  dark = document.getElementById("dark"),
  light = document.getElementById("light"),
  qrcodebox = document.getElementById("qrcode"),
  qrcodewrapper = document.getElementById("qrcode-container"),
  savebtn = document.getElementById("save"),
  qrcode = null,
  padding = document.getElementById("padding"),
  paddinginfo = document.getElementById("paddinginfo"),
  border = document.getElementById("border"),
  borderinfo = document.getElementById("borderinfo"),
  coffee = document.getElementsByClassName("coffee-label");

window.onload = () => {
  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://viktorkarpinski.com",
    width: parseInt(x.value),
    height: parseInt(x.value),
    colorDark: dark.value,
    colorLight: light.value,
    correctLevel: QRCode.CorrectLevel.H,
  });
  generate.addEventListener("submit", generateQrCode);
  savebtn.addEventListener("click", saveQrCode);
  for (let i = 0; i < 3; i++) coffee[i].addEventListener("click", changeCoffee);
};

function generateQrCode(ev) {
  ev.preventDefault();
  generateCode();
}

function generateCode() {
  qrcodebox.innerHTML = "";
  setTimeout(() => {
    let toConvert =
      text.value.length <= 0 ? "https://viktorkarpinski.com" : text.value;
    qrcode = new QRCode(document.getElementById("qrcode"), {
      text: toConvert,
      width: parseInt(x.value),
      height: parseInt(y.value),
      colorDark: dark.value,
      colorLight: light.value,
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrcodebox.style.backgroundColor = light.value;
  }, 1000);
}

dark.oninput = (ev) => {
  ev.target.parentNode.style.backgroundColor = dark.value;
};

dark.onchange = (ev) => {
  generateCode();
};

light.oninput = (ev) => {
  ev.target.parentNode.style.backgroundColor = light.value;
};

light.onchange = (ev) => {
  generateCode();
};

x.oninput = () => {
  xinfo.innerText = x.value + "px";
};

x.onchange = () => {
  generateCode();
};

y.oninput = () => {
  yinfo.innerText = y.value + "px";
};

y.onchange = () => {
  generateCode();
};

border.oninput = () => {
  borderinfo.innerText = border.value + "px";
  qrcodebox.style.borderRadius = border.value + "px";
};

padding.oninput = () => {
  paddinginfo.innerText = padding.value + "px";
  qrcodebox.style.padding = padding.value + "px";
};

function saveQrCode() {
  domtoimage
    .toPng(document.getElementById("download"), {
      width: qrcodewrapper.offsetWidth,
      height: qrcodewrapper.offsetHeight,
    })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "captured-image.png";
      link.href = dataUrl;
      link.click();
    });
}

function changeCoffee(ev) {
  let currentCoffee = ev.currentTarget;
  for (let i = 0; i < 3; i++) coffee[i].classList.remove("selected");
  currentCoffee.classList.add("selected");
  document.getElementById("money").innerText = currentCoffee.dataset.money;
  let btn = document.querySelector(".button");
  btn.href = btn.href.replace(/\/\d+$/, "/" + currentCoffee.dataset.money);
}
