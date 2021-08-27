var ClearScene = enchant.Class.create(enchant.Scene, {

	initialize: function(type, time){

		//コンストラクタ
		enchant.Scene.call(this);
	
		//BGMの停止
		switch(game.stage){
			case 1:
				game.assets["sound/firstmap_bgm.mp3"].stop()
				break;
			case 2:
				game.assets["sound/secondmap_bgm.mp3"].stop();							
				break;
			case 3:
				game.assets["sound/thirdmap_bgm.mp3"].stop();											
				break;
			case 4:
				game.assets["sound/finalmap_bgm.mp3"].stop();
				break;
		}
	
		//背景
		var back = new Sprite(800, 600);
	
		//背景の変更
		switch(game.stage){
			case 1:
				back.image = game.assets["images/background/back_park.jpg"];			
				break;
			case 2:
				back.image = game.assets["images/background/back_castle.jpg"];					
				break;
			case 3:
				back.image = game.assets["images/background/back_rock.jpg"];		
				break;
			case 4:
				back.image = game.assets["images/background/back_space.jpg"];
				break;
		}
	
		back.x = 0;
		back.y = 0;
		back.originX = 0;
		back.originY = 0;	
		back.scale((SCREEN_WIDTH / back.width), (SCREEN_HEIGHT / back.height));
		this.addChild(back);	

		//タイトル
		var title = new Sprite(800, 600);
		title.image = game.assets["images/background/clear_title.png"];
		title.x = 0;
		title.y = 0;
		title.originX = 0;
		title.originY = 0;	
		title.scale((SCREEN_WIDTH / title.width), (SCREEN_HEIGHT / title.height));
		this.addChild(title);		

		//スコア
		var score_label = ScoreLabel(10, 10);
		game.score += time * 10;
		score_label.score = game.score;
		this.addChild(score_label);

		//キャラクター
		var hiyoko = new Sprite(320, 320);
		if(type == YELLOW){
			hiyoko.image = game.assets["images/characters/hiyoco_big.png"];
		}
		else if(type == RED){
			hiyoko.image = game.assets["images/characters/hiyoco_big_lady.png"];		
		}
		else if(type == BLUE){		
			hiyoko.image = game.assets["images/characters/hiyoco_big_waru.png"];		
		}		
		hiyoko.x = 350;
		hiyoko.y = 200;
		hiyoko.originX = 0;
		hiyoko.originY = 0;
		hiyoko.scale(0.3, 0.3);
		this.addChild(hiyoko);

		//ラベル
		var next_lb = null;
		switch(game.stage){
			case 1:
				next_lb = new Label("セカンドステージへ");
				next_lb.font = "40px monospace";
				next_lb.x = (SCREEN_WIDTH / 2) - 180;
				next_lb.y = (SCREEN_HEIGHT / 2) + 10;	
				next_lb.color = "white";
				next_lb.width = 360;			
				break;
			case 2:
				next_lb = new Label("サードステージへ");
				next_lb.font = "40px monospace";
				next_lb.x = (SCREEN_WIDTH / 2) - 160;
				next_lb.y = (SCREEN_HEIGHT / 2) + 10;	
				next_lb.color = "white";
				next_lb.width = 320;			
				break;
			case 3:
				next_lb = new Label("ファイナルステージへ");	
				next_lb.font = "40px monospace";
				next_lb.x = (SCREEN_WIDTH / 2) - 200;
				next_lb.y = (SCREEN_HEIGHT / 2) + 10;	
				next_lb.color = "white";
				next_lb.width = 400;			
				break;
			case 4:
				next_lb = new Label("最初に戻る");	
				next_lb.font = "40px monospace";
				next_lb.x = (SCREEN_WIDTH / 2) - 100;
				next_lb.y = (SCREEN_HEIGHT / 2) + 10;	
				next_lb.color = "white";
				next_lb.width = 200;			
				break;				
		}	
		this.addChild(next_lb);

		//ラベルの点滅
		next_lb.addEventListener(Event.ENTER_FRAME, function(){
			var time = (new Date()).getMilliseconds();	
			if(time > 500){
				next_lb.opacity = 1;
			}
			else{
				next_lb.opacity = 0;			
			}
		});		

		//ラベルのタッチ
		next_lb.addEventListener(Event.TOUCH_END, function(){
		
			var scene = null;
			switch(game.stage){
				case 1:
					scene = new BattleScene(2);
					break;
				case 2:
					scene = new BattleScene(3);					
					break;
				case 3:
					scene = new BattleScene(4);										
					break;
				case 4:
					scene = new OpeningScene();
					break;
			}				
			game.popScene();
			game.pushScene(scene);
				
			//SEの開始
			game.assets["sound/select.wav"].play();		
		
		})

		//スコアの登録
		var end_lb = new Label("スコアを登録して終了");
		end_lb.font = "30px monospace";
		end_lb.x = (SCREEN_WIDTH / 2) - 150;
		end_lb.y = (SCREEN_HEIGHT / 2) + 60;	
		end_lb.color = "red";
		end_lb.width = 300;		
		this.addChild(end_lb);
		
		//スコアの点滅
		end_lb.addEventListener(Event.ENTER_FRAME, function(){
			var time = (new Date()).getMilliseconds();	
			if(time > 500){
				end_lb.opacity = 1;
			}
			else{
				end_lb.opacity = 0;			
			}
		});			
		
		//スコアのタッチ
		end_lb.addEventListener(Event.TOUCH_END, function(){
			game.end(game.score, "スコアは" + game.score + "です！");			
		})

		//BGMの設定(WebAudioSound対応)
		game.assets["sound/clear_bgm.mp3"].play();
				
	}

})