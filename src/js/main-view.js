document.onkeydown = cancel_tab;

setTimeout(function () {
  location.reload();
}, 60000);
function cancel_tab(e) {
  if(e == undefined){
    if(event.keyCode==9){
      event.returnValue=false;
    return false;
  }
  } else {
    if(e.which==9){
      return false;
    }
  }
}

function focusTextbox() {
  document.getElementById('qrcode').focus();
}

function init() {
  document.getElementById('qrcode').focus();
}

function outputJson() {
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
    document.getElementById('iframe').src = decodeUrl;
  }).catch(function (err) {
    console.log(err);
  });
  document.getElementById('qrcode').value = "";
}