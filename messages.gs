//持ち物確認用Carousel
ret_check = {
  "type": "template",
  "template": {
    "type" : "carousel",
    "columns": [
      {
        "text": "[衣装]\n・法被\n・グレーのインナー\n・グレーズボン\n・帯\n・垂らす布",
        "actions": [{"type": "message",
                     "label": "準備OK",
                     "text": "行ってきます!"}]
      },
      {
        "text": "[各自準備]\n・黒足袋\n・鳴子(or提灯or纏)\n・貴重品袋\n・黒レギンス\n・黒タンクトップ\n・安全ピン5~6本\n・着替え",
        "actions": [{"type": "message",
                     "label": "準備OK",
                     "text": "行ってきます!"}]
      }
    ]
  },
  "altText": "持ち物チェック"
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
        "title": "担当者に質問がしたい",
        "text": "教えて担当さん",
        "actions": [{"type": "message",
                     "label": "担当はだれ？",
                     "text": "教えて担当さん"}]
      },
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
                 "title": "NAZ振り動画",
                 "text": "それぞれ有効に使ってね",
                 "actions": 
                        [{"type": "uri",
                          "label": "NAZ センター取り説明動画",
                          "uri": "https://youtu.be/bXvcxLxTrig"},
                         {"type": "uri",
                          "label": "曲通し(前から)",
                          "uri": "https://youtu.be/H2uYj0VvuPY"},
                         {"type": "uri",
                          "label": "曲通し(後ろから)",
                          "uri": "https://youtu.be/A7DJsYtZeF0"},
                        ]
                  }
               ]
  },
  "altText": "振り動画"
}


// 購入申請をQuickReplyで実装
quick_rep_purchase = [{
  "type": "text",
  "text": "どれを購入しますか？下のメニューから選択してください。\n\n・鳴子/片方:￥1,300\n・鳴子/1組:￥2,500\n・衣装:￥20,000",
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
          "label": "衣装",
          "text" : "衣装(a)"
        }
      }
    ]
  }
}]

// 購入申請取消をQuickReplyで実装
quick_rep_purchase_cancel = [{
  "type": "text",
  "text": "どの申請をキャンセルしますか？下のメニューから選択してください。",
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
          "label": "衣装",
          "text" : "衣装(ad)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "さくよさ",
          "text" : "さくよさ(ad)"
        }
      }
    ]
  }
}]

// 支払い確認をQuickReplyで実装
quick_rep_payment = [{
  "type": "text",
  "text": "購入申請後、振込を行う場合は以下の口座に振り込んでね!\n■口座情報\n金融機関:三菱東京UFJ銀行\n支店名:八尾支店\n口座種別:普通\n口座番号:0199344\n口座名義:カンシャラ コウヅミナト\n\n振込が完了している場合は、以下のメニューから支払いが完了したものを選択してください。\n各備品の値段が知りたい場合は、以下のメニューから「料金」を選択してください。",
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
          "label": "衣装",
          "text" : "衣装(p)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "さくよさ",
          "text" : "さくよさ(p)"
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
  "text": "支払い確認を取り消す場合は、取り消す備品/イベント名を選択してください。",
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
          "label": "衣装",
          "text" : "衣装(pd)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "さくよさ",
          "text" : "さくよさ(pd)"
        }
      }
    ]
  }
}]

// 参加イベントをQuickReplyで実装
quick_rep_receive = [{
  "type": "text",
  "text": "どのイベントに参加するか選択してください。\n申請後は参加費の振込をお願いします。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "さくよさ(4/5(日))",
          "text" : "さくよさ(a)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "担当を教えて",
          "text" : "教えて担当さん"
        }
      }
    ]
  }
}]

// 参加者リストをQuickReplyで実装
quick_rep_participant = [{
  "type": "text",
  "text": "どのイベントの参加者リストを参照するか選択してください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "さくよさ",
          "text" : "さくよさ(e)"
        }
      }
    ]
  }
}]

// QuickReplyでメニューの実装
quick_rep = [{
  "type": "text",
  "text": "知りたい情報を下のメニューからスクロールして探してね。\n\n・衣装の着方について\n・申請状況確認\n・購入/参加申請の取消\n・支払い確認の取消\n・イベント参加者確認\n・備品などの料金確認\n・振込先の確認\n・動画チェクを受けたい\n\nあだ名を登録する場合は、「あだ名　XXX」とコメントしてください。",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "衣装の着方を知りたい！",
          "text": "衣装の着方を教えて！"
        }
      },
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
          "label": "購入/参加申請を取り消したい！",
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
      { // 参加者リストを追加
        "type": "action",
        "action": {
          "type": "message",
          "label": "イベントの参加者を知りたい！",
          "text": "参加者リスト"
        }
      },
      { // 動画チェック申請を追加
        "type": "action",
        "action": {
          "type": "message",
          "label": "動画をチェックしてほしい!",
          "text": "動画チェック"
        }
      }
    ]
  }
}]

// 動画確認対象者の地域
quick_rep_movie_check = [{
  "type": "text",
  "text": "自分が踊っている支部を教えてね!",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "大阪",
          "text" : "大阪(m)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "東京",
          "text" : "東京(m)"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "名古屋",
          "text" : "名古屋(m)"
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