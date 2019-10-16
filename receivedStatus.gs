// 物品受け取り情報を記録する
function receivedStatusInfo(userId, userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1LD89XWQ3mTVVbLp2-TzIfzyfVtepwF9e36y7zxug6iQ");
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
          "text" : "申請に失敗しました。\nメニューの[その他(申請取消など)] → [申請状況を知りたい!]から状況を確認してください。\n\n以下の場合は申請に失敗します。\n・既に同じものを購入申請しているとき。\n・支払い済みのものについて支払い申請をしたとき。\n・支払い未確認で物品受け取り申請をしたとき。"
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
          "text" : "申請に失敗しました。\nメニューの[その他(申請取消など)] → [申請状況を知りたい!]から状況を確認してください。\n\n以下の場合は申請に失敗します。\n・既に同じものを購入申請しているとき。\n・支払い済みのものについて支払い申請をしたとき。\n・支払い未確認で物品受け取り申請をしたとき。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}