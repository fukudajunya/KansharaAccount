// 購入申請
function purchaseApplicationInfo(userId,userName,item,price,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var date = new Date();
  
  var count = lastRow + 1;
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i,4).getValue() == item && ss.getRange(i, 5).getValue() == false){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "以前申請を受けた" + item + "の支払いが完了していません。"
        }]
      };
      return data;
    }else if(count == 2){
      ss.appendRow([userId, userName,date,item,'false','false',price]);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請を受け付けました。\n\n購入申請をキャンセルする場合は「申請取消」とコメントしてください。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }        
}

