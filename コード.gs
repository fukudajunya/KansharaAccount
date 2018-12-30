// LINE認証
var secret_token = "DIc4nUB883QVOrxbKlYr/tdnaJY/uFUZuNCyw59ETsUsGlUyQ8xVIpLc8F23oUoBD6NeY/aXeb8oXoQQKas/uLAVrdbvd5i/rFBA/Gjm7zKdiiAeSrJ0UbSA0DC0X6wWS+EEDBfHAWm2n55BORN98AdB04t89/1O/w1cDnyilFU="
var secret = "Bearer " + secret_token;

function doPost(e) {
  var line = JSON.parse(e.postData.contents).events[0];
  var json = e.postData.getDataAsString();
  
  // LINEから送信されてきたデータから、リプライトークンを取得
  var token = JSON.parse(json).events[0].replyToken;
  
  // 送信されてきたデータのタイプを取得
  var type = JSON.parse(json).events[0].message.type;
  
  // メッセージ送信者のユーザーIDを取得する
  var userId = getUserID(line);
  
  //UserNameの取得
  var userName = getUserName(userId);
  
  // リプライを返すAPIのURI
  var url = "https://api.line.me/v2/bot/message/reply";
  
  // HTTPヘッダーの設定
  var headers = {
    "Content-Type" : "application/json",
    "Authorization":secret
  };
  
  // タイプがtextの場合、処理を行う
  if(type == "text"){
    var text = JSON.parse(json).events[0].message.text;
    switch(text){
      case "連絡先" :
        var data = returnMessage(token,"■連絡先\n代表\nXXX");
        break;
      case "振込口座" :
        var data = returnMessage(token, "口座情報\nYYYY\nソン君の口座にお金いっぱい入れてね！");
        break;
      case "イベント連絡" :
         var data =  {
          "replyToken" : token, 
          "messages" : [ret_msg_inst]
        };
        break;
      case "キャンセル連絡" :
        var data =returnMessage(token, "この人に連絡してね。\n\n■まりな\nYYYY");
        break;
      case "サークルスクエア":
        var data = returnMessage(token, "https://www.c-sqr.net/cs75424/News.html");
        break;
      case "振り動画" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_msg_mv]
        };
        break;
      case "購入申請" :
        var data = {
          "replyToken" : token, 
          "messages" : [ret_msg_purchase_application]
        };
        break;
      case "受け取り確認" :
        // ToDo 物品受け取り申請時にカルーセルメニューを表示する
        var data = {
          "replyToken" : token, 
          "messages" : [ret_msg_received_application]
        };
        break;
      case "鳴子(a)" :
        var item = "鳴子";
        var price = 2500;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装(a)" :
        var item = "衣装";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "支払い確認" :
        var data = {
          "replyToken" : token, 
          "messages" : [ret_msg_payment_status]
        };
        break;
      case "鳴子(p)" :
        var item = "鳴子";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装(p)" :
        var item = "衣装";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子(r)" :
        var item = "鳴子";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装(r)" :
        var item = "衣装";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "申請取消" :
        var data = {
          "replyToken" : token,
          "messages" : [ret_msg_cancel_application]
        };
        break;
      case "鳴子(ad)" :
        var item = "鳴子";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装(ad)" :
        var item = "衣装";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "支払い取消" :
        var data = {
          "replyToken" : token,
          "messages" : [ret_msg_cancel_payment]
        };
        break;
      case "鳴子(pd)" :
        var item = "鳴子";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装(pd)" :
        var item = "衣装";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      default :
        var data = returnMessage(token, "メニューから知りたい情報を探してね!");
        break;
    }
  }else{
    var data = returnMessage(token, "メニューから知りたい情報を探してね!");
  };
  
  
  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };
  
  return UrlFetchApp.fetch(url, options);  
}

// 購入申請
function purchaseApplicationInfo(userId,userName,item,price,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var date = new Date();
  
  var count = lastRow + 1;
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i,4).getValue() == item && ss.getRange(i, 5).getValue() == false){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "以前申請を受けた" + item + "の支払いが完了していません。"
        }]
      };
      return data;
    }else if(count == 2){
      // 受け取りフラグFalseで追加
      ss.appendRow([userId, userName,date,item,'false','false',price]);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請を受け付けました。\n\n購入申請をキャンセルする場合は「申請取消」とコメントしてください。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }        
}

// 支払い状況を更新・確認
function paymentStatusInfo(userId, userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  // シートを日付でソートする(降順)
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var date = new Date();
  
  var count = lastRow + 1;
  for(var i=1; i<=lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == true && ss.getRange(i,4).getValue() == item){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の支払いはすでに完了しています。"
        }]
      };
      return data;
    }else if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == false && ss.getRange(i, 4).getValue() == item){
      ss.getRange(i, 5).setValue('true');
      ss.getRange(i, 3).setValue(date);
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の支払い確認ありがとうございます。会計で確認いたします。\n\nもし間違えて支払い確認してしまった場合、「支払い取消」とコメントしてください。"
        }]
      };
      return data;
    }else if(count == 2){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請がされていません。購入申請から申請をお願いします。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }        
}

// 物品受け取り情報を記録する
function receivedStatusInfo(userId, userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
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
          "text" : item + "の支払いが完了していません。支払いが済んだか確認してください。"
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
          "text" : item + "の購入申請がされていません。購入申請から申請をお願いします。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}


// 購入申請キャンセル
function cancelPurchaseApplication(userId,userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i, 5).getValue() == false && ss.getRange(i,4).getValue() == item){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : item + "の購入申請をキャンセルしました。"
        }]
      };
      ss.deleteRow(i);
      return data;
    }else if(count == 2){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "直近で" + item + "の購入申請はされていません。キャンセルできませんでした。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}

// 支払い確認キャンセル
// ToDo 受け取りフラグがTrueの場合、キャンセルができないようにする
function cancelPaymentStatus(userId,userName,item,setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId && ss.getRange(i,4).getValue() == item){
      if(ss.getRange(i, 5).getValue() == true && ss.getRange(i, 6).getValue() == false){
        var data = {
          "replyToken" : setToken, 
          "messages" : [{
            "type" : "text",
            "text" : item + "の支払い確認・更新をキャンセルしました。"
          }]
        };
        ss.getRange(i, 5).setValue('false');
        return data;
      }else{
        var data = {
          "replyToken" : setToken, 
          "messages" : [{
            "type" : "text",
            "text" : "直近で" + item + "の購入申請はされていません。キャンセルできませんでした。"
          }]
        };
        return data;
      }
    }else if(count == 2){
      var data = {
        "replyToken" : setToken, 
        "messages" : [{
          "type" : "text",
          "text" : "直近で" + item + "の購入申請はされていません。キャンセルできませんでした。"
        }]
      };
      return data;
    }else{
      count -= 1;
    }
  }
}

function returnMessage(setToken, setText)  {
  var data = {
    "replyToken" : setToken, 
    "messages" : [{
      "type" : "text",
      "text" : setText
    }]
  };
  return data;
};


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


ret_msg_purchase_application = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "鳴子を買いたい",
        "text" : "鳴子",
        "actions": [{"type": "message",
                     "label": "鳴子",
                     "text": "鳴子(a)"}]
      },
      {
        "title": "衣装を買いたい",
        "text" : "衣装",
        "actions": [{"type": "message",
                     "label": "衣装",
                     "text": "衣装(a)"}]
      }
    ]
  },
  "altText": "購入申請"
}

ret_msg_payment_status = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "鳴子の支払い確認",
        "text" : "鳴子",
        "actions": [{"type": "message",
                     "label": "鳴子",
                     "text": "鳴子(p)"}]
      },
      {
        "title": "衣装の支払い確認",
        "text" : "衣装",
        "actions": [{"type": "message",
                     "label": "衣装",
                     "text": "衣装(p)"}]
      }
    ]
  },
  "altText": "支払い確認"
}

ret_msg_received_application = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "鳴子を受け取りました",
        "text" : "鳴子",
        "actions": [{"type": "message",
                     "label": "鳴子",
                     "text": "鳴子(r)"}]
      },
      {
        "title": "衣装を受け取りました",
        "text" : "衣装",
        "actions": [{"type": "message",
                     "label": "衣装",
                     "text": "衣装(r)"}]
      }
    ]
  },
  "altText": "物品受け取り確認"
}

ret_msg_cancel_application = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "鳴子の購入申請をキャンセルしたい",
        "text" : "鳴子",
        "actions": [{"type": "message",
                     "label": "鳴子",
                     "text": "鳴子(ad)"}]
      },
      {
        "title": "衣装の購入申請をキャンセルしたい",
        "text" : "衣装",
        "actions": [{"type": "message",
                     "label": "衣装",
                     "text": "衣装(ad)"}]
      }
    ]
  },
  "altText": "購入申請キャンセル"
}

ret_msg_cancel_payment = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "鳴子の支払い確認をキャンセルしたい",
        "text" : "鳴子",
        "actions": [{"type": "message",
                     "label": "鳴子",
                     "text": "鳴子(pd)"}]
      },
      {
        "title": "衣装の支払い確認をキャンセルしたい",
        "text" : "衣装",
        "actions": [{"type": "message",
                     "label": "衣装",
                     "text": "衣装(pd)"}]
      }
    ]
  },
  "altText": "支払い確認キャンセル"
}

ret_msg =  {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "連絡先が知りたい",
        "text": "連絡先",
        "actions": [{"type": "message",
                     "label": "連絡先",
                     "text": "連絡先"}]
      },
      {
        "title": "振込口座が知りたい",
        "text": "振込口座",
        "actions": [{"type": "message",
                     "label": "振込口座",
                     "text": "振込口座"}]
      }
    ]
  },
  "altText": "一般情報"
}

ret_msg_inst = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "title": "祭り参加のキャンセルをしたい",
        "text": "キャンセル連絡",
        "actions": [{"type": "message",
                     "label": "キャンセル連絡",
                     "text": "キャンセル連絡"}]
      },
      {
        "title": "イベントに参加したい",
        "text": "イベント参加申請",
        "actions": [{"type": "message",
                     "label": "イベント参加",
                     "text": "サークルスクエア"}]
      }
    ]
  },
  "altText": "イベントに関する連絡"
}

ret_msg_mv = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [{
      "title": "解説動画1",
      "text": "①から②まで",
      "actions": [{"type": "uri",
                   "label": "振り動画1(0:00 - 0:30)",
                   "uri": "https://www.youtube.com/watch?v=ABtP-9WyRxQ&feature=youtu.be"},
                  {"type": "uri",
                   "label": "振り動画2(0:30 - 1:00)",
                   "uri": "https://www.youtube.com/watch?v=XOSLKT8JXmY&feature=youtu.be"},
                 ]
                  },
                  {
                  "title": "解説動画2",
                  "text": "③から④まで",
                  "actions": [{"type": "uri",
                  "label": "振り動画3(1:00 - 1:30)",
                  "uri": "https://www.youtube.com/watch?v=yVqfh0IrrRQ&feature=youtu.be"},
                  {"type": "uri",
                  "label": "振り動画4(1:30 - 2:00)",
                  "uri": "https://www.youtube.com/watch?v=s11F2xVm_94&feature=youtu.be"},
                 ]
    }]
  },
  "altText": "振り動画"
}