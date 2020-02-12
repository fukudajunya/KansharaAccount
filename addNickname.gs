//あだ名登録
function addNickname(userId, inputData, setToken){  
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var ss = sheet.getSheets()[1];
  var lastRow = ss.getLastRow();
  
  var command = inputData.split('　');
  var length = command.length;
  
  
  if(length != 2){
    var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "フォーマットエラーです。「あだ名　XXX」でもう一度登録をお願いします！"
        }]
      };
      Logger.log(data)
      return data;
  }
  
  var nickname = command.pop();
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId){
      ss.getRange(i,3).setValue(nickname);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "あだ名の登録が完了しました！"
        }]
      };
      Logger.log(data)
      return data;
    }
  }
}
