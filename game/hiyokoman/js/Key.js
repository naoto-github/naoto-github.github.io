//鍵
var Key = enchant.Class.create(enchant.Sprite, {

	initialize: function(x, y){
		
		//コンストラクタ
		enchant.Sprite.call(this, 16, 16);
		
		//画像の設定
		this.image = game.assets["images/map/icon0.png"];
		
		//フレーム番号
		this.frame = 33;
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;		
		
		//効果範囲
		this.radius = 12;
	},
	//鍵の削除
	remove: function(){
		this.visible = false;
		this.parentNode.removeChild(this);
	},
	//取得の判定
	isActive: function(){
		if(this.visible){
			return true;
		}
		else{
			false;
		}
	}

})

