var TransformScene = enchant.Class.create(enchant.Scene, {

	initialize: function(type1, type2){

		//コンストラクタ
		enchant.Scene.call(this);

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
	
		//キャラクター1
		var hiyoko1 = new Sprite(320, 320);	
		if(type1 == YELLOW){
			hiyoko1.image = game.assets["images/characters/hiyoco_big.png"];
		}
		else if(type1 == RED){
			hiyoko1.image = game.assets["images/characters/hiyoco_big_lady.png"];		
		}
		else if(type1 == BLUE){		
			hiyoko1.image = game.assets["images/characters/hiyoco_big_waru.png"];		
		}
		hiyoko1.originX = 0;
		hiyoko1.originY = 0;
		hiyoko1.scale(0.5, 0.5);
		hiyoko1.x = ((SCREEN_WIDTH / 2) - (hiyoko1.width*hiyoko1.scaleX / 2));
		hiyoko1.y = ((SCREEN_HEIGHT / 2) - (hiyoko1.height*hiyoko1.scaleY / 2));
		hiyoko1.opacity = 1;
		this.addChild(hiyoko1);

		//キャラクター2
		var hiyoko2 = new Sprite(320, 320);	
		if(type2 == YELLOW){
			hiyoko2.image = game.assets["images/characters/hiyoco_big.png"];
		}
		else if(type2 == RED){
			hiyoko2.image = game.assets["images/characters/hiyoco_big_lady.png"];		
		}
		else if(type2 == BLUE){		
			hiyoko2.image = game.assets["images/characters/hiyoco_big_waru.png"];		
		}
		hiyoko2.originX = 0;
		hiyoko2.originY = 0;
		hiyoko2.scale(0.5, 0.5);
		hiyoko2.x = ((SCREEN_WIDTH / 2) - (hiyoko2.width*hiyoko2.scaleX / 2));
		hiyoko2.y = ((SCREEN_HEIGHT / 2) - (hiyoko2.height*hiyoko2.scaleY / 2));
		hiyoko2.opacity = 0;
		this.addChild(hiyoko2);
		
		//BGMの設定(WebAudioSound対応)
		game.assets["sound/transform.mp3"].play();
		
		//オリジナルデータの利用
		if(game.original){
			game.assets["original/sound3.wav"].play();
		}

		this.addEventListener(Event.ENTER_FRAME, function(){

			hiyoko1.opacity = Math.max(hiyoko1.opacity - 0.02, 0);		
			hiyoko2.opacity = Math.min(hiyoko2.opacity + 0.02, 1);

			if(hiyoko2.opacity == 1){
				game.popScene();
			}

		});
	}
})