var GameOverScene = enchant.Class.create(enchant.Scene, {

	initialize: function(type){
		
		//コンストラクタ
		enchant.Scene.call(this);
	
		//BGMの停止
		switch(game.stage){
			case 1:
				game.assets["sound/firstmap_bgm.mp3"].stop();			
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
		title.image = game.assets["images/background/gameover_title.png"];
		title.x = 0;
		title.y = 0;
		title.originX = 0;
		title.originY = 0;	
		title.scale((SCREEN_WIDTH / title.width), (SCREEN_HEIGHT / title.height));
		this.addChild(title);		

		//スコア
		var score_label = ScoreLabel(10, 10);
		score_label.score = game.score;
		this.addChild(score_label);

		//キャラクター
		var hiyoko = new Sprite(32, 32);
		if(type == YELLOW){
			hiyoko.image = game.assets["images/characters/hiyoco_normal_full.png"];
		}
		else if(type == RED){
			hiyoko.image = game.assets["images/characters/hiyoco_lady_full.png"];		
		}
		else if(type == BLUE){		
			hiyoko.image = game.assets["images/characters/hiyoco_waru_full.png"];		
		}		
		hiyoko.frame = 5;	
		hiyoko.x = 350;
		hiyoko.y = 200;
		hiyoko.originX = 0;
		hiyoko.originY = 0;
		hiyoko.scale(2, 2);
		this.addChild(hiyoko);	
	
		//ラベル
		var start = new Label("リスタート");
		start.font = "40px monospace";
		start.x = (SCREEN_WIDTH / 2) - 100;
		start.y = (SCREEN_HEIGHT / 2) + 10;	
		start.color = "white";
		start.width = 200;	
		this.addChild(start);			
		
		//ラベルの点滅
		start.addEventListener(Event.ENTER_FRAME, function(){
			var time = (new Date()).getMilliseconds();	
			if(time > 500){
				start.opacity = 1;
			}
			else{
				start.opacity = 0;			
			}
		});		
	
		//ラベルのタッチ
		start.addEventListener(Event.TOUCH_END, function(){
		
			var scene = null;	
			switch(game.stage){
				case 1:
					scene = new BattleScene(1);						
					break;
				case 2:
					scene = new BattleScene(2);
					break;
				case 3:
					scene = new BattleScene(3);
					break;
				case 4:
					scene = new BattleScene(4);
					break;
			}					
			game.popScene();
			game.pushScene(scene);
			game.score = 0;
				
			//SEの開始
			game.assets["sound/select.wav"].play();		
		
			//BGMの停止		
			game.assets["sound/gameover_bgm.mp3"].stop();		
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
		game.assets["sound/gameover_bgm.mp3"].play();		
	
	}

})