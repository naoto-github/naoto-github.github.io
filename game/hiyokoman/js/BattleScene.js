var BattleScene = enchant.Class.create(enchant.Scene, {

	initialize: function(stage){

		//コンストラクタ
		enchant.Scene.call(this);
		
		//キーのリセット
		game.resetKey();
		
		//シーン番号
		game.stage = stage;
	
		//スコアの作成
		score_label = ScoreLabel();
		score_label.x = 0;
		score_label.y = 0;		
		score_label.score = game.score;
	
		//タイムの作成
		time_label = TimeLabel();
		time_label.x = 320;
		time_label.y = 0;
		time_label._count = -1;
		time_label.time = 100;
	
		//BGMの取得
		var bgm = this.getBGM();
	
		//マップの作成
		var map = new HiyokoMap();

		//ひよこの作成
		var hiyoko = this.getHiyoko(map);

		//巣の作成
		var nests = this.getNests(hiyoko, map);
	
		//城の作成
		var castle = this.getCastle();
	
		//鍵の作成
		var keys = this.getKeys();
	
		//アイテム
		var items = new Array();
	
		//モンスター
		var monsters = this.getMonsters(hiyoko, map);
	
		//武器
		var weapons = new Array();
	
		//武器アイコンの作成
		var weapon_icon = new WeaponIcon(410, 250, hiyoko.weapon);
			
		//バーチャルパッドの作成
		var pad = getMyPad(10, 220);
		
		//背景の追加
		var bg = this.getBackGround();
		if(bg != null){
			this.addChild(bg);
		}
		
		//マップの追加
		this.addChild(map);
	
		//巣の追加
		for(var i=0; i<nests.length; i++){
			this.addChild(nests[i]);
		}
		
		//モンスターの追加
		for(i in monsters){
			var monster = monsters[i];
			this.addChild(monster);
		}
	
		//城の追加
		this.addChild(castle);
	
		//鍵の追加
		for(var i=0; i<keys.length; i++){
			this.addChild(keys[i]);
		}
	
		//ひよこの追加
		this.addChild(hiyoko);	
	
		//武器アイコンの追加
		this.addChild(weapon_icon);
	
		//バーチャルパッドの追加
		this.addChild(pad);								
	
		//スコアの追加
		this.addChild(score_label);	
	
		//タイムの追加
		this.addChild(time_label);
	
		//フレーム処理
		this.addEventListener(Event.ENTER_FRAME, function(){
		
			//BGMの設定(DOMSound対応)
			if(!game.assets[bgm].src){
				game.assets[bgm].play();
			}
			
			//スコアの更新
			score_label.score = game.score;
		
			//タイムオーバー
			if(time_label.time < 0){
				var gameover_scene = new GameOverScene(hiyoko.type);
				game.popScene();
				game.pushScene(gameover_scene);
			}
		
			//Aボタン
			if(game.input.a){
				var weapon = hiyoko.attack();
				this.addChild(weapon);
				weapons[weapon.id] = weapon;
			}
		
			//モンスターの生成
			for(var i=0; i<nests.length; i++){
				var nest = nests[i];
				var monster = nest.born();
				if(monster != null){
					this.addChild(monster);
					monsters[monster.id] = monster;
				}
			}
		
			//モンスターの行動
			for(i in monsters){
				var monster = monsters[i];
				var action = monster.action();
				if(action != null){
					this.addChild(action);
					monsters[action.id] = action;
				}
			}		
		
			//ひよことモンスターの当たり判定
			for(i in monsters){
				var monster = monsters[i];
			
				if(monster.isAlive()){
					//if(hiyoko.within(monster, monster.radius)){
					if(monster.isHit(hiyoko)){
						hiyoko.life -= monster.attack;	
						game.assets["sound/bomb.mp3"].play();							
					}
				}
			}
		
			//ひよこと城の当たり判定
			if(castle.visible){
				if(hiyoko.within(castle, castle.radius)){				
					var clear_scene = new ClearScene(hiyoko.type, time_label.time);
					game.popScene();
					game.pushScene(clear_scene);				
				}
			}
		
			//ひよこと鍵の当たり判定
			for(var i=0; i<keys.length; i++){
				var key = keys[i];
			
				if(key.isActive()){
					if(hiyoko.within(key, key.radius)){
						key.remove();
						hiyoko.key += 1;
						
						//全部の鍵を取得
						if(keys.length == hiyoko.key){
							game.assets["sound/castle.wav"].play();
							castle.show();
						}
						else{
							game.assets["sound/get.wav"].play();
						}
					}
				}
			}
		
			//ひよことアイテムの当たり判定
			for(i in items){
				var item = items[i];
			
				if(item.isActive()){
					if(hiyoko.within(item, item.radius)){
						item.remove();
						game.assets["sound/get.wav"].play();
						game.score += item.score;						
					
						if(item.type == APPLE && hiyoko.type != RED){
							var transform_scene = new TransformScene(hiyoko.type, RED);
							game.pushScene(transform_scene);
							hiyoko.change(RED);
							weapon_icon.change(ROD);
						}
						else if(item.type == BANANA && hiyoko.type != YELLOW){
							var transform_scene = new TransformScene(hiyoko.type, YELLOW);
							game.pushScene(transform_scene);						
							hiyoko.change(YELLOW);
							weapon_icon.change(DAGGER);						
						}
						else if(item.type == GRAPES && hiyoko.type != BLUE){
							var transform_scene = new TransformScene(hiyoko.type, BLUE);
							game.pushScene(transform_scene);
							hiyoko.change(BLUE);
							weapon_icon.change(SWORD);						
						}
					}
				}
			}
		
			//モンスターと武器の当たり判定
			for(i in monsters){
				for(j in weapons){
				
					var monster = monsters[i];
					var weapon = weapons[j];
				
					if(monster.isAlive() && weapon.isActive()){
						if(monster.within(weapon, weapon.radius)){
							weapon.attack(monster);
							game.assets["sound/bomb.mp3"].play();		
						
							//アイテムのドロップ
							if(!monster.isAlive()){
								var item = monster.drop();
								if(item != null){
									items[item.id] = item;
									item.show();
									this.addChild(item);
								}
							}
						}
					}
				}
			}
		
			//武器の削除
			for(i in weapons){
				var weapon = weapons[i];
				if(weapon.visible == false){
					delete weapons[weapon.id];
					delete weapon;
				}
			}
		
			//モンスターの削除
			for(i in monsters){
				var monster = monsters[i];
				if(monster.visible == false){
					delete monsters[monster.id];
					delete monster;
				}
			}		
		
			//アイテムの削除
			for(i in items){
				var item = items[i];
				if(item.visible == false){
					delete items[item.id];
					delete item;
				}
			}
		
		})	
	
		//BGMの設定(WebAudioSound対応)
		if(game.assets[bgm].src){
			game.assets[bgm].play();
			game.assets[bgm].src.loop = true;		
		}	
		
	},
	//ひよこの作成
	getHiyoko: function(map){
		var hiyoko = new Hiyoko((SCREEN_WIDTH / 2), (SCREEN_HEIGHT / 2), YELLOW, map);		
		return hiyoko;
	},
	getBackGround: function(){
		var bg = null;
		switch(game.stage){
			case 4:
				bg = new Sprite(800, 600);
				bg.image = game.assets["images/background/back_space.jpg"];
				bg.x = 0;
				bg.y = 0;
				bg.originX = 0;
				bg.originY = 0;
				bg.scale((SCREEN_WIDTH / bg.width), (SCREEN_HEIGHT / bg.height));				
				break;
		}
		return bg;
	},
	//巣の作成
	getNests: function(hiyoko, map){
		var nests = new Array();		
		switch(game.stage){
			case 1:			
				nests.push(new Nest(60, 80, hiyoko, SLIME, 0.01, map));
				nests.push(new Nest(300, 160, hiyoko, SLIME, 0.01, map));
				
				if(game.original){
					nests.push(new Nest(80, 260, hiyoko, ORIGINAL, 0.01, map));							
				}
				else{
					nests.push(new Nest(80, 260, hiyoko, SLIME, 0.01, map));		
				}
				break;
			case 2:
				nests.push(new Nest(80, 110, hiyoko, BAT, 0.01, map));
				nests.push(new Nest(280, 60, hiyoko, SLIME, 0.01, map));
				nests.push(new Nest(70, 180, hiyoko, SLIME, 0.01, map));	
				nests.push(new Nest(400, 30, hiyoko, BAT, 0.01, map));
				break;
			case 3:
				nests.push(new Nest(30, 50, hiyoko, BAT, 0.01, map));
				nests.push(new Nest(350, 270, hiyoko, SLIME, 0.01, map));
				nests.push(new Nest(250, 50, hiyoko, BAT, 0.01, map));					
				break;
			case 4:
				nests.push(new Nest(110, 80, hiyoko, BAT, 0.01, map));
				nests.push(new Nest(270, 240, hiyoko, BAT, 0.01, map));				
				break;
		}		
		return nests;
	},
	//城の作成
	getCastle: function(){
		var castle;
		switch(game.stage){			
			case 1:
				castle = new Castle(350, 50);
				break;
			case 2:
				castle = new Castle(30, 280);								
				break;				
			case 3:
				castle = new Castle(280, 280);				
				break;
			case 4:
				castle = new Castle(400, 280);								
				break;
		}
		return castle;
	},
	//鍵の作成
	getKeys: function(){
		var keys = new Array();
		switch(game.stage){
			case 1:
				keys.push(new Key(20, 30));
				keys.push(new Key(400, 100));
				keys.push(new Key(300, 290));	
				break;
			case 2:
				keys.push(new Key(125, 110));
				keys.push(new Key(172, 257));
				keys.push(new Key(250, 90));				
				break;
			case 3:
				keys.push(new Key(60, 50));
				keys.push(new Key(120, 280));
				keys.push(new Key(440, 180));					
				break;
			case 4:
				keys.push(new Key(20, 20));
				keys.push(new Key(440, 20));
				keys.push(new Key(20, 280));				
				break;
		}
		return keys;
	},
	//モンスターの作成
	getMonsters: function(hiyoko, map){
		var monsters = new Array();
		switch(game.stage){
			case 1:
				break;
			case 2:
				break;
			case 3:
				var warm1 = new Monster(370, 20, hiyoko, WARM, map);
				monsters[warm1.id] = warm1;				
				var warm2 = new Monster(40, 230, hiyoko, WARM, map);
				warm2.scaleX = warm2.scaleX * -1;
				monsters[warm2.id] = warm2;
				break;
			case 4:
				var warm1 = new Monster(330, 80, hiyoko, WARM, map);
				monsters[warm1.id] = warm1;				
				var warm2 = new Monster(40, 250, hiyoko, WARM, map);
				warm2.scaleX = warm2.scaleX * -1;
				monsters[warm2.id] = warm2;							
				var dragon1 = new Monster(20, 0, hiyoko, DRAGON, map);
				dragon1.scaleX = dragon1.scaleX * -1;
				monsters[dragon1.id] = dragon1;
				var dragon2 = new Monster(380, 0, hiyoko, DRAGON, map);
				monsters[dragon2.id] = dragon2;
				break;
		}
		return monsters;
	},
	//BGMの設定
	getBGM: function(){
		var bgm = null;
		switch(game.stage){
			case 1:
				bgm = "sound/firstmap_bgm.mp3";
				break;
			case 2:
				bgm = "sound/secondmap_bgm.mp3";
				break;
			case 3:
				bgm = "sound/thirdmap_bgm.mp3";
				break;
			case 4:
				bgm = "sound/finalmap_bgm.mp3";
				break;
		}
		return bgm;
	}
})