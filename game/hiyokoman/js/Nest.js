//巣
var Nest = enchant.Class.create(enchant.Sprite, {

	initialize: function(x, y, hiyoko, type, rate, map){
		
		//コンストラクタ
		enchant.Sprite.call(this, 16, 16);				
		
		//画像の設定
		this.image = game.assets["images/map/map0.png"];
		
		//フレーム番号
		this.frame = 22;
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;
		
		//ひよこ
		this.hiyoko = hiyoko;
		
		//モンスタータイプ
		this.type = type;
		
		//発生率
		this.rate = rate;
		
		//マップ
		this.map = map;		
	},
	//モンスターの生成
	born: function(){
		var monster = null;
		
		if(Math.random() < this.rate){
			monster = new Monster(this.x, this.y, this.hiyoko, this.type, this.map);
			monster.x = this.x - ((monster.width * monster.scaleX) / 2);
			monster.y = this.y - ((monster.height * monster.scaleY) / 2);			
		}		
		
		return monster;
	}
	
})

