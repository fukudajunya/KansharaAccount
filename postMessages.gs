/**
 * スラックにPostする際の詳細の設定
 *
 * @ param object value
 * @ return void
 */
function postMessage(value){
  var options = {
    'method': 'post',
    'headers': {'Content-type': 'application/json'},
    'payload' : JSON.stringify({
    'channel' : 'dev_gss_connect_test',
      'attachments':[
       {                                                              
        'fallback': '物品/イベント購入管理シート更新通知',
        'color': '#36a64f',
        'title': '物品/イベント購入管理シート更新通知',
        'title_link': 'https://docs.google.com/spreadsheets/d/1o4ic-nhGv7szSHVO2HBtRZfjqhEJvvXqTxS441a7J4w/edit#gid=0',
        'text': value,                                                 
       }
      ]
    })
  };
  UrlFetchApp.fetch("https://hooks.slack.com/services/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", options);  
 }