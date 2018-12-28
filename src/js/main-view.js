document.onkeydown = cancel_tab;

function cancel_tab(e) {
  if (e == undefined) {
    if (event.keyCode == 9) {
      event.returnValue = false;
      return false;
    }
  } else {
    if (e.which == 9) {
      return false;
    }
  }
}

window.addEventListener('load', function () {
  setInterval(doReloadTheFrame, 60000);
});

function doReloadTheFrame() {
  document.getElementById('iframe').contentWindow.location.reload(true);
}

function FocusOnTextBox() {
  document.getElementById('qrcode').focus();
}

function init() {
  document.getElementById('qrcode').focus();
}

function ProcessJson() {
  var url = document.getElementById('qrcode').value;
  var request = require("request-promise");
  var options = {
    url: url,
    method: 'GET',
    json: true
  }
  request(options).then(function (body) {
    var decodeUrl = decodeURIComponent(body)
    if (!decodeUrl.match(/^http:\/\/sekitori.pm1932.jp\/sekitori.*$/)) {
      console.log('The acquired value is invalid');
      return
    }
    console.log(decodeUrl);
    document.getElementById('iframe').src = decodeUrl;
  }).catch(function (err) {
    displayErrorLog();
    console.log(err);
  });
  document.getElementById('qrcode').value = "";
}

function displayErrorLog() {
  document.getElementById('notice').classList.add('show');
  setTimeout(function () {
    document.getElementById('notice').classList.remove('show');
  }, 5000);
}