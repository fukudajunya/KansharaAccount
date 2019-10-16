// LINEの認証を突破するために必要なお作法
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
        var data = returnMessage(token, "・ゑ祭り参加費:￥3,000\n・Tシャツ:￥2,000（Tシャツ2枚セット：￥3,800）\n・鳴子/片方:￥1,300\n・鳴子/1組:￥2,500\n・衣装:￥22,000");
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
      case "キャンセル連絡" :
        // var data = returnMessage(token, "現在参加できるイベントはありません。")
        var data =returnMessage(token, "サークルスクエアで不参加への更新をお願いします。\nhttps://www.c-sqr.net/cs75424/News.html\n\n★ゑまつりについて、下記の二人にも連絡してね。\n\n■祭り担当:みなと\nhttps://line.me/ti/p/QFNJY_V7VK\n■インスト担当:たらこ\nhttps://line.me/ti/p/umUggC9ucM");
        break;  
      case "サークルスクエア":
        var data = returnMessage(token, "イベント参加はサークルスクエアより参加表明をお願いします。\n\nhttps://www.c-sqr.net/cs75424/News.html");
        break;
      case "教えて担当さん":
        var data = returnMessage(token, "★ゑまつりの担当は以下の2人です！相談はお二人へ！\n■祭り担当:みなと\nhttps://line.me/ti/p/QFNJY_V7VK\n■インスト担当:たらこ\nhttps://line.me/ti/p/umUggC9ucM\n\n");
        break;
      case "衣装の着方を教えて！":
        var data = returnMessage(token, "https://youtu.be/WV-yEM0DHhY");
        break;  
      case "振り動画" :
        // var data = returnMessage(token, "振り動画は制作中です！しばらく待ってね。");
        var data =  {
        "replyToken" : token, 
        "messages" : [ret_msg_mv]
        };
        
        break;
      case "持ち物チェック" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_check]
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
      case "ゑ祭り参加費(a)" :
        var item = "ゑ祭り参加費";
        var price = 3000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;    
      case "Tシャツ(a)" :
        var item = "Tシャツ";
        var price = 2000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "Tシャツ2枚(a)" :
        var item = "Tシャツ2枚";
        var price = 3800;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
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
      case "衣装/S(a)" :
        var item = "衣装/S";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/M(a)" :
        var item = "衣装/M";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/L(a)" :
        var item = "衣装/L";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/LL(a)" :
        var item = "衣装/LL";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;  
      case "支払い関連" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_payment
        };
        break;
　　　 case "ゑ祭り参加費(p)" :
        var item = "ゑ祭り参加費";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;  
      case "Tシャツ(p)" :
        var item = "Tシャツ";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "Tシャツ2枚(p)" :
        var item = "Tシャツ2枚";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/1組(p)" :
        var item = "鳴子/1組";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(p)" :
        var item = "鳴子/片方";
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
      case "衣装/LL(p)" :
        var item = "衣装/LL";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "ゑ祭り参加費(r)" :
        var item = "ゑ祭り参加費";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;  
      case "Tシャツ(r)" :
        var item = "Tシャツ";
        var data = receivedStatusInfo(userId,userName,item,price,token);
        break;
      case "Tシャツ2枚(r)" :
        var item = "Tシャツ2枚";
        var data = receivedStatusInfo(userId,userName,item,price,token);
        break;
      case "鳴子/1組(r)" :
        var item = "鳴子/1組";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(r)" :
        var item = "鳴子/片方";
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
      case "衣装/LL(r)" :
        var item = "衣装/LL";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "申請取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_purchase_cancel
        };
        break;
      case "ゑ祭り参加費(ad)" :
        var item = "ゑ祭り参加費";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "Tシャツ(ad)" :
        var item = "Tシャツ";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "Tシャツ2枚(ad)" :
        var item = "Tシャツ2枚";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "鳴子/1組(ad)" :
        var item = "鳴子/1組";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "鳴子/片方(ad)" :
        var item = "鳴子/片方";
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
      case "衣装/LL(ad)" :
        var item = "衣装/LL";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "支払い取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_cancel_payment
        };
        break;
      case "ゑ祭り参加費(pd)" :
        var item = "ゑ祭り参加費";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;    
      case "Tシャツ(pd)" :
        var item = "Tシャツ";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "Tシャツ2枚(pd)" :
        var item = "Tシャツ2枚";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "鳴子/1組(pd)" :
        var item = "鳴子/1組";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "鳴子/片方(pd)" :
        var item = "鳴子/片方";
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
      case "衣装/LL(pd)" :
        var item = "衣装/LL";
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
