let ver="1307110",cacheData="0cd18e73dfe89e4061fb3acefb3d2aab.png,1714cb1aa642bcac0e2ccd01eb4f97e0.png,1b02a97512be7e6beaf23790026d01f8.png,264034f8aae49b3adb06619bedfc7491.png,2dc78e422b02262904c9820e11ac6f1a.svg,30cab74c0b2318f34d9c3efd475c74b6.png,30ff0d9bed28ba0f94e88b2b437430b9.png,37987f05162644d5659dd6db880bfdf3.png,3cb34382fa6c2d76f208f76544361647.png,45876d8474cc84ab60bba875ed7bf1be.png,4b359620c98ac14a3d613cfac92ab793.png,542bc4086c322ae75d59f632514bdd30.png,5d1eb75b276b287613fe17287721a087.m4a,5ff2e6bbd42a75fbef236c58f912e49c.eot,63fbf4276b3e9e762db5f9ae985abcab.png,72d9f489fef365c5bb6c6454a24ba96a.png,7419fd71c247dfa418527ad7d032977a.m4a,7da71a78953861a70385725d8f78dc7f.woff,823762f27924f9c22db2d6bac770a058.png,833fd749922b4a590f4d6b878c97d739.png,86cc8f528c3b9535d26a0e28a1a99e2c.png,88c22b57202cdb51127861007094601b.png,903155fb65c056dc290b3db2f07dd2a7.png,9bc76642a7dec2972b4650ad430bf935.png,a1aebebe861b0dff207e53938cd4efe3.png,a3d2b767d4d56cdd42e2acb97da22db1.png,a6e2e4afd041d75d590e3698bcc500db.png,b86cbac685b76b01cbda9c5e14afe821.png,be44741717c0e78e71af054e7c93c95c.png,bf9835a87e8a9f65521f76ccc3efcae1.png,c6f8b92668d7540b8a073d7b2bb4e415.png,c964ea1f3c762cfe8dcd37be943fb03b.png,d10f1a99f7f5af4b62c5d852aad8fff2.png,df8c4faece47c55694ec51ff6546adb3.png,e031f23598f80724fc5993bbc565a6ad.jpg,e3e4e347a07f0b7fee184b2d6ae3e9ea.ttf,ee1e79ab50964608c28580d94a1ba43f.png,f551b65646e194b7e6c8f25a009f2776.png,f716511f0f8852cce4e8fd5f20844f8a.jpg,fe988edbad4e40a2238f7d1131c01f08.png".split(",").map(e=>"assets/"+e),cName="cache-"+ver;cacheData.push("dist.js"),self.addEventListener("install",e=>{e.waitUntil(caches.open(cName).then(e=>e.addAll(cacheData)))}),self.addEventListener("activate",e=>{const a=[cName];e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>{if(-1===a.indexOf(e))return caches.delete(e)}))))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(a=>{if(a)return a;let c=e.request.clone();return fetch(c).then(a=>{if(!a||200!==a.status||"basic"!==a.type)return a;let c=a.clone();return caches.open(cName).then(a=>{a.put(e.request,c)}),a})}))});