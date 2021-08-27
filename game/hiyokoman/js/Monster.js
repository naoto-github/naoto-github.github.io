//モンスター
var Monster = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(x, y, hiyoko, type, map){
		
		if(type == SLIME){
			//コンストラクタ
			enchant.Sprite.call(this, 48, 48);		
			
			//画像の設定
			this.image = game.assets["images/monster/slime.gif"];
			
			//フレーム番号
			this.frame = 2;	
			
			//速度
			this.speed = 1;	
			
			//攻撃力
			this.attack = 1;
			
			//ライフ
			this.life = 5; 
			
			//効果範囲
			this.radius = 10;
	
			//アイテムを落とす確率
			this.rate = 0.1;

			//原点
			this.originX = this.x + this.width / 2;
			this.originY = this.y + this.height / 2;			
			
			//倍率
			this.scale(3/4, 3/4);
							
			//スコア
			this.score = 10;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y				
		}
		else if(type == BAT){
			//コンストラクタ
			enchant.Sprite.call(this, 48, 48);		
			
			//画像の設定
			this.image = game.assets["images/monster/bat.gif"];
			
			//フレーム番号
			this.frame = 2;	
			
			//速度
			this.speed = 1.2;	
			
			//攻撃力
			this.attack = 1;
			
			//ライフ
			this.life = 5; 
			
			//効果範囲
			this.radius = 10;
	
			//アイテムを落とす確率
			this.rate = 0.1;
	
			//原点
			this.originX = this.x + this.width / 2;
			this.originY = this.y + this.height / 2;			
			
			//倍率
			this.scale(3/4, 3/4);
			
			//スコア
			this.score = 20;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y				
		}
		else if(type == WARM){
			//コンストラクタ
			enchant.Sprite.call(this, 80, 80);		
			
			//画像の設定
			this.image = game.assets["images/monster/warm.gif"];
			
			//フレーム番号
			this.frame = 6;	
			
			//速度
			this.speed = 0;	
			
			//攻撃力
			this.attack = 1;
			
			//攻撃判定
			this.attack_flg = false;			
			
			//ライフ
			this.life = 100; 
			
			//効果範囲
			this.radius = 16;
	
			//アイテムを落とす確率
			this.rate = 0.1;
	
			//原点
			this.originX = this.x + this.width / 2;
			this.originY = this.y + this.height / 2;
			
			//倍率
			this.scale(0.4, 0.4);
			
			//スコア
			this.score = 50;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y				
		}
		else if(type == ROCK){
			//コンストラクタ
			enchant.Sprite.call(this, 16, 16);		
			
			//画像の設定
			this.image = game.assets["images/map/map0.png"];
			
			//フレーム番号
			this.frame = 27;	
			
			//速度
			this.speed = 4;	
			
			//攻撃力
			this.attack = 1;
						
			//ライフ
			this.life = 9999; 
			
			//効果範囲
			this.radius = 8;
	
			//アイテムを落とす確率
			this.rate = 0;
	
			//原点
			this.originX = 0;
			this.originY = 0;
			
			//倍率
			this.scale(1, 1);		
			
			//角度
			this.angle = Math.atan2(((hiyoko.x + hiyoko.width / 2) - (x + this.width / 2)), (hiyoko.y + (hiyoko.height / 2) - (y + this.height / 2)));
			
			//スコア
			this.score = 0;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y				
		}
		else if(type == THUNDER){
			//コンストラクタ
			enchant.Sprite.call(this, 64, 240);		
			
			//画像の設定
			this.image = game.assets["images/weapon/thunder.png"];
			
			//フレーム番号
			this.frame = 0;	
			
			//速度
			this.speed = 0;	
			
			//攻撃力
			this.attack = 1;
						
			//ライフ
			this.life = 9999; 
			
			//効果範囲
			this.radius = 32;
	
			//アイテムを落とす確率
			this.rate = 0;
	
			//原点
			this.originX = 0;
			this.originY = 0;
			
			//倍率
			this.scale(1, 1);		
						
			//角度
			this.angle = Math.atan2(((hiyoko.x + hiyoko.width / 2) - x), (hiyoko.y + (hiyoko.height / 2) - y));
			
			//スコア
			this.score = 0;

			//攻撃半径
			this.r = 64;		

			//X座標
			this.x = (x - this.width / 2) + (this.r * Math.sin(this.angle));
			
			//Y座標
			this.y = y + (this.r * Math.cos(this.angle));			
			this.y = this.y - this.height;

		}		
		else if(type == DRAGON){
			//コンストラクタ
			enchant.Sprite.call(this, 80, 80);		
			
			//画像の設定
			this.image = game.assets["images/monster/dragon.gif"];
			
			//フレーム番号
			this.frame = 6;	
			
			//速度
			this.speed = 0;	
			
			//攻撃力
			this.attack = 1;
			
			//攻撃判定
			this.attack_flg = false;		
			
			//攻撃頻度
			this.attack_frq = 200;
			
			//攻撃乱数
			this.attack_rnd = Math.floor(Math.random() * this.attack_frq);
			
			//ライフ
			this.life = 200; 
			
			//効果範囲
			this.radius = 16;
	
			//アイテムを落とす確率
			this.rate = 0.1;
	
			//原点
			this.originX = this.x + this.width / 2;
			this.originY = this.y + this.height / 2;
			
			//倍率
			this.scale(3/4, 3/4);
			
			//スコア
			this.score = 100;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y			
		}
		else if(type == ORIGINAL){
			//コンストラクタ
			enchant.Sprite.call(this, 32, 32);		
			
			//画像の設定
			this.image = game.assets["original/character.png"];
			
			//フレーム番号
			this.frame = 0;	
			
			//速度
			this.speed = 1;	
			
			//攻撃力
			this.attack = 1;
			
			//ライフ
			this.life = 5; 
			
			//効果範囲
			this.radius = 10;
	
			//アイテムを落とす確率
			this.rate = 0.1;

			//原点
			this.originX = this.x + this.width / 2;
			this.originY = this.y + this.height / 2;			
			
			//倍率
			this.scale(1, 1);
							
			//スコア
			this.score = 10;
			
			//X座標
			this.x = x;
		
			//Y座標
			this.y = y				
		}		
		
				
		//ID
		this.id = UUID.generate();
		
		//タイプ
		this.type = type;		
		
		//ひよこ
		this.hiyoko = hiyoko;
		
		//マップ
		this.map = map;
		
		//フレーム
		this.tick = 0;	
		
		//カウンター
		this.counter = 0;			
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
	action: function(){
		if(this.type == SLIME){
			this.frame = (this.tick % 4) +  2;			
			
			if(this.isAlive()){
				this.move();
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}
		else if(this.type == BAT){
			this.frame = (this.tick % 4) +  2;			
			
			if(this.isAlive()){
				this.move();
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}
		else if(this.type == WARM){
						
			if(this.isAlive()){
				if(this.attack_flg == false){
					if(Math.random() < 0.01){
						this.attack_flg = true;
					}
				}
				else{
					if(this.frame == 10){
						this.frame = 6;
						this.attack_flg = false;
						var monster = new Monster(this.x + this.width / 2, this.y + this.height / 2, this.hiyoko, ROCK, this.map);
						return monster;
					}
					else{
						this.frame += 1;						
					}										
				}
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}	
		else if(this.type == ROCK){

			if(this.isAlive()){

				this.x += this.speed * Math.sin(this.angle);		
				this.y += this.speed * Math.cos(this.angle);		
				
				if(this.x > SCREEN_WIDTH || this.y > SCREEN_HEIGHT || this.x < (-this.width) || this.y < (-this.height)){
					this.visible = false;
					this.parentNode.removeChild(this);
				}					
				
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}	
		else if(this.type == DRAGON){
						
			if(this.isAlive()){
				if(this.attack_flg == false){					
					if((this.tick % this.attack_frq) == this.attack_rnd){				
						this.attack_flg = true;
					}
				}
				else{
					if(this.frame == 10){
						this.frame = 6;
						this.attack_flg = false;
						var monster = new Monster(this.x + this.width / 2, this.y + this.height / 2, this.hiyoko, THUNDER, this.map);
						game.assets["sound/thunder.mp3"].play();
						return monster;
					}
					else{
						this.frame += 1;						
					}										
				}
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}
		else if(this.type == THUNDER){

			if(this.isAlive()){
				if(this.frame == 7){
					this.visible = false;
					this.parentNode.removeChild(this);
				}
				else{
					this.frame += 1;
				}
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}
		else if(this.type == ORIGINAL){
			
			if(this.isAlive()){
				this.move();
			}
			else{					
				this.die(this.counter);
				this.counter += 1;
			}							
		}		
		
		this.tick += 1;
		
		return null;
	},
	//死亡
	die: function(counter){
		
		if(counter == 5){
			game.score += this.score;
			this.visible = false;
			this.parentNode.removeChild(this);
		}
		else{
			//サイズの変更
			this.width = 16;
			this.height = 16;
			
			//画像の設定
			this.image = game.assets["images/monster/effect0.png"];
				
			//フレーム番号
			this.frame = counter;
			
			//倍率
			this.scale(1.2, 1.2);
		}
		
	},
	//当たり判定
	isHit: function(hiyoko){
		switch(this.type){
			case THUNDER:
				return hiyoko.intersect(this);
			default:
				return hiyoko.within(this, this.radius);
		}
	},
	//移動
	move: function(){
				
		var dx = ((this.hiyoko.x + this.hiyoko.width / 2) - (this.x + this.width / 2));
		var dy = ((this.hiyoko.y + this.hiyoko.height / 2) - (this.y + this.height / 2));				
		
		if(dx >= 0 && dy >= 0){
			if(this.moveR()){
				this.moveD();
			}
		}
		else if(dx >= 0 && dy <= 0){
			if(this.moveR()){
				this.moveU();
			}					
		}
		else if(dx <= 0 && dy >= 0){
			if(this.moveL()){
				this.moveD();
			}					
		}	
		else if(dx <= 0 && dy <= 0){
			if(this.moveL()){
				this.moveU();
			}					
		}				
	},
	//移動の判定
	moveTest: function(x, y){
		if(this.type == SLIME){
			return this.map.isHit(x, y);
		}
		else if(this.type == BAT || this.type == WARM || this.type == ROCK){
			return false;
		}
	},	
	//左へ移動
	moveL: function(){
		this.x -= this.speed;
			
		if(this.moveTest(this.x + (this.width / 2), this.y + (this.height / 2))){		
			this.x += this.speed;
			return false;
		}
		
		
		return true;
	},
	//右へ移動
	moveR: function(){
		this.x += this.speed;
		
		if(this.moveTest(this.x + (this.width / 2), this.y + (this.height / 2))){				
			this.x -= this.speed;
			return false;
		}				
				
		return true;
	},
	//上へ移動
	moveU: function(){
		this.y -= this.speed;
		
		if(this.moveTest(this.x + (this.width / 2), this.y + (this.height / 2))){				
			this.y += this.speed;
			return false;
		}				
		
		return true;
	},
	//左へ移動
	moveD: function(){
		this.y += this.speed;
		
		if(this.moveTest(this.x + (this.width / 2), this.y + (this.height / 2))){				
			this.y -= this.speed;
			return false;
		}		
		
		return true;
	},
	//アイテムのドロップ
	drop: function(){
		var item = null;
		
		if(this.rate > Math.random()){
			var type = Math.floor(Math.random() * 3);

			item = new DropItem(this.x + ((this.width*this.scaleX) / 2), this.y + ((this.height*this.scaleY) / 2), type);
			item.x = item.x - (item.width / 2);
			item.y = item.y - (item.height / 2);							
		}
		
		return item;
	}
	
})

