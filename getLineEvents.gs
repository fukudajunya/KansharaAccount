function follow(e){
  var spredsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w");
  var sheet = spredsheet.getSheetByName('あだ名管理シート');
  var userId = e.source.userId;
  var userName = getUserName(userId);
  sheet.appendRow([userId, userName]);
}

function unfollow(e){
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheet/ccc?key=1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w'); 
  var sheet = spredsheet.getSheetByName('あだ名管理シート');
  var userId = e.source.userId;
  var userName = getUserName(userId);
  var result = findRow(sheet, userId, userName, 1);
  if(result > 0){
    sheet.deleteRows(result);
  }
}

function findRow(sheet,val,col){
  var data = sheet.getDataRange().getValues(); 
  for(var i=0; i < data.length; i++){
    if(data[i][col-1] === val){
      return i+1;
    }
  }
  return 0;
}