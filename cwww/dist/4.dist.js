(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1353:function(e,s,t){"use strict";(function(s){var n=t(126),i=t(15),a=t(16),o=t(510).default,r=t(150),c=t(93),d=t(92),l=t(103),v=t(102),m=t(125),u=o.model.network.data.mainnet.id,p={"nem:xem":t(508),"ecobit:eco":t(1524),"lc:jpy":t(1523),"lc:usd":t(1522),"lc:zar":t(1521),"lc:hkd":t(1520),"lc:eur":t(1519),"lc:aud":t(1518),"lc:gbp":t(1517),"lc:chf":t(1516)},f=o.model.objects.create("endpoint")("https://shibuya.supernode.me",7891);function h(e){return e?s.from(e,"hex").toString("utf8"):""}e.exports=t(7)({ja:t(1515),en:t(1514)})({data:function(){return{sendAmount:0,sendAddress:"",sendMosaic:"",invMosaic:"",fiatConv:0,password:"",address:"",qrDataUrl:"",shareable:i.shareable(),incorrect:!1,loading:!1,balances:null,history:null,message:"",server:"shibuya.supernode.me:7891",confirm:!1,price:1,serverDlg:!1,invAmt:"",account:null,accountInfo:null,mosaics:null,unconfirmed:null,addressFormat:"url",common:null,transactionEntity:{},sendMenu:!1,invoiceMenu:!1}},store:t(12),methods:{getBalance:function(){var e=this;if(this.address){this.loading=!0,o.com.requests.account.data(f,this.address).then(function(s){e.loading=!1,e.accountInfo=s}).catch(function(s){e.loading=!1,e.$store.commit("setError",s)});var s=[];Promise.all([o.com.requests.account.mosaics.owned(f,this.address),o.com.requests.account.mosaics.allDefinitions(f,this.address)]).then(function(e){for(var t=[],n=e[0].data,i=e[1].data,a=0;a<n.length;a++)for(var r=n[a],d=0;d<i.length;d++){var l=i[d];if(r.mosaicId.namespaceId===l.id.namespaceId&&r.mosaicId.name===l.id.name){for(var v=6,m=l.properties,u=0;u<m.length;u++)"divisibility"===m[u].name&&(v=parseInt(m[u].value));s.push({definitions:l,supply:null,divisibility:v,quantity:r.quantity,mosaicId:r.mosaicId,normalizedQty:new c(r.quantity).shift(-v).toNumber(),icon:p[r.mosaicId.namespaceId+":"+r.mosaicId.name]}),t.push(o.com.requests.mosaic.supply(f,o.utils.format.mosaicIdToName(r.mosaicId)))}}return Promise.all(t)}).then(function(e){for(var t=0;t<e.length;t++)s[t].supply=e[t].supply;return s}).then(function(s){e.mosaics=s}).catch(function(s){e.loading=!1,e.$store.commit("setError",s)}),o.com.requests.account.transactions.all(f,this.address).then(function(s){e.history=s.data.map(function(e){var s=void 0;return s=e.transaction.otherTrans?e.transaction.otherTrans:e.transaction,{txHash:e.meta.hash.data,recipient:s.recipient,message:h(s.message.payload),timeStamp:(t=s.timeStamp,1427587585+t)};var t})}),o.com.requests.account.transactions.unconfirmed(f,this.address).then(function(s){e.unconfirmed=s.data.map(function(e){var s=void 0;return{recipient:(s=e.transaction.otherTrans?e.transaction.otherTrans:e.transaction).recipient,message:h(s.message.payload)}})})}},copyAddress:function(){i.copy(this.address)},share:function(e){var s=this,t=e.target.getBoundingClientRect(),n=t.left+","+t.top+","+t.width+","+t.height;i.share({url:this.url},n).then(function(){}).catch(function(){s.copyAddress()})},send:function(){var e=this;this.sendMenu=!1,this.confirm=!1,this.loading=!0;("@"===this.sendAddress[0]?o.com.requests.namespace.info(f,this.sendAddress.slice(1)).then(function(e){return e.owner}).catch(function(){throw"Namespace not found"}):Promise.resolve(this.sendAddress)).then(function(s){return e.sendAddress=s,a.get("keyPairs")}).then(function(s){for(var t=void 0,a=0;a<e.mosaics.length;a++){var r=e.mosaics[a];if(r.mosaicId.namespaceId+":"+r.mosaicId.name===e.sendMosaic){t=r;break}}if(!t)throw"You don't have this mosaic.";var d=new c(e.sendAmount).shift(t.divisibility).toNumber(),v=o.model.objects.create("mosaicAttachment")(t.mosaicId.namespaceId,t.mosaicId.name,d),m=o.model.objects.get("transferTransaction");m.mosaics.push(v),m.recipient=e.sendAddress,m.message=e.message;var p=o.model.objects.get("mosaicDefinitionMetaDataPair");p[e.sendMosaic]={mosaicDefinition:t.definitions,supply:t.supply};var f=e.common=o.model.objects.get("common"),h=n.mnemonicToSeed(n.entropyToMnemonic(i.decrypt(s.entropy,e.password))),g=l.HDNode.fromSeedBuffer(h).deriveHardened(44).deriveHardened(43).deriveHardened(0);f.privateKey=g.keyPair.d.toBuffer().toString("hex");var b=void 0;if("nem:xem"===e.sendMosaic)m.amount=parseFloat(e.sendAmount),b=o.model.transactions.prepare("transferTransaction")(f,m,u);else if(m.amount=1,b=o.model.transactions.prepare("mosaicTransferTransaction")(f,m,p,u),Math.floor(b.mosaics[0].quantity)!==d)throw"Too small decimals.";e.transactionEntity=b,e.confirm=!0,e.loading=!1}).catch(function(s){e.loading=!1,e.$store.commit("setError",s)})},broadcast:function(){var e=this;this.confirm=!1,this.loading=!0,o.model.transactions.send(this.common,this.transactionEntity,f).then(function(s){if(s.code>=2)throw s.message;e.loading=!1,e.sendAddress="",e.sendAmount=0,e.message="",e.destTag=0,e.$store.commit("setFinishNextPage",{page:t(172),infoId:"sent",payload:{txId:""}}),e.$emit("replace",t(124))}).catch(function(s){e.loading=!1,e.$store.commit("setError",s.data?s.data.message:s)})},connect:function(){this.serverDlg=!1},getPrice:function(){var e=this;d({url:"https://apiv2.bitcoinaverage.com/indices/crypto/ticker/XEMBTC",method:"GET"}).then(function(s){return e.price=s.data.last,i.getPrice("btc",e.$store.state.fiat)}).then(function(s){e.price*=s}).catch(function(){e.price=1})},getQrCode:function(){var e=this;r.toDataURL(this.url,{errorCorrectionLevel:"M",type:"image/png"},function(s,t){e.qrDataUrl=t})},openExplorer:function(e){i.openUrl("http:///explorer.nemchina.com/#/s_tx?hash="+e)},setServer:function(){var e=this.server.split(":");if(!e[1])return this.server="shibuya.supernode.me:7891",void(f=o.model.objects.create("endpoint")("https://shibuya.supernode.me",7891));f=o.model.objects.create("endpoint")("https://"+e[0],0|e[1])}},computed:{url:function(){switch(this.invAmt=parseFloat(this.invAmt)||0,this.addressFormat){case"url":case"monya":return i.getBip21("nem",this.address,{amount:parseFloat(this.invAmt),label:this.invMosaic},"url"===this.addressFormat);case"nemWallet":return'{"v":2,"type":2,"data":{"addr":"'+this.address+'","amount":'+1e6*this.invAmt+"}}";default:return this.address}},isValidAddress:function(){return"@"===this.sendAddress[0]||o.model.address.isValid(this.sendAddress)}},watch:{invAmt:function(){this.getQrCode()},invMosaic:function(){this.getQrCode()},sendMosaic:function(){this.invMosaic=this.sendMosaic},addressFormat:function(){this.getQrCode()}},mounted:function(){var e=this,s=this.$store.state.extensionSend||{},t=parseFloat(s.amount)||0;s.address&&(this.sendAddress=s.address,this.sendMosaic=s.label||"nem:xem",t&&(this.sendAmount=t)),this.$store.commit("setExtensionSend",{}),this.connect(),this.getPrice();v.extStorage("nem").get("address").then(function(s){s?(e.address=s,e.getBalance(),e.getQrCode(),e.sendAddress&&(e.sendMenu=!0)):e.$store.commit("setError",(new m.AddressNotFoundError).message)})},filters:{friendlyName:function(e){return{"ecobit:eco":"EcoBit","lc:jpy":"円","lc:usd":"Dollar","lc:zar":"South African Dollar","lc:hkd":"Hong Kong Dollar","lc:eur":"Euro","lc:aud":"Australian Dollar","lc:gbp":"Pound sterling","lc:chf":"Schweizer Franken"}[e]||e}}})}).call(this,t(1).Buffer)},1514:function(e,s,t){var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-ons-page",{attrs:{"data-page":"nem"}},[t("custom-bar",{attrs:{title:"NEM",menu:"true"}},[t("v-ons-toolbar-button",{on:{click:e.getBalance,contextmenu:function(s){e.serverDlg=!0}}},[t("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),e._v(" "),t("div",[t("div",[t("div",{attrs:{id:"simple"}},[t("div",{attrs:{id:"qrArea"}},[t("div",{attrs:{id:"qrcode"}},[t("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),e._v(" "),t("div",{staticClass:"address"},[e._v(e._s(e.address||"Loading"))])]),e._v(" "),t("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.copyAddress}},[t("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),e._v("\n          Copy address\n        ")],1),e._v(" "),t("v-ons-button",{attrs:{modifier:"quiet"},on:{click:function(s){e.invoiceMenu=!0}}},[e._v("\n          Make an invoice\n        ")])],1),e._v(" "),t("v-ons-list",[t("v-ons-list-header",{directives:[{name:"show",rawName:"v-show",value:e.unconfirmed&&e.unconfirmed.length,expression:"unconfirmed&&unconfirmed.length"}]},[e._v("There is an unconfirmed transaction.")]),e._v(" "),e._l(e.unconfirmed,function(s){return t("v-ons-list-item",[s.recipient!==e.address?t("div",{staticClass:"left"},[e._v("Send")]):e._e(),e._v(" "),s.recipient===e.address?t("div",{staticClass:"left"},[e._v("Receive")]):e._e(),e._v(" "),s.message?t("div",{staticClass:"center"},[e._v(e._s(s.message))]):e._e(),e._v(" "),s.message?e._e():t("div",{staticClass:"center"},[e._v("(no message)")])])}),e._v(" "),t("v-ons-list-header",[e._v("balance")]),e._v(" "),e._l(e.mosaics,function(s){return t("v-ons-list-item",{on:{click:function(t){e.sendMosaic=s.mosaicId.namespaceId+":"+s.mosaicId.name,e.sendMenu=!0}}},[t("div",{staticClass:"left"},[s.icon?t("img",{attrs:{src:s.icon}}):e._e()]),e._v(" "),t("div",{staticClass:"center"},[e._v(e._s(s.normalizedQty))]),e._v(" "),t("div",{staticClass:"right"},[e._v(e._s(e._f("friendlyName")(s.mosaicId.namespaceId+":"+s.mosaicId.name)))])])}),e._v(" "),t("v-ons-list-header",[e._v("History")]),e._v(" "),e._l(e.history,function(s){return t("v-ons-list-item",{attrs:{modifier:"chevron"},on:{click:function(t){e.openExplorer(s.txHash)}}},[s.recipient!==e.address?t("div",{staticClass:"left"},[e._v("Send")]):e._e(),e._v(" "),s.recipient===e.address?t("div",{staticClass:"left"},[e._v("Receive")]):e._e(),e._v(" "),s.message?t("div",{staticClass:"center"},[e._v(e._s(s.message))]):e._e(),e._v(" "),s.message?e._e():t("div",{staticClass:"center"},[e._v("((no message))")]),e._v(" "),t("div",{staticClass:"right"},[t("timestamp",{attrs:{timestamp:s.timeStamp}})],1)])}),e._v(" "),t("v-ons-list-item",{on:{click:function(s){e.serverDlg=!0}}},[e._v("\n          Change Server\n        ")])],2)],1)]),e._v(" "),t("v-ons-modal",{attrs:{visible:e.loading}},[t("p",{staticStyle:{"text-align":"center"}},[e._v("\n      processing\n      "),t("br"),t("br")]),t("div",{staticClass:"spinner"}),e._v(" "),t("br"),e._v(" "),t("p")]),e._v(" "),t("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.confirm},on:{"update:visible":function(s){e.confirm=s}}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("Confirm")]),e._v(" "),t("p",[e._v(e._s(e.sendAddress))]),e._v(" "),t("p",[e._v(e._s(e.sendAmount))]),e._v(" "),t("p",[e._v("Fee: "+e._s(e.transactionEntity.fee/1e6))]),e._v(" "),t("template",{slot:"footer"},[t("div",{staticClass:"alert-dialog-button",on:{click:e.broadcast}},[e._v("Send")]),e._v(" "),t("div",{staticClass:"alert-dialog-button",on:{click:function(s){e.confirm=!1}}},[e._v("Back")])])],2),e._v(" "),t("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.serverDlg},on:{"update:visible":function(s){e.serverDlg=s}}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("Change Server")]),e._v(" "),t("p",[t("v-ons-input",{attrs:{placeholder:"shibuya.supernode.me:7891"},on:{change:e.setServer},model:{value:e.server,callback:function(s){e.server=s},expression:"server"}})],1),e._v(" "),t("template",{slot:"footer"},[t("div",{staticClass:"alert-dialog-button",on:{click:function(s){e.serverDlg=!1}}},[e._v("Close")])])],2),e._v(" "),t("v-ons-dialog",{attrs:{visible:e.sendMenu,cancelable:""},on:{"update:visible":function(s){e.sendMenu=s}}},[t("v-ons-list",[t("v-ons-list-item",{attrs:{modifier:"small"}},[t("v-ons-button",{attrs:{modifier:"quiet large"},on:{click:function(s){e.invoiceMenu=!0,e.sendMenu=!1}}},[e._v("\n          Make an invoice of this Mosaic\n        ")])],1),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"send address"},model:{value:e.sendAddress,callback:function(s){e.sendAddress=s},expression:"sendAddress"}})],1),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("amount to send")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{type:"number"},on:{input:function(s){e.fiatConv=s.target.value*e.price}},model:{value:e.sendAmount,callback:function(s){e.sendAmount=s},expression:"sendAmount"}})],1)]),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("Mosaic")]),e._v(" "),t("div",{staticClass:"right"},[e._v(e._s(e._f("friendlyName")(e.sendMosaic)))])]),e._v(" "),t("v-ons-list-item",{directives:[{name:"show",rawName:"v-show",value:"nem:xem"===e.sendMosaic,expression:"sendMosaic==='nem:xem'"}]},[t("div",{staticClass:"center"},[e._v("Legal currency conversion")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{type:"number"},on:{input:function(s){e.sendAmount=s.target.value/e.price}},model:{value:e.fiatConv,callback:function(s){e.fiatConv=s},expression:"fiatConv"}})],1)]),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"Message"},model:{value:e.message,callback:function(s){e.message=s},expression:"message"}})],1),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"Password",type:"password"},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}})],1),e._v(" "),t("v-ons-list-item",[t("v-ons-button",{attrs:{modifier:"large",disabled:!(e.sendAddress&&e.sendAmount&&e.sendMosaic&&e.isValidAddress)},on:{click:e.send}},[e._v(e._s("ecobit:eco"===e.sendMosaic?"Mother Earth":"Send"))])],1)],1)],1),e._v(" "),t("v-ons-dialog",{attrs:{visible:e.invoiceMenu,cancelable:""},on:{"update:visible":function(s){e.invoiceMenu=s}}},[t("v-ons-list",[t("div",{attrs:{id:"modalQr"}},[t("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}}),e._v(" "),t("div",{staticClass:"url"},[e._v(e._s(e.url))])]),e._v(" "),e.shareable?t("v-ons-list-item",{attrs:{modifier:"small"}},[t("v-ons-button",{attrs:{modifier:"large"},on:{click:e.share}},[t("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),e._v("Share\n        ")],1)],1):e._e(),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("QR code type")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-select",{model:{value:e.addressFormat,callback:function(s){e.addressFormat=s},expression:"addressFormat"}},[t("option",{attrs:{value:"url"}},[e._v("URLformat")]),e._v(" "),t("option",{attrs:{value:"monya"}},[e._v("Monya compatible")]),e._v(" "),t("option",{attrs:{value:"nemWallet"}},[e._v("NEM Wallet compatible")])])],1)]),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("invoice amount")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{placeholder:"invoice amount",type:"number"},model:{value:e.invAmt,callback:function(s){e.invAmt=s},expression:"invAmt"}})],1)]),e._v(" "),t("v-ons-list-item",{directives:[{name:"show",rawName:"v-show",value:"nemWallet"!==e.addressFormat,expression:"addressFormat!=='nemWallet'"}]},[t("div",{staticClass:"center"},[e._v("Mosaic Name")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{placeholder:"Mosaic Name"},model:{value:e.invMosaic,callback:function(s){e.invMosaic=s},expression:"invMosaic"}})],1)])],1)],1)],1)},i=[];e.exports=function(e){var s="function"==typeof e?e.options:e;return s.render=n,s.staticRenderFns=i,e}},1515:function(e,s,t){var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-ons-page",{attrs:{"data-page":"nem"}},[t("custom-bar",{attrs:{title:"NEM",menu:"true"}},[t("v-ons-toolbar-button",{on:{click:e.getBalance,contextmenu:function(s){e.serverDlg=!0}}},[t("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),e._v(" "),t("div",[t("div",[t("div",{attrs:{id:"simple"}},[t("div",{attrs:{id:"qrArea"}},[t("div",{attrs:{id:"qrcode"}},[t("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),e._v(" "),t("div",{staticClass:"address"},[e._v(e._s(e.address||"読み込み中"))])]),e._v(" "),t("v-ons-button",{attrs:{modifier:"quiet"},on:{click:e.copyAddress}},[t("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),e._v("\n          アドレスコピー\n        ")],1),e._v(" "),t("v-ons-button",{attrs:{modifier:"quiet"},on:{click:function(s){e.invoiceMenu=!0}}},[e._v("\n          請求する\n        ")])],1),e._v(" "),t("v-ons-list",[t("v-ons-list-header",{directives:[{name:"show",rawName:"v-show",value:e.unconfirmed&&e.unconfirmed.length,expression:"unconfirmed&&unconfirmed.length"}]},[e._v("未承認の取引があります")]),e._v(" "),e._l(e.unconfirmed,function(s){return t("v-ons-list-item",[s.recipient!==e.address?t("div",{staticClass:"left"},[e._v("送金")]):e._e(),e._v(" "),s.recipient===e.address?t("div",{staticClass:"left"},[e._v("受け取り")]):e._e(),e._v(" "),s.message?t("div",{staticClass:"center"},[e._v(e._s(s.message))]):e._e(),e._v(" "),s.message?e._e():t("div",{staticClass:"center"},[e._v("メッセージなし")])])}),e._v(" "),t("v-ons-list-header",[e._v("残高")]),e._v(" "),e._l(e.mosaics,function(s){return t("v-ons-list-item",{on:{click:function(t){e.sendMosaic=s.mosaicId.namespaceId+":"+s.mosaicId.name,e.sendMenu=!0}}},[t("div",{staticClass:"left"},[s.icon?t("img",{attrs:{src:s.icon}}):e._e()]),e._v(" "),t("div",{staticClass:"center"},[e._v(e._s(s.normalizedQty))]),e._v(" "),t("div",{staticClass:"right"},[e._v(e._s(e._f("friendlyName")(s.mosaicId.namespaceId+":"+s.mosaicId.name)))])])}),e._v(" "),t("v-ons-list-header",[e._v("履歴")]),e._v(" "),e._l(e.history,function(s){return t("v-ons-list-item",{attrs:{modifier:"chevron"},on:{click:function(t){e.openExplorer(s.txHash)}}},[s.recipient!==e.address?t("div",{staticClass:"left"},[e._v("送金")]):e._e(),e._v(" "),s.recipient===e.address?t("div",{staticClass:"left"},[e._v("受け取り")]):e._e(),e._v(" "),s.message?t("div",{staticClass:"center"},[e._v(e._s(s.message))]):e._e(),e._v(" "),s.message?e._e():t("div",{staticClass:"center"},[e._v("(メッセージなし)")]),e._v(" "),t("div",{staticClass:"right"},[t("timestamp",{attrs:{timestamp:s.timeStamp}})],1)])}),e._v(" "),t("v-ons-list-item",{on:{click:function(s){e.serverDlg=!0}}},[e._v("\n          サーバー変更\n        ")])],2)],1)]),e._v(" "),t("v-ons-modal",{attrs:{visible:e.loading}},[t("p",{staticStyle:{"text-align":"center"}},[e._v("\n      処理中\n      "),t("br"),t("br")]),t("div",{staticClass:"spinner"}),e._v(" "),t("br"),e._v(" "),t("p")]),e._v(" "),t("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.confirm},on:{"update:visible":function(s){e.confirm=s}}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("送金確認")]),e._v(" "),t("p",[e._v(e._s(e.sendAddress))]),e._v(" "),t("p",[e._v(e._s(e.sendAmount))]),e._v(" "),t("p",[e._v("Fee: "+e._s(e.transactionEntity.fee/1e6))]),e._v(" "),t("template",{slot:"footer"},[t("div",{staticClass:"alert-dialog-button",on:{click:e.broadcast}},[e._v("送金")]),e._v(" "),t("div",{staticClass:"alert-dialog-button",on:{click:function(s){e.confirm=!1}}},[e._v("戻る")])])],2),e._v(" "),t("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:e.serverDlg},on:{"update:visible":function(s){e.serverDlg=s}}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("サーバー変更")]),e._v(" "),t("p",[t("v-ons-input",{attrs:{placeholder:"shibuya.supernode.me:7891"},on:{change:e.setServer},model:{value:e.server,callback:function(s){e.server=s},expression:"server"}})],1),e._v(" "),t("template",{slot:"footer"},[t("div",{staticClass:"alert-dialog-button",on:{click:function(s){e.serverDlg=!1}}},[e._v("閉じる")])])],2),e._v(" "),t("v-ons-dialog",{attrs:{visible:e.sendMenu,cancelable:""},on:{"update:visible":function(s){e.sendMenu=s}}},[t("v-ons-list",[t("v-ons-list-item",{attrs:{modifier:"small"}},[t("v-ons-button",{attrs:{modifier:"quiet large"},on:{click:function(s){e.invoiceMenu=!0,e.sendMenu=!1}}},[e._v("\n          このモザイクを請求する\n        ")])],1),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"送金先アドレス"},model:{value:e.sendAddress,callback:function(s){e.sendAddress=s},expression:"sendAddress"}})],1),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("相手に送金する金額")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{type:"number"},on:{input:function(s){e.fiatConv=s.target.value*e.price}},model:{value:e.sendAmount,callback:function(s){e.sendAmount=s},expression:"sendAmount"}})],1)]),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("モザイク")]),e._v(" "),t("div",{staticClass:"right"},[e._v(e._s(e._f("friendlyName")(e.sendMosaic)))])]),e._v(" "),t("v-ons-list-item",{directives:[{name:"show",rawName:"v-show",value:"nem:xem"===e.sendMosaic,expression:"sendMosaic==='nem:xem'"}]},[t("div",{staticClass:"center"},[e._v("法定通貨換算")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{type:"number"},on:{input:function(s){e.sendAmount=s.target.value/e.price}},model:{value:e.fiatConv,callback:function(s){e.fiatConv=s},expression:"fiatConv"}})],1)]),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"メッセージ"},model:{value:e.message,callback:function(s){e.message=s},expression:"message"}})],1),e._v(" "),t("v-ons-list-item",[t("v-ons-input",{attrs:{placeholder:"パスワード",type:"password"},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}})],1),e._v(" "),t("v-ons-list-item",[t("v-ons-button",{attrs:{modifier:"large",disabled:!(e.sendAddress&&e.sendAmount&&e.sendMosaic&&e.isValidAddress)},on:{click:e.send}},[e._v(e._s("ecobit:eco"===e.sendMosaic?"マザーアース":"送信"))])],1)],1)],1),e._v(" "),t("v-ons-dialog",{attrs:{visible:e.invoiceMenu,cancelable:""},on:{"update:visible":function(s){e.invoiceMenu=s}}},[t("v-ons-list",[t("div",{attrs:{id:"modalQr"}},[t("img",{attrs:{src:e.qrDataUrl,alt:"No Address",id:"qrcodeImage"}}),e._v(" "),t("div",{staticClass:"url"},[e._v(e._s(e.url))])]),e._v(" "),e.shareable?t("v-ons-list-item",{attrs:{modifier:"small"}},[t("v-ons-button",{attrs:{modifier:"large"},on:{click:e.share}},[t("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),e._v("共有\n        ")],1)],1):e._e(),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("QRコードの形式")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-select",{model:{value:e.addressFormat,callback:function(s){e.addressFormat=s},expression:"addressFormat"}},[t("option",{attrs:{value:"url"}},[e._v("URL形式")]),e._v(" "),t("option",{attrs:{value:"monya"}},[e._v("もにゃ互換")]),e._v(" "),t("option",{attrs:{value:"nemWallet"}},[e._v("NEM Wallet互換")])])],1)]),e._v(" "),t("v-ons-list-item",[t("div",{staticClass:"center"},[e._v("請求額")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{placeholder:"請求額",type:"number"},model:{value:e.invAmt,callback:function(s){e.invAmt=s},expression:"invAmt"}})],1)]),e._v(" "),t("v-ons-list-item",{directives:[{name:"show",rawName:"v-show",value:"nemWallet"!==e.addressFormat,expression:"addressFormat!=='nemWallet'"}]},[t("div",{staticClass:"center"},[e._v("モザイク名")]),e._v(" "),t("div",{staticClass:"right"},[t("v-ons-input",{attrs:{placeholder:"モザイク名"},model:{value:e.invMosaic,callback:function(s){e.invMosaic=s},expression:"invMosaic"}})],1)])],1)],1)],1)},i=[];e.exports=function(e){var s="function"==typeof e?e.options:e;return s.render=n,s.staticRenderFns=i,e}},1516:function(e,s,t){e.exports=t.p+"dist/assets/823762f27924f9c22db2d6bac770a058.png"},1517:function(e,s,t){e.exports=t.p+"dist/assets/88c22b57202cdb51127861007094601b.png"},1518:function(e,s,t){e.exports=t.p+"dist/assets/45876d8474cc84ab60bba875ed7bf1be.png"},1519:function(e,s,t){e.exports=t.p+"dist/assets/264034f8aae49b3adb06619bedfc7491.png"},1520:function(e,s,t){e.exports=t.p+"dist/assets/a3d2b767d4d56cdd42e2acb97da22db1.png"},1521:function(e,s,t){e.exports=t.p+"dist/assets/4b359620c98ac14a3d613cfac92ab793.png"},1522:function(e,s,t){e.exports=t.p+"dist/assets/30cab74c0b2318f34d9c3efd475c74b6.png"},1523:function(e,s,t){e.exports=t.p+"dist/assets/0cd18e73dfe89e4061fb3acefb3d2aab.png"},1524:function(e,s,t){e.exports=t.p+"dist/assets/72d9f489fef365c5bb6c6454a24ba96a.png"}}]);