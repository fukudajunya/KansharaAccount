// 管理者用メンバー申請状況確認機能
function checkStatusForManager(setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  var data = "";
  for(var i=1; i<= lastRow; i++){
    if(ss.getRange(i, 5).getValue() == false && ss.getRange(i, 6).getValue() == false){
      data += ("・" + ss.getRange(i, 2).getValue() + "\n    " + ss.getRange(i, 4).getValue() + ":支払い待ち\n");
        count -= 1;
      }else if(ss.getRange(i, 5).getValue() == true && ss.getRange(i, 6).getValue() == false){
        data += ("・" + ss.getRange(i, 2).getValue() + "\n    " + ss.getRange(i, 4).getValue() + ":受け取り確認待ち\n");
        count -= 1;
      }else{
        count -= 1;
      }
  }
  if(data == ""){
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : "現在メンバーによる申請中のものはありません。"
      }]
    };
    return reply;
  }else{
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : data + "\n以上がメンバーによる申請状況です。"
      }]
    };
    return reply;
  }
}