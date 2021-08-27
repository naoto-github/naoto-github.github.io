//ひよこ
var Hiyoko = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(x, y, type, map){
		
		//コンストラクタ
		enchant.Sprite.call(this, 32, 32);		
		
		//ひよこタイプ
		this.type = type;
		
		//変身
		this.change(this.type);
				
		//フレーム番号
		this.frame = 7;
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;
		
		//マップ
		this.map = map;
		
		//フレーム数
		this.tick = 0;
		
		//武器
		this.weapon = DAGGER;			
				
		//ライフ
		this.life = 1;
		
		//鍵の取得数
		this.key = 0;
		
		//カウンター
		this.counter = 0;
		
		//フレーム毎の処理
		this.addEventListener(Event.ENTER_FRAME, function(e){
			
			if(this.isAlive()){
				this.move();	
			}
			else{
				this.die(this.counter);
				this.counter += 1;
			}
			
			this.tick += 1;
		});
		
		
	},
	//生存の判定
	isAlive: function(){
		if(this.life > 0){
			return true;
		}	
		else{
			return false;
		}
	},
	//死亡
	die: function(counter){
		
		if(counter == 6){		
			this.parentNode.removeChild(this);			
			var scene = new GameOverScene(this.type);
			game.pushScene(scene);						
		}
		else{
				
			//フレーム番号
			this.frame = counter + 3;
			
		}
		
	},	
	//移動
	move: function(){
		//左
		if(game.input.left){
			this.moveL();				
		}
		
		//右
		else if(game.input.right){
			this.moveR();
		}	
		
		//上
		else if(game.input.up){
			this.moveU();
		}
		
		//下
		else if(game.input.down){
			this.moveD();
		}	
	},
	//左へ移動
	moveL: function(){
		this.x -= this.speed;
			
		if(this.map.isHit(this.x + (this.width / 2), this.y + (this.height / 2))){
			this.x += this.speed;
		}
		
		this.frame = (this.tick % 3) + 12;		
	},
	//右へ移動
	moveR: function(){
		this.x += this.speed;
		
		if(this.map.isHit(this.x + (this.width / 2), this.y + (this.height / 2))){
			this.x -= this.speed;
		}				
		
		this.frame = (this.tick % 3) + 15;
	},
	//上へ移動
	moveU: function(){
		this.y -= this.speed;
		
		if(this.map.isHit(this.x + (this.width / 2), this.y + (this.height / 2))){					
			this.y += this.speed;
		}				
				
		this.frame = (this.tick % 3) + 9;		
	},
	//下へ移動
	moveD: function(){
		this.y += this.speed;
				
		if(this.map.isHit(this.x + (this.width / 2), this.y + (this.height / 2))){					
			this.y -= this.speed;
		}				
				
		this.frame = (this.tick % 3) + 6;	
	},	
	/**
	 * 攻撃
	 * @return 武器
	 */
	attack: function(){
		
		var angle;
		
		//左
		if(this.frame == 12 || this.frame == 13 || this.frame == 14){
			angle = Math.PI * (3/2);
		}		
		//右
		else if(this.frame == 15 || this.frame == 16 || this.frame == 17){
			angle = Math.PI * (1/2);
		}
		//下
		else if(this.frame == 9 || this.frame == 10 || this.frame == 11){
			angle = Math.PI;
		}		
		//下
		else if(this.frame == 6 || this.frame == 7 || this.frame == 8){
			angle = 0;
		}	
		
		//武器
		var weapon = new Weapon(this.x + (this.width / 2), this.y + (this.height / 2), this, this.weapon, angle, this.map);					
		
		return weapon;
	},	
	//変身
	change: function(type){

		if(type == YELLOW){
			this.type = type;
			this.image = game.assets["images/characters/hiyoco_normal_full.png"];				
			this.weapon = DAGGER;
			this.speed = 4;
		}
		else if(type == RED){
			this.type = type;
			this.image = game.assets["images/characters/hiyoco_lady_full.png"];				
			this.weapon = ROD;
			this.speed = 2;
		}	
		else if(type == BLUE){
			this.type = type;
			this.image = game.assets["images/characters/hiyoco_waru_full.png"];				
			this.weapon = SWORD;
			this.speed = 3;
		}			

	}
	
});

