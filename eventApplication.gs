// ===============================================================================================
// (function) eventApplication
// Nobuki Fukui
// Description: イベント参加申請するfunction
// -----------------------------------------------------------------------------------------------
// Update: 2020/01/22, v1, purchaseApplication.gsを参考に作成
//                         具体的にはgetRangeのrow,columnを変更
// ----------------------------------------------------------------------------------------------
// [Memo]
// SpreadSheetのURL（備忘録）
// https://docs.google.com/spreadsheets/d/1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w/edit#gid=0
// 物品/イベント購入管理シートのフォーマット
// getRange(i,1) ||getRange(i,2) ||getRange(i,3) ||getRange(i,4)  ||getRange(i,5) ||getRange(i,6) 
// [userId]      ||[userName]    ||[item]        ||[price]        ||[date]        ||[PaymentFlg]
// ss.appendRowでスプレッドシートの最下行に追加
// ===============================================================================================
function eventApplicationInfo(userId,userName,item,price,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
　ss.sort(5,false);
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
          "text" : item + "の参加申請を受け付けました。\n\n参加申請をキャンセルする場合はメニューの「その他、購入/参加申請を取り消したい」から取り消しをしてください。"
        }]
      };
      Logger.log(data)
      return data;
    }else{
      count -= 1;
    }
  }   
}






