//武器
var Weapon = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(x, y, hiyoko, type, angle, map){
		
		//画像の設定
		if(type == DAGGER){
			enchant.Sprite.call(this, 46, 46);
			this.image = game.assets["images/weapon/dagger.png"];
			this.angle = angle;
			this.damage = 5;
			this.radius = 12;
			this.speed = 5;
			this.rotate((-this.angle * 180) / Math.PI);
			this.x = x - (this.width / 2) + (Math.sin(this.angle) * 12);
			this.y = y - (this.height / 2) + (Math.cos(this.angle) * 12);
			game.assets["sound/attack_dagger.wav"].play();			
		}
		else if(type == SWORD){
			enchant.Sprite.call(this, 96, 96);			
			this.image = game.assets["images/weapon/cut.png"];			
			this.angle = angle;
			this.damage = 10;
			this.radius = 24;			
			this.speed = 0;
			this.x = x - (this.width / 2);
			this.y = y - (this.height / 2);		
			this.scale(0.5, 0.5);
			game.assets["sound/attack_sword.mp3"].play();						
		}
		else if(type == ROD){
			enchant.Sprite.call(this, 96, 96);			
			this.image = game.assets["images/weapon/fire.png"];
			this.angle = angle;
			this.damage = 1;
			this.radius = 48;			
			this.speed = 0;
			this.x = x - (this.width / 2) + (Math.sin(this.angle) * 48);
			this.y = y - (this.height / 2) + (Math.cos(this.angle) * 48);
			game.assets["sound/attack_rod.mp3"].play();						
		}				
		
		//ID
		this.id = UUID.generate();
				
		//倍率
		this.scale(1, 1);
		
		//ひよこ
		this.hiyoko = hiyoko;
		
		//タイプ
		this.type = type;
		
		//フレーム番号
		this.frame = 0;		
		
		//マップ
		this.map = map;
						
		//フレーム毎の処理
		this.addEventListener(Event.ENTER_FRAME, function(){
			if(this.isActive()){
				if(this.type == DAGGER){
					this.x += this.speed * Math.sin(this.angle);		
					this.y += this.speed * Math.cos(this.angle);		
					
					if(this.x > SCREEN_WIDTH || this.y > SCREEN_HEIGHT || this.x < (-this.width) || this.y < (-this.height)){
						this.remove();
					}			
					else if(this.map.isBroken((this.x + (this.width / 2)), (this.y + (this.height / 2)))){
						game.assets["sound/clash.mp3"].play();					
						this.remove();
					}		
				}
				else if(this.type == SWORD){
					
					this.x = (hiyoko.x + (hiyoko.width / 2)) - (this.width / 2);
					this.y = (hiyoko.y + (hiyoko.height / 2)) - (this.height / 2);							
					
					if(this.frame == 10){
						this.remove();
					}
					
					this.frame += 1;	
				}
				else if(this.type == ROD){
					
					if(this.frame == 8){
						this.remove();
					}
					
					this.frame += 1;					
				}
			}
			else{
				this.remove();
			}
			
		});
			
	},
	
	//武器の削除
	remove: function(){
		this.damage = 0;
		this.visible = false;
		this.parentNode.removeChild(this);
	},
	//効果の判定
	isActive: function(){
		if(this.damage != 0){
			return true;
		}
		else{
			return false;
		}
	},
	//ダメージ
	attack: function(monster){
		monster.life -= this.damage;
		
		if(this.type == DAGGER){
			this.damage = 0;			
		}
		
	}
			
});

//武器アイコン
var WeaponIcon = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(x, y, type){				
		
		//コンストラクタ
		enchant.Sprite.call(this, 46, 46);
		
		//タイプ
		this.type = type;
		
		//ボタンモード
		this.buttonMode = "a";
		
		//原点
		this.originX = 0;
		this.originY = 0;
		
		//倍率
		this.scale(1, 1);
		
		//表示位置のX座標
		this.x = x;
		
		//表示位置のY座標
		this.y = y;
		
		//サーフェイス
		this.sf_dagger = new Surface(this.width, this.height);						
		this.sf_sword = new Surface(this.width, this.height);						
		this.sf_rod = new Surface(this.width, this.height);
		
		//描画半径
		this.r = Math.floor(this.width / 2);
		
		//ダガー
		this.sf_dagger.context.beginPath();
		this.sf_dagger.context.arc(this.r, this.r, this.r, 0, Math.PI * 2, true);
		this.sf_dagger.context.fillStyle = "rgba(255, 212, 0, 0.5)";									
		this.sf_dagger.context.fill();
		this.sf_dagger.draw(game.assets["images/weapon/dagger.png"]);
		
		//剣
		this.sf_sword.context.beginPath();
		this.sf_sword.context.arc(this.r, this.r, this.r, 0, Math.PI * 2, true);
		this.sf_sword.context.fillStyle = "rgba(0, 0, 255, 0.5)";									
		this.sf_sword.context.fill();
		this.sf_sword.draw(game.assets["images/weapon/sword.png"]);
		
		//ロッド
		this.sf_rod.context.beginPath();
		this.sf_rod.context.arc(this.r, this.r, this.r, 0, Math.PI * 2, true);
		this.sf_rod.context.fillStyle = "rgba(255, 0, 0, 0.5)";									
		this.sf_rod.context.fill();
		this.sf_rod.draw(game.assets["images/weapon/rod.png"]);		
		
		//画像の設定
		this.change(this.type);		
	},
	//アイコンの変更
	change: function(type){	
	
		//タイプの更新
		this.type = type;
	
		//画像の設定
		if(type == DAGGER){
			this.image = this.sf_dagger;
		}
		else if(type == SWORD){
			this.image = this.sf_sword;
		}
		else if(type == ROD){
			this.image = this.sf_rod;
		}	
		
	}
});



