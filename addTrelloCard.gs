function addCard(userId, place, setToken){
  /*
  * https://trello.com/b/RUmxiUWo/%E3%83%86%E3%82%B9%E3%83%88%E3%83%9C%E3%83%BC%E3%83%89
  * テストボードにカードを作成することができるかテスト
  *
  */
  var sheet = SpreadsheetApp.openById("1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var nicknameSheet = sheet.getSheets()[1];
  var nicknameLastRow = nicknameSheet.getLastRow();
  var count = nicknameLastRow + 2;
  for(var i=1; i<=nicknameLastRow+1; i++){
      if(nicknameSheet.getRange(i,1).getValue() == userId){
          var nickname = nicknameSheet.getRange(i,3).getValue();
          break;
      }
  }
  var trelloKey   = "74d9fb85bda279565fbc8f35923854a3";
  var trelloToken = "3a8adb3a14dc7f26c44ae46d1f9626b98eb0ad68df725a6d3e64b53e868a956a";
  var listId = '5dd6a45a5bd17d1053c4772d';
  var url = 'https://api.trello.com/1/cards/?key=' + trelloKey + '&token=' + trelloToken;
  // input option
  var options = {
    'method' : 'post',
    'muteHttpExceptions' : true,
    'payload' : {
      // input from Line bot
      'name'      : nickname, // used to descript the name
      'desc'      : place, // used to descript the area (Osaka, Tokay, Nagoya)
      'due'       : '', // not used
      'idList'    : listId,
      'urlSource' : '', // not used
      //'idMembers' : '5bfce2a55d1c2b8dda7fe6da'
    }
  }
Logger.log(UrlFetchApp.fetch(url, options));
var data = {
  "replyToken" : setToken, 
  "messages" : [{
    "type" : "text",
    "text" : "動画チェックの申請が完了したよ!インストから連絡が来たら動画を渡してあげてね!"
  }]
};
return data; 
}