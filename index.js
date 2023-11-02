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
  savebox = document.getElementById("save-wrapper"),
  qrcode = null,
  padding = document.getElementById("padding"),
  paddinginfo = document.getElementById("paddinginfo"),
  border = document.getElementById("border"),
  borderinfo = document.getElementById("borderinfo");

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
};

function generateQrCode(ev) {
  ev.preventDefault();

  generateCode();
}

function generateCode() {
  qrcodebox.innerHTML = "";
  setTimeout(() => {
    qrcode = new QRCode(document.getElementById("qrcode"), {
      text: text.value,
      width: parseInt(x.value),
      height: parseInt(y.value),
      colorDark: dark.value,
      colorLight: light.value,
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrcodebox.style.backgroundColor = light.value;
    savebox.style.display = "flex";
  }, 1000);
}

dark.onchange = (ev) => {
  ev.target.parentNode.style.backgroundColor = dark.value;
  generateCode();
};

light.onchange = (ev) => {
  ev.target.parentNode.style.backgroundColor = light.value;
  generateCode();
};

x.onchange = () => {
  xinfo.innerText = x.value + "px";
  generateCode();
};

y.onchange = () => {
  yinfo.innerText = y.value + "px";
  generateCode();
};

border.onchange = () => {
  borderinfo.innerText = border.value + "px";
  qrcodebox.style.borderRadius = border.value + "px";
};

padding.onchange = () => {
  paddinginfo.innerText = padding.value + "px";
  qrcodebox.style.padding = padding.value + "px";
};

document.getElementById("save").addEventListener("click", function () {
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
});
