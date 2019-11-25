// LINEの認証を突破するために必要なお作法
var secret_token = "DIc4nUB883QVOrxbKlYr/tdnaJY/uFUZuNCyw59ETsUsGlUyQ8xVIpLc8F23oUoBD6NeY/aXeb8oXoQQKas/uLAVrdbvd5i/rFBA/Gjm7zKdiiAeSrJ0UbSA0DC0X6wWS+EEDBfHAWm2n55BORN98AdB04t89/1O/w1cDnyilFU="
var secret = "Bearer " + secret_token;

//スプレッドシートからユーザーを配列で取得してメッセージを送信
function push() {
  var message = "test"
  var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=16VzNu4uHgzAojaMTOF4Qyx2oc2edEvmjPc8Ge9UYcp4");
  var sheet = spreadsheet.getActiveSheet(); //シートを取得
  var data = sheet.getDataRange().getValues(); //シートに記載されている値を全て取得
  var userlist = []; //型を整えるためにuserlistを作成し値を詰める
  for(var i=0; i < data.length; i++){
    userlist.push(data[i][0]);
  }
  var postData = {
    "to" : userlist, //ここに取得したユーザーIDの配列を指定する
    "messages" : [
      {
        "type" : "text",
        "text" : message
      }
    ]
  };
  var options_push = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : secret
    },
    "payload" : JSON.stringify(postData)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/multicast", options_push);
}