// LINEの認証を突破するために必要なお作法
var secret_token = "1OYwFjZcbR38tVYs4D0NsuuUr6wu7uu2sDnTgemjp4faMWuw+9rXyufGgIK7fKIsD6NeY/aXeb8oXoQQKas/uLAVrdbvd5i/rFBA/Gjm7zJiWMYKu7x0pCR7NSQH0WsiMI/DTnrV4PETlym9jcUbKgdB04t89/1O/w1cDnyilFU="
var secret = "Bearer " + secret_token;

function doPost(e) {
  var events = JSON.parse(e.postData.contents).events;
  events.forEach(function(event){
    if(event.type == "follow"){
      follow(event);
    }else if (event.type == "unfollow"){
      unfollow(event);
    }
  });
  
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
    if(text.indexOf('あだ名') !== -1){  
        var data = addNickname(userId, text, token);
    }else{
      switch(text){
        case "振込口座" :
          var data = returnMessage(token, "金融機関:三菱東京UFJ銀行\n支店名:八尾支店\n口座種別:普通\n口座番号:0199344\n口座名義:カンシャラ コウヅミナト");
          break;
        case "墾田永年私財法2019" :
          var data = {
            "replyToken" : token, 
            "messages" : quick_rep_manager
          };
          break;
        case "料金" : 
          var data = returnMessage(token, "・鳴子/片方:￥1,300\n・鳴子/1組:￥2,500\n・衣装:￥20,000\n・さくよさ:￥3,000");
          break;
        case "申請状況確認" :
          var data = checkApplicationStatus(userId,token);
          break;
        case "メンバー申請状況" :
          var data = checkStatusForManager(token);
          break;  
        case "イベント連絡" :
          var data =  {
            "replyToken" : token, 
            "messages" : [ret_msg_inst]
          };
          break;
        case "行ってきます!" :
          var data = returnMessage(token, "行ってらっしゃい！");
          break;
        case "早く見たいなぁ" :
          var data = returnMessage(token, "もう少し待ってね！");
          break;
        case "教えて担当さん":
          var data = returnMessage(token, "★さくよさの担当は以下の2人です！相談はお二人へ！\n■祭り担当:みなと(http://line.me/ti/p/QFNJY_V7VK)\n■インスト担当:みんぽう(https://line.me/ti/p/27yDDATN_G)\n");
          break;
        case "衣装の着方を教えて！":
          var data = returnMessage(token, "作成中です！しばらく待ってね。");
          break;
        case "振り動画" :
          //var data = returnMessage(token, "振り動画は制作中です！しばらく待ってね。");
          var data =  {
          "replyToken" : token, 
          "messages" : [ret_msg_mv]
          };
          break;
        case "持ち物確認" :
          var data = returnMessage(token, "衣装が完成したら、持ち物を教えるね！");
          /*
          var data =  {
          "replyToken" : token, 
          "messages" : [ret_check]
          };
          */
          break;
        case "購入申請" :
          var data = {
            "replyToken" : token, 
            "messages" : quick_rep_purchase
          };
          break;
          //イベント参加申請
        case "イベント参加申請" :
          var data = {
            "replyToken" : token, 
            "messages" : quick_rep_receive
          };
          break;
          //イベント参加者リスト
        case "参加者リスト" :
          var data = {
            "replyToken" : token, 
            "messages" : quick_rep_participant
          };
          break;  
        case "衣装の着方":
          var data =  {
            "replyToken" : token, 
            "messages" : [quick_rep]
          };
          break;
        case "ジョジョ":
          var data = returnMessage(token, "無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄無駄");
          break;
        case "最高に":
          var data = returnMessage(token, "「ハイ！」ってやつだアアアアアアハハハハハハハハハハーッ");
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
        case "衣装(a)" :
          var item = "衣装";
          var price = 22000;
          var data = purchaseApplicationInfo(userId,userName,item,price,token);
          break;  
          //イベント参加申請用
        case "さくよさ(a)" :
          var item = "さくよさ";
          var price = 3000;
          var data = eventApplicationInfo(userId,userName,item,price,token)
          break;
          /*
          case "能登よさこい(a)" :
          var item = "能登よさこい";
          var price = 20000;
          var data = eventApplicationInfo(userId,userName,item,price,token)
          break;
          */
          //イベント参加者リスト参照用
        case "さくよさ(e)" :
          var item = "さくよさ";
          var data = eventParticipantInfo(userId,userName,item,token)
          break;
          /*
          case "能登よさこい(e)" :
          var item = "能登よさこい";
          var data = eventParticipantInfo(userId,userName,item,token)
          break;
          */
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
        case "衣装(p)" :
          var item = "衣装";
          var data = paymentStatusInfo(userId,userName,item,token);
          break;
        case "さくよさ(p)":
          var item = "さくよさ";
          var data = paymentStatusInfo(userId,userName,item,token);
          break;
          /*
          case "能登よさこい(p)":
          var item = "能登よさこい";
          var data = paymentStatusInfo(userId,userName,item,token);
          break;
          */
        case "鳴子/1組(r)" :
          var item = "鳴子/1組";
          var data = receivedStatusInfo(userId,userName,item,token);
          break;
        case "鳴子/片方(r)" :
          var item = "鳴子/片方";
          var data = receivedStatusInfo(userId,userName,item,token);
          break;  
        case "衣装(r)" :
          var item = "衣装";
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
        case "衣装(ad)" :
          var item = "衣装";
          var data = cancelPurchaseApplication(userId,userName,item,token);
          break;
        case "さくよさ(ad)" :
          var item = "さくよさ";
          var data = cancelPurchaseApplication(userId,userName,item,token);
          break;
          /*
          case "能登よさこい(ad)" :
          var item = "能登よさこい";
          var data = cancelPurchaseApplication(userId,userName,item,token);
          break;
          */
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
        case "衣装(pd)" :
          var item = "衣装";
          var data = cancelPaymentStatus(userId,userName,item,token);
          break;
        case "さくよさ(pd)" :
          var item = "さくよさ";
          var data = cancelPaymentStatus(userId,userName,item,token);
          break;
          /*
          case "能登よさこい(pd)" :
          var item = "能登よさこい";
          var data = cancelPaymentStatus(userId,userName,item,token);
          break;
          */
        default :
          var data = {
            "replyToken" : token,
            "messages" : quick_rep
          };
          break;
      }
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
