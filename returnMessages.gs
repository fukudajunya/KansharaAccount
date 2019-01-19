function returnMessage(setToken, setText)  {
  var data = {
    "replyToken" : setToken, 
    "messages" : [{
      "type" : "text",
      "text" : setText
    }]
  };
  return data;
}
