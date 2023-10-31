let generate = document.getElementById("generate"),
  text = document.getElementById("text"),
  x = document.getElementById("x"),
  y = document.getElementById("y"),
  dark = document.getElementById("dark"),
  light = document.getElementById("light"),
  qrcodebox = document.getElementById("qrcode"),
  qrcode = null;

window.onload = () => {
  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://viktorkarpinski.com",
    width: parseInt(x.value),
    height: parseInt(x.value),
    colorDark: dark.value,
    colorLight: light.value,
    correctLevel: QRCode.CorrectLevel.H,
  });
};

generate.addEventListener("submit", generateQrCode);

function generateQrCode(ev) {
  ev.preventDefault();

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
  }, 1000);
}
