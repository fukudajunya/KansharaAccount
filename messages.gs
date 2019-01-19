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