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
      case "管理コマンド" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_manager
        };
        break;
      case "料金" :
        var data = returnMessage(token, "・鳴子/片方:￥1,250\n・鳴子/1組:￥2,500\n・衣装:￥20,000");
        break;
      case "申請状況確認" :
        var data = checkApplicationStatus(userId,token);
        break;
      // 管理者用メンバー申請状況確認
      case "メンバー申請状況" :
        var data = checkStatusForManager(token);
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
          "messages" : quick_rep_purchase
        };
        break;
      case "受け取り確認" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_receive
        };
        break;
      case "鳴子/1組(a)" :
        var item = "鳴子/1組";
        var price = 2500;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "鳴子/片方(a)" :
        var item = "鳴子/片方";
        var price = 1250;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;  
      case "衣装/XS(a)" :
        var item = "衣装/XS";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/S(a)" :
        var item = "衣装/S";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/M(a)" :
        var item = "衣装/M";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/L(a)" :
        var item = "衣装/L";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/XL(a)" :
        var item = "衣装/XL";
        var price = 20000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "支払い関連" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_payment
        };
        break;
      case "鳴子/1組(p)" :
        var item = "鳴子/1組";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(p)" :
        var item = "鳴子/片方";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/XS(p)" :
        var item = "衣装/XS";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/S(p)" :
        var item = "衣装/S";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(p)" :
        var item = "衣装/M";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(p)" :
        var item = "衣装/L";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/XL(p)" :
        var item = "衣装/XL";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/1組(r)" :
        var item = "鳴子/1組";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(r)" :
        var item = "鳴子/片方";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/XS(r)" :
        var item = "衣装/XS";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/S(r)" :
        var item = "衣装/S";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(r)" :
        var item = "衣装/M";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(r)" :
        var item = "衣装/L";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/XL(r)" :
        var item = "衣装/XL";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "申請取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_purchase_cancel
        };
        break;
      case "鳴子/1組(ad)" :
        var item = "鳴子/1組";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "鳴子/片方(ad)" :
        var item = "鳴子/片方";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;  
      case "衣装/XS(ad)" :
        var item = "衣装/XS";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/S(ad)" :
        var item = "衣装/S";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/M(ad)" :
        var item = "衣装/M";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/L(ad)" :
        var item = "衣装/L";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/XL(ad)" :
        var item = "衣装/XL";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "支払い取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_cancel_payment
        };
        break;
      case "鳴子/1組(pd)" :
        var item = "鳴子/1組";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "鳴子/片方(pd)" :
        var item = "鳴子/片方";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;  
      case "衣装/XS(pd)" :
        var item = "衣装/XS";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/S(pd)" :
        var item = "衣装/S";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/M(pd)" :
        var item = "衣装/M";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/L(pd)" :
        var item = "衣装/L";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/XL(pd)" :
        var item = "衣装/XL";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      default :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep
        };
        break;
    }
  }else{
    var data = {
      "replyToken" : token,
      "messages" : quick_rep
    };
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

// 申請状況確認
function checkApplicationStatus(userId, setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  var data = "";
  for(var i=1; i<= lastRow+1; i++){
    if(ss.getRange(i, 1).getValue() == userId){
      if(ss.getRange(i, 5).getValue() == false && ss.getRange(i, 6).getValue() == false){
        data += (ss.getRange(i, 4).getValue() + ":支払い待ち\n");
        count -= 1;
      }else if(ss.getRange(i, 5).getValue() == true && ss.getRange(i, 6).getValue() == false){
        data += (ss.getRange(i, 4).getValue() + ":受け取り確認待ち\n");
        count -= 1;
      }else{
        count -= 1;
      }
    }else{
      count -= 1;
    }
  }
  if(data == ""){
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : "現在申請中のものはありません。"
      }]
    };
    return reply;
  }else{
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : data + "\n上記で問題がなければ、対応をお願いします！"
      }]
    };
    return reply;
  }
}

// 管理者用メンバー申請状況確認機能
function checkStatusForManager(setToken){
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key=1qCla9GOzlP0e2XHqbyWb8N66RdaeU8ClHCuXhcaAC3k");
  var ss = sheet.getSheets()[0];
  ss.sort(3,false);
  var lastRow = ss.getLastRow();
  var count = lastRow + 1;
  var data = "";
  for(var i=1; i<= lastRow; i++){
    if(ss.getRange(i, 5).getValue() == false && ss.getRange(i, 6).getValue() == false){
      data += ("・" + ss.getRange(i, 2).getValue() + "\n    " + ss.getRange(i, 4).getValue() + ":支払い待ち\n");
        count -= 1;
      }else if(ss.getRange(i, 5).getValue() == true && ss.getRange(i, 6).getValue() == false){
        data += ("・" + ss.getRange(i, 2).getValue() + "\n    " + ss.getRange(i, 4).getValue() + ":受け取り確認待ち\n");
        count -= 1;
      }else{
        count -= 1;
      }
  }
  if(data == ""){
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : "現在メンバーによる申請中のものはありません。"
      }]
    };
    return reply;
  }else{
    var reply = {
      "replyToken" : setToken, 
      "messages" : [{
        "type" : "text",
        "text" : data + "\n以上がメンバーによる申請状況です。"
      }]
    };
    return reply;
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
        "title": "イベントに参加したい",
        "text": "イベント参加申請",
        "actions": [{"type": "message",
                     "label": "イベント参加",
                     "text": "サークルスクエア"}]
      },
      {
        "title": "祭り参加のキャンセルをしたい",
        "text": "キャンセル連絡先",
        "actions": [{"type": "message",
                     "label": "キャンセル連絡",
                     "text": "キャンセル連絡"}]
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

// 購入申請をQuickReplyで実装
quick_rep_purchase = [{
  "type": "text",
  "text": "どれを購入しますか？下のメニューから選択してください。\n\n・鳴子/片方:￥1,250\n・鳴子/1組:￥2,500\n・衣装:￥20,000",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/片方",
          "text" : "鳴子/片方(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/1組",
          "text" : "鳴子/1組(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XS",
          "text" : "衣装/XS(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/S",
          "text" : "衣装/S(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/M",
          "text" : "衣装/M(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/L",
          "text" : "衣装/L(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XL",
          "text" : "衣装/XL(a)"
        }
      }
    ]
  }
}]

// 購入申請取消をQuickReplyで実装
quick_rep_purchase_cancel = [{
  "type": "text",
  "text": "どの物品の購入申請をキャンセルしますか？下のメニューから選択してください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/片方",
          "text" : "鳴子/片方(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/1組",
          "text" : "鳴子/1組(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XS",
          "text" : "衣装/XS(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/S",
          "text" : "衣装/S(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/M",
          "text" : "衣装/M(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/L",
          "text" : "衣装/L(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XL",
          "text" : "衣装/XL(ad)"
        }
      }
    ]
  }
}]

// 支払い確認をQuickReplyで実装
quick_rep_payment = [{
  "type": "text",
  "text": "購入申請後、振込を行う場合は以下の口座に振り込んでね!\n■口座\nXXX\n\n振込が完了している場合は、以下のメニューから支払いが完了したものを選択してください。\n各備品の値段が知りたい場合は、以下のメニューから「料金」を選択してください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/片方",
          "text" : "鳴子/片方(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/1組",
          "text" : "鳴子/1組(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XS",
          "text" : "衣装/XS(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/S",
          "text" : "衣装/S(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/M",
          "text" : "衣装/M(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/L",
          "text" : "衣装/L(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XL",
          "text" : "衣装/XL(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "料金",
          "text" : "料金"
        }
      }
    ]
  }
}]

// 支払い確認取消をQuickReplyで実装
quick_rep_cancel_payment = [{
  "type": "text",
  "text": "支払い確認を取り消す場合は、取り消す備品を選択してください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/片方",
          "text" : "鳴子/片方(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/1組",
          "text" : "鳴子/1組(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XS",
          "text" : "衣装/XS(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/S",
          "text" : "衣装/S(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/M",
          "text" : "衣装/M(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/L",
          "text" : "衣装/L(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XL",
          "text" : "衣装/XL(pd)"
        }
      }
    ]
  }
}]

// 物品受け取りをQuickReplyで実装
quick_rep_receive = [{
  "type": "text",
  "text": "物品を受け取ったら、以下のメニューから受け取った備品を選択して受け取り確認を行ってください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/片方",
          "text" : "鳴子/片方(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "鳴子/1組",
          "text" : "鳴子/1組(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XS",
          "text" : "衣装/XS(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/S",
          "text" : "衣装/S(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/M",
          "text" : "衣装/M(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/L",
          "text" : "衣装/L(r)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装/XL",
          "text" : "衣装/XL(r)"
        }
      }
    ]
  }
}]

// QuickReplyでメニューの実装
quick_rep = [{
  "type": "text",
  "text": "知りたい情報を下のメニューから探してね。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "申請状況を知りたい！",
          "text" : "申請状況確認"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "購入申請を取り消したい！",
          "text" : "申請取消"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "支払い確認を取り消したい！",
          "text": "支払い取消"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "備品などの料金の確認がしたい！",
          "text" : "料金"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "口座情報が知りたい！",
          "text" : "振込口座"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "イベントに関して分からないことがある！",
          "text" : "イベント連絡"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "振り動画を見たい！",
          "text": "振り動画"
        }
      }
    ]
  }
}]

// 管理者コマンド
quick_rep_manager = [{
  "type": "text",
  "text": "管理者用コマンド",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "メンバーの申請状況確認",
          "text" : "メンバー申請状況"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "なんか他あれば",
          "text" : "なんか他あれば"
        }
      }
    ]
  }
}]