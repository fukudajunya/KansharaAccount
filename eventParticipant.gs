// ===============================================================================================
// (function) eventParticipant
// Nobuki Fukui
// Description: イベント参加者を列挙するfunction
// -----------------------------------------------------------------------------------------------
// Update: 2020/01/29, v1, eventParticipant.gsを参考に作成
// ----------------------------------------------------------------------------------------------
// [Memo]
// SpreadSheetのURL（備忘録）
// https://docs.google.com/spreadsheets/d/1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w/edit#gid=0
// 物品/イベント購入管理シートのフォーマット
// getRange(i,1) ||getRange(i,2) ||getRange(i,3) ||getRange(i,4)  ||getRange(i,5) ||getRange(i,6) 
// [userId]      ||[userName]    ||[item]        ||[price]        ||[date]        ||[PaymentFlg]
// ss.appendRowでスプレッドシートの最下行に追加
// ===============================================================================================
function eventParticipantInfo(userId,userName,item,setToken){
    var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
    var ss = sheet.getSheets()[0];
    ss.sort(3,false);
    var lastRow = ss.getLastRow();
    var date = new Date();
    var count = lastRow + 2;
    var participant = "";
    var participantNumber = 0;
    for(var i=1; i<=lastRow+1; i++){
      if(ss.getRange(i,3).getValue() == item){
        var participant = participant + ss.getRange(i,2).getValue() + "\n";
        var participantNumber = participantNumber + 1;
        count -= 1;
      }else if(count == 2){
        if(participantNumber == 0){
          var data = {
            "replyToken" : setToken, 
            "messages" : [{
              "type" : "text",
              "text" : item + "の参加者は現在いません。"
            }]
          };
          Logger.log(data)
          return data;
        }else{
          var data = {
          "replyToken" : setToken, 
          "messages" : [{
            "type" : "text",
            "text" : item + "の参加者リストはこちら \n\n" + participant + "\n計 " + participantNumber + " 人"
          }]
        };
        Logger.log(data)
        return data;
        }
      }else{
        count -= 1;
      }
    }   
}
