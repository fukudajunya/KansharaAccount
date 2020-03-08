function eventParticipantInfo(userId,userName,item,setToken){
    var sheet = SpreadsheetApp.openById("1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
    var ss = sheet.getSheets()[0];
    var nicknameSheet = sheet.getSheets()[1];
    var lastRow = ss.getLastRow();
    var nicknameLastRow = nicknameSheet.getLastRow();
    var date = new Date();
    var count = lastRow + 2;
    var participant = "";
    var participantNumber = 0;
    for(var i=1; i<=lastRow+1; i++){
      if(ss.getRange(i,3).getValue() == item){
        for(var j=1; j<=nicknameLastRow+1; j++){
          if(nicknameSheet.getRange(j,1).getValue() == ss.getRange(i,1).getValue()){
            var participantNickName = nicknameSheet.getRange(j,3).getValue();
            var participant = participant + participantNickName + "\n";
          }
        }
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
