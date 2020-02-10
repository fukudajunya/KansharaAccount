function follow(e){
  var spredsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=16VzNu4uHgzAojaMTOF4Qyx2oc2edEvmjPc8Ge9UYcp4");
  var sheet = spredsheet.getActiveSheet();
  sheet.appendRow([e.source.userId]);
}

function unfollow(e){
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheet/ccc?key=16VzNu4uHgzAojaMTOF4Qyx2oc2edEvmjPc8Ge9UYcp4'); 
  var sheet = spreadsheet.getActiveSheet();
  var result = findRow(sheet, e.source.userId, 1);
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