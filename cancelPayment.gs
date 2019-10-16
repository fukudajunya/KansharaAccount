// 支払い確認キャンセル
function cancelPaymentStatus(userId,userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1LD89XWQ3mTVVbLp2-TzIfzyfVtepwF9e36y7zxug6iQ");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i,4).getValue() == item){
      if(ss.getRange(i, 5).getValue() == true && ss.getRange(i, 6).getValue() == false){
        var data = {
          "replyToken" : setToken, 
          "messages" : [{
            "type" : "text",
            "text" : item + "の支払い確認・更新をキャンセルしました。"
          }]
        };
        ss.getRange(i, 5).setValue('false');
        return data;
      }else{
        var data = {
          "replyToken" : setToken, 
          "messages" : [{
            "type" : "text",
            "text" : "直近で" + item + "の購入申請はされていません。キャンセルできませんでした。"
          }]
        };
        return data;
      }
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
