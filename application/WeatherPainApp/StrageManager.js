// ローカルストレージ（IDのリスト）
let id_list = []

// ローカルストレージ（AppItemのリスト）
let item_list = {}

function loadStorage(){
    
    // IDのリストのロード
    id_list = JSON.parse(localStorage.getItem("id_list"))
    if(id_list == null){
	id_list = []; // IDリストを初期化
    }

    // AppItemのロード
    for(id of id_list){
	let item = JSON.parse(localStorage.getItem(id))
	item_list[item.id] = item;
    }
}

function saveStorage(item){
    id_list.push(item.id);
    item_list[item.id] = item;

    // IDのリストをローカルストレージに保存
    localStorage.setItem("id_list", JSON.stringify(id_list));
    
    // AppItemをローカルストレージに保存
    localStorage.setItem(item.id, JSON.stringify(item));    
}

function clearStorage(){
    localStorage.clear();
    id_list = [];
    item_list = {};    
}

function setItemList(){
    for(let id of id_list.reverse()){
	let item = item_list[id]
	$("#item_list").append("<ons-list-item value='" + id + "' modifier='tappable chevron'>" + item.today_date + " " + item.today_time + " " + item.pressure + "hPa <img style='height:20px;margin-left:20px' src='./images/pain-" + item.pain_level + ".png'></ons-list-item>");
    }
}
