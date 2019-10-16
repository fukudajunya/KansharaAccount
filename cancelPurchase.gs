// 購入申請キャンセル
function cancelPurchaseApplication(userId,userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1LD89XWQ3mTVVbLp2-TzIfzyfVtepwF9e36y7zxug6iQ");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == false && ss.getRange(i,4).getValue() == item){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請をキャンセルしました。"
        }]
      };
      ss.deleteRow(i);
      return data;
    }else if(count == 2){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "直近で" + item + "の購入申請はされていません。キャンセルできませんでした。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}