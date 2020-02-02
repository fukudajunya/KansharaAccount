// 申請状況確認
function checkApplicationStatus(userId, setToken){
  // 物品/イベント購入管理シートの設定
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var ss = sheet.getSheets()[0];
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  var data = "";
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId){
      if(ss.getRange(i, 6).getValue() == false){
        data += (ss.getRange(i, 3).getValue() + ":支払い待ち\n");
        count -= 1;
      //}else if(ss.getRange(i, 5).getValue() == true && ss2.getRange(i, 4).getValue() == false){
      //  data += (ss.getRange(i, 3).getValue() + ":受け取り確認待ち\n");
      //  count -= 1;
      }else{
        count -= 1;
      }
    }else{
      count -= 1;
    }
  }
  if(data == ""){
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : "現在申請中のものはありません。"
      }]
    };
    return reply;
  }else{
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : data + "\n上記で問題がなければ、対応をお願いします！"
      }]
    };
    return reply;
  }
}