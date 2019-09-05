(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1362:function(e,t,s){"use strict";(function(t){s(121);var n=s(15),i=s(17),a=(s(86),s(147)),r=s(1445).RippleAPI,o=s(510),c=(s(65),s(85)),v=s(105);s(146);e.exports=s(6)({ja:s(1649),en:s(1650)})({data:function(){return{sendAmount:0,sendAddress:"",fiatConv:0,password:"",address:"",qrDataUrl:"",shareable:n.shareable(),incorrect:!1,requirePassword:!0,api:null,connected:!1,loading:!1,plzActivate:!1,balances:null,keyPair:null,sent:!1,histError:!1,history:null,memo:"",destTag:0,server:"wss://s2.ripple.com:443",confirm:!1,price:1,serverDlg:!1,invAmt:""}},store:s(11),methods:{getBalance:function(){var e=this;this.address&&this.connected&&(this.loading=!0,this.api.getBalances(this.address).then(function(t){return e.$set(e,"balances",t),e.loading=!1,e.api.getTransactions(e.address,{minLedgerVersion:74e5})}).then(function(t){e.$set(e,"history",t.map(function(t){var s={type:"unknown"};return t.specification.source&&(t.specification.source.address===e.address?s.type="send":t.specification.destination.address===e.address&&(s.type="receive"),s.srcAddr=t.specification.source.address,s.destAddr=t.specification.destination.address,s.balanceChange=t.outcome.balanceChanges[e.address]),s})),e.plzActivate=!1}).catch(function(t){e.loading=!1,"actNotFound"!==t.message?e.$store.commit("setError",t.message):e.plzActivate=!0}))},copyAddress:function(){n.copy(this.address)},share:function(e){var t=this,s=e.target.getBoundingClientRect(),i=s.left+","+s.top+","+s.width+","+s.height;n.share({url:this.url},i).then(function(){}).catch(function(){t.copyAddress()})},send:function(){var e=this;this.confirm=!1,this.loading=!0;var a=Math.floor(1e6*parseFloat(this.sendAmount)),r={source:{address:this.address,maxAmount:{value:(a/1e6).toString(),currency:"XRP"}},destination:{address:this.sendAddress,amount:{value:(a/1e6).toString(),currency:"XRP"},tag:0|this.destTag},memos:[{data:this.memo}]};Promise.all([this.api.preparePayment(this.address,r,{maxLedgerVersionOffset:5}),i.get("keyPairs")]).then(function(s){var i=o.generateSeed({entropy:t.from(n.decrypt(s[1].entropy,e.password),"hex")}),a=e.api.sign(s[0].txJSON,i);return e.api.submit(a.signedTransaction)}).then(function(t){e.loading=!1,"tesSUCCESS"===t.resultCode?(e.sendAddress="",e.sendAmount=0,e.memo="",e.destTag=0,e.$store.commit("setFinishNextPage",{page:s(175),infoId:"sent",payload:{txId:""}}),e.$emit("replace",s(106))):e.$store.commit("setError",t.resultCode+":"+t.resultMessage)}).catch(function(t){e.loading=!1,e.$store.commit("setError",t.message)})},connect:function(){var e=this;this.loading=!0,this.serverDlg=!1,this.api=new r({server:this.server||"wss://s2.ripple.com:443"}),this.api.connect().then(function(){e.connected=!0,e.loading=!1,e.getBalance()}).catch(function(t){e.loading=!1,e.$store.commit("setError",t.message)}),this.api.on("error",function(t,s,n){e.$store.commit("setError",t+":"+s)})},getPrice:function(){var e=this;c({url:"https://public.bitbank.cc/xrp_jpy/ticker",method:"GET"}).then(function(t){return e.price=t.data.data.last,n.getPrice("jpy",e.$store.state.fiat)}).then(function(t){e.price*=t}).catch(function(){e.price=1})},getQrCode:function(){var e=this;a.toDataURL(this.url,{errorCorrectionLevel:"M",type:"image/png"},function(t,s){e.qrDataUrl=s})}},computed:{url:function(){return n.getBip21("ripple",this.address,{amount:parseFloat(this.invAmt),label:this.invMosaic},"url"===this.addressFormat)}},watch:{fiatConv:function(e){this.sendAmount=parseFloat(e)/this.price},sendAmount:function(e){this.fiatConv=parseFloat(e)*this.price},invAmt:function(){this.getQrCode()}},mounted:function(){var e=this,t=this.$store.state.extensionSend||{},n=parseFloat(t.amount)||0;t.address&&(this.sendAddress=t.address,this.sendAmount=n),this.$store.commit("setExtensionSend",{}),this.connect(),this.getPrice(),v.extStorage("xrp").get("address").then(function(t){t?(e.address=t,e.getBalance(),e.getQrCode(),e.sendAddress&&(e.sendMenu=!0)):e.$emit("push",{extends:s(325),data:function(){return{requirePassword:!0}}})})}})}).call(this,s(4).Buffer)},1649:function(e,t,s){var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-ons-page",{attrs:{"data-page":"xrp"}},[s("custom-bar",{attrs:{title:"Ripple",menu:"true"}},[s("v-ons-toolbar-button",{on:{click:e.getBalance,contextmenu:function(t){e.serverDlg=!0}}},[s("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),e._v(" "),s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:e.address,expression:"address"}]},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.plzActivate,expression:"plzActivate"}],staticClass:"description"},[s("h1",[e._v("リップル")]),e._v(" "),s("p",[e._v("\n          リップルとは、ビットコインにインスパイヤされた高速な国際送金を実現するために作られた分散型台帳システムです。現在では、その高速な着金のため"),s("b",[e._v("決済システム")]),e._v("としても利用されています。 "),s("br")]),e._v(" "),s("p",[e._v("\n          Q. ビットコインと何が違うの? "),s("br"),e._v("\n          A. ビットコインは、ブロックチェーンを用いています。その書き込み権利はプルーフ・オブ・ワークによって決定されています。この欠点は、時間がかかること、大量のエネルギーを消費することです。それに対してリップルはリップルレジャーというブロックチェーンとは一味違う台帳に書き込んでいます。リップルは、書き込む権限を制限する代わりに、"),s("b",[e._v("エネルギーを無駄にせず、数秒で取引を完了")]),e._v("することができます。")]),e._v(" "),s("p",[e._v("\n          Q. つまり、リップルは中央集権なの？ "),s("br"),e._v("\n          A. はい、まさにその通りです。書き込む権限を持った人たちが裏切ったらネットワークは崩壊します。\n        ")]),e._v(" "),s("p",[e._v("\n          Q. パブリックチェーンなの？プライベートチェーンなの？ "),s("br"),e._v("\n          A. ブロックチェーンじゃないのでどちらでもありません。大事なことなので二回言います。"),s("b",[e._v("リップルはブロックチェーンを使っていません")])]),e._v(" "),s("p",[e._v("\n          リップルを始めるには、下記のリップルアドレスに 20 XRP を送金してアカウントを有効化してください。\n        ")])]),e._v(" "),s("div",{attrs:{id:"simp1le"}},[s("div",{attrs:{id:"qrArea"}},[s("div",{attrs:{id:"qrcode"}},[s("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),e._v(" "),s("div",{staticClass:"address"},[e._v(e._s(e.address||"読み込み中"))])]),e._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"請求額",type:"number"},model:{value:e.invAmt,callback:function(t){e.invAmt=t},expression:"invAmt"}})],1),e._v(" "),s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.copyAddress}},[s("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),e._v("\n          アドレスコピー\n        ")],1),e._v(" "),e.shareable?s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.share}},[s("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),e._v("共有\n        ")],1):e._e()],1),e._v(" "),s("v-ons-list",{directives:[{name:"show",rawName:"v-show",value:!e.plzActivate,expression:"!plzActivate"}]},[s("v-ons-list-header",[e._v("残高")]),e._v(" "),e._l(e.balances,function(t){return s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v(e._s(t.value))]),e._v(" "),s("div",{staticClass:"right"},[e._v(e._s(t.currency))])])}),e._v(" "),s("v-ons-list-header",[e._v("送る")]),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"送金先アドレス"},model:{value:e.sendAddress,callback:function(t){e.sendAddress=t},expression:"sendAddress"}})],1),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("相手に送金する金額")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.sendAmount,callback:function(t){e.sendAmount=t},expression:"sendAmount"}})],1)]),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("法定通貨換算")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.fiatConv,callback:function(t){e.fiatConv=t},expression:"fiatConv"}})],1)]),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("宛先タグ")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.destTag,callback:function(t){e.destTag=t},expression:"destTag"}})],1)]),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"メモ"},model:{value:e.memo,callback:function(t){e.memo=t},expression:"memo"}})],1),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"パスワード",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),s("v-ons-list-item",[s("v-ons-button",{attrs:{modifier:"large",disabled:!e.sendAddress||!e.sendAmount},on:{click:function(t){e.confirm=!0}}},[e._v("送信")])],1),e._v(" "),s("v-ons-list-header",[e._v("履歴")]),e._v(" "),e._l(e.history,function(t){return s("v-ons-list-item",["send"===t.type?s("div",{staticClass:"left"},[e._v("送金")]):e._e(),e._v(" "),"receive"===t.type?s("div",{staticClass:"left"},[e._v("受け取り")]):e._e(),e._v(" "),"unknown"===t.type?s("div",{staticClass:"left"},[e._v("非対応のコマンド")]):e._e(),e._v(" "),"send"===t.type?s("div",{staticClass:"center"},[e._v(e._s(t.destAddr))]):e._e(),e._v(" "),"receive"===t.type?s("div",{staticClass:"center"},[e._v(e._s(t.srcAddr))]):e._e(),e._v(" "),s("div",{staticClass:"right"},e._l(t.balanceChange,function(e){return s("currency-set",{attrs:{amount:e.value,ticker:e.currency,notKnown:!0}})}))])}),e._v(" "),s("v-ons-list-item",{on:{click:function(t){e.serverDlg=!0}}},[e._v("\n          サーバー変更\n        ")])],2)],1)]),e._v(" "),s("v-ons-modal",{attrs:{visible:e.loading}},[s("p",{staticStyle:{"text-align":"center"}},[e._v("\n      処理中\n      "),s("br"),s("br")]),s("div",{staticClass:"spinner"}),e._v(" "),s("br"),e._v(" "),s("p")]),e._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.confirm},on:{"update:visible":function(t){e.confirm=t}}},[s("span",{attrs:{slot:"title"},slot:"title"},[e._v("送金確認")]),e._v(" "),s("p",[e._v(e._s(e.sendAddress))]),e._v(" "),s("p",[e._v(e._s(e.sendAmount)+"XRP")]),e._v(" "),s("p",[e._v("失敗しても手数料がかかるときがあるので注意")]),e._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:e.send}},[e._v("送金")]),e._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:function(t){e.confirm=!1}}},[e._v("戻る")])])],2),e._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.serverDlg},on:{"update:visible":function(t){e.serverDlg=t}}},[s("span",{attrs:{slot:"title"},slot:"title"},[e._v("サーバー変更")]),e._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"wss://s2.ripple.com:443"},model:{value:e.server,callback:function(t){e.server=t},expression:"server"}})],1),e._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:function(t){e.serverDlg=!1}}},[e._v("閉じる")]),e._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:e.connect}},[e._v("接続")])])],2)],1)},i=[];e.exports=function(e){var t="function"==typeof e?e.options:e;return t.render=n,t.staticRenderFns=i,e}},1650:function(e,t,s){var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-ons-page",{attrs:{"data-page":"xrp"}},[s("custom-bar",{attrs:{title:"Ripple",menu:"true"}},[s("v-ons-toolbar-button",{on:{click:e.getBalance,contextmenu:function(t){e.serverDlg=!0}}},[s("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),e._v(" "),s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:e.address,expression:"address"}]},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.plzActivate,expression:"plzActivate"}],staticClass:"description"},[s("h1",[e._v("Ripple")]),e._v(" "),s("p",[e._v("\n          Ripple is the distributed ledger system to send funds internationally, inspired by bitcoin. But by its fast money reception, it is also used as "),s("b",[e._v("Payment System")]),e._v(".  "),s("br")]),e._v(" "),s("p",[e._v("\n          Q. What is the difference between bitcoin?? "),s("br"),e._v("\n          A. Bitcoin uses the blockchain. The right to write it is decided by Proof of Work. Shortcomings is that it consumes many time and energy. Whereas, transactions of Ripple is written in Ripple Ledger, which is different from blockchain. Instead of restricting write permission, Ripple can "),s("b",[e._v("complete transactions in a moment without wasting energy")]),e._v(". ")]),e._v(" "),s("p",[e._v("\n          Q. In other words, is Ripple centralized solution? "),s("br"),e._v("\n          A. Yes. That's right. When writers betray, this network will break down.\n        ")]),e._v(" "),s("p",[e._v("\n          Q. Is it public chain, or private chain? "),s("br"),e._v("\n          A. Neither is incorrect because Ripple isn't the blockchain. I say repeatedly. "),s("b",[e._v("Ripple does not use blockchain. ")])]),e._v(" "),s("p",[e._v("\n          To begin Ripple, send  20 XRP  and activate this account.\n        ")])]),e._v(" "),s("div",{attrs:{id:"simp1le"}},[s("div",{attrs:{id:"qrArea"}},[s("div",{attrs:{id:"qrcode"}},[s("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),e._v(" "),s("div",{staticClass:"address"},[e._v(e._s(e.address||"Loading"))])]),e._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"invoice amount",type:"number"},model:{value:e.invAmt,callback:function(t){e.invAmt=t},expression:"invAmt"}})],1),e._v(" "),s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.copyAddress}},[s("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),e._v("\n          Copy address\n        ")],1),e._v(" "),e.shareable?s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.share}},[s("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),e._v("Share\n        ")],1):e._e()],1),e._v(" "),s("v-ons-list",{directives:[{name:"show",rawName:"v-show",value:!e.plzActivate,expression:"!plzActivate"}]},[s("v-ons-list-header",[e._v("balance")]),e._v(" "),e._l(e.balances,function(t){return s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v(e._s(t.value))]),e._v(" "),s("div",{staticClass:"right"},[e._v(e._s(t.currency))])])}),e._v(" "),s("v-ons-list-header",[e._v("Send")]),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"send address"},model:{value:e.sendAddress,callback:function(t){e.sendAddress=t},expression:"sendAddress"}})],1),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("amount to send")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.sendAmount,callback:function(t){e.sendAmount=t},expression:"sendAmount"}})],1)]),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("Legal currency conversion")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.fiatConv,callback:function(t){e.fiatConv=t},expression:"fiatConv"}})],1)]),e._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[e._v("Destination Tag")]),e._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:e.destTag,callback:function(t){e.destTag=t},expression:"destTag"}})],1)]),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"memo"},model:{value:e.memo,callback:function(t){e.memo=t},expression:"memo"}})],1),e._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"Password",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),s("v-ons-list-item",[s("v-ons-button",{attrs:{modifier:"large",disabled:!e.sendAddress||!e.sendAmount},on:{click:function(t){e.confirm=!0}}},[e._v("Send")])],1),e._v(" "),s("v-ons-list-header",[e._v("History")]),e._v(" "),e._l(e.history,function(t){return s("v-ons-list-item",["send"===t.type?s("div",{staticClass:"left"},[e._v("Send")]):e._e(),e._v(" "),"receive"===t.type?s("div",{staticClass:"left"},[e._v("Receive")]):e._e(),e._v(" "),"unknown"===t.type?s("div",{staticClass:"left"},[e._v("Unknown command")]):e._e(),e._v(" "),"send"===t.type?s("div",{staticClass:"center"},[e._v(e._s(t.destAddr))]):e._e(),e._v(" "),"receive"===t.type?s("div",{staticClass:"center"},[e._v(e._s(t.srcAddr))]):e._e(),e._v(" "),s("div",{staticClass:"right"},e._l(t.balanceChange,function(e){return s("currency-set",{attrs:{amount:e.value,ticker:e.currency,notKnown:!0}})}))])}),e._v(" "),s("v-ons-list-item",{on:{click:function(t){e.serverDlg=!0}}},[e._v("\n          Change Server\n        ")])],2)],1)]),e._v(" "),s("v-ons-modal",{attrs:{visible:e.loading}},[s("p",{staticStyle:{"text-align":"center"}},[e._v("\n      processing\n      "),s("br"),s("br")]),s("div",{staticClass:"spinner"}),e._v(" "),s("br"),e._v(" "),s("p")]),e._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.confirm},on:{"update:visible":function(t){e.confirm=t}}},[s("span",{attrs:{slot:"title"},slot:"title"},[e._v("Confirm")]),e._v(" "),s("p",[e._v(e._s(e.sendAddress))]),e._v(" "),s("p",[e._v(e._s(e.sendAmount)+"XRP")]),e._v(" "),s("p",[e._v("Please pay attention because fee is collected even failure. ")]),e._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:e.send}},[e._v("Send")]),e._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:function(t){e.confirm=!1}}},[e._v("Back")])])],2),e._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.serverDlg},on:{"update:visible":function(t){e.serverDlg=t}}},[s("span",{attrs:{slot:"title"},slot:"title"},[e._v("Change Server")]),e._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"wss://s2.ripple.com:443"},model:{value:e.server,callback:function(t){e.server=t},expression:"server"}})],1),e._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:function(t){e.serverDlg=!1}}},[e._v("Close")]),e._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:e.connect}},[e._v("Connect")])])],2)],1)},i=[];e.exports=function(e){var t="function"==typeof e?e.options:e;return t.render=n,t.staticRenderFns=i,e}}}]);