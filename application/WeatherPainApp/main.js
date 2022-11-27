// ナビゲータ
let ons_navi = document.getElementById("navigator");

// アプリデータ
let app_item = new AppItem();

// サービスワーカーの登録
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(registration => {
	console.log('ServiceWorker registration successful.');
    }).catch(err => {
	console.log('ServiceWorker registration failed.');
    });
}    
