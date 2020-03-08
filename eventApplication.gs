function eventApplicationInfo(userId,userName,item,price,setToken){
  var sheet = SpreadsheetApp.openById("1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var ss = sheet.getSheets()[0];
  var lastRow = ss.getLastRow();
  var date = new Date();
  
  var count = lastRow + 1;
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i,1).getValue() == userId && ss.getRange(i,3).getValue() == item){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "申請に失敗しました。\nメニューの[その他(申請取消など)] → [申請状況を知りたい!]から状況を確認してください。\n\n以下の場合は申請に失敗します。\n・既に同じものを購入申請しているとき。\n・支払い済みのものについて支払い申請をしたとき。\n・支払い未確認で物品受け取り申請をしたとき。"
        }]
      };
      Logger.log(data)
      return data;
    }else if(count == 2){
      ss.appendRow([userId,userName,item,price,date,'false']);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の参加申請を受け付けました。\n\n参加申請をキャンセルする場合はメニューの[その他]→[購入/参加申請を取り消したい]から取り消しをしてください。"
        }]
      };
      Logger.log(data)
      return data;
    }else{
      count -= 1;
    }
  }   
}






