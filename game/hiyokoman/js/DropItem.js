//ドロップアイテム
var DropItem = enchant.Class.create(enchant.Sprite, {

	initialize: function(x, y, type){
		
		//コンストラクタ
		enchant.Sprite.call(this, 16, 16);
		
		//ID
		this.id = UUID.generate();
		
		//画像の設定
		this.image = game.assets["images/map/icon0.png"];		
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;		
		
		//効果半径
		this.radius = 12;		
		
		//タイプ
		this.type = type;
		
		//表示
		this.visible = false;
		
		//透明度
		this.opacity = 0;
		
		//スコア
		this.score = 10;
		
		if(this.type == APPLE){
			this.frame = 15;
		}
		else if(this.type == BANANA){
			this.frame = 16;
		}
		else if(this.type == GRAPES){
			this.frame = 17;			
		}
		
		this.addEventListener(Event.ENTER_FRAME, function(e){
			if(this.visible == true)	{			
				this.opacity = Math.min(this.opacity + 0.1, 1);
			}
		});		
		
	},
	//アイテムの表示
	show: function(){
		this.visible = true;
	},
	//アイテムの削除
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

