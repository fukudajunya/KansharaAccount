// 物品受け取り情報を記録する
function receivedStatusInfo(userId, userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var date = new Date();
  var count = lastRow + 1;
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == false && ss.getRange(i,4).getValue() == item){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の支払いが完了していません。支払いが済んだか確認してください。"
        }]
      };
      return data;
    }else if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == true && ss.getRange(i, 4).getValue() == item && ss.getRange(i, 6).getValue() == false){
      ss.getRange(i, 6).setValue('true');
      ss.getRange(i, 3).setValue(date);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の受け取り確認ありがとうございます。"
        }]
      };
      return data;
    }else if(count == 2){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請がされていません。購入申請から申請をお願いします。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}
