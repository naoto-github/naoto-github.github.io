//城
var Castle = enchant.Class.create(enchant.Sprite, {

	initialize: function(x, y){
		
		//コンストラクタ
		enchant.Sprite.call(this, 16, 16);
		
		//画像の設定
		this.image = game.assets["images/map/map0.png"];
		
		//フレーム番号
		this.frame = 20;
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;		
		
		//効果半径
		this.radius = 12;
		
		//表示
		this.visible = false;
		
		//透明度
		this.opacity = 0;
		
		this.addEventListener(Event.ENTER_FRAME, function(e){
			if(this.visible == true)	{			
				this.opacity = Math.min(this.opacity + 0.1, 1);
			}
		});
		
	},
	//城の表示
	show: function(){
		this.visible = true;
	}

})

