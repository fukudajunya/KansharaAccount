function getUserName(userId){
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var response = UrlFetchApp.fetch(url,{
    'headers' : {
      'Authorization' : 'Bearer ' + secret_token
    }
  });
  return JSON.parse(response.getContentText()).displayName;
}

function getUserID(line){
  var headers = {
    'Authorization': 'Bearer ' + secret_token
  };
  var options = {
    'headers': headers
  };
  var url = 'https://api.line.me/v2/bot/profile/' + line.source.userId;
  var response = UrlFetchApp.fetch(url,{
    'headers' : {
      'Authorization' : 'Bearer ' + secret_token
    }
  });
  var response = UrlFetchApp.fetch(url, options);
  var content = JSON.parse(response.getContentText()).userId;
  return content;
}