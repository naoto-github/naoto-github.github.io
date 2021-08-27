var OpeningScene = enchant.Class.create(enchant.Scene, {

	initialize: function(){

		//コンストラクタ
		enchant.Scene.call(this);		

		//背景
		var back = new Sprite(800, 600);
		back.image = game.assets["images/background/back_park.jpg"];
		back.x = 0;
		back.y = 0;
		back.originX = 0;
		back.originY = 0;	
		back.scale((SCREEN_WIDTH / back.width), (SCREEN_HEIGHT / back.height));
		this.addChild(back);
	
		//タイトル
		var title = new Sprite(800, 600);
		title.image = game.assets["images/background/back_title.png"];
		title.x = 0;
		title.y = 0;
		title.originX = 0;
		title.originY = 0;
		title.scale((SCREEN_WIDTH / title.width), (SCREEN_HEIGHT / title.height));	
		this.addChild(title);
	
		//キャラクター
		var hiyoko = new Sprite(320, 320);
		hiyoko.image = game.assets["images/characters/hiyoco_big.png"];
		hiyoko.x = 350;
		hiyoko.y = 200;
		hiyoko.originX = 0;
		hiyoko.originY = 0;
		hiyoko.scale(0.3, 0.3);
		this.addChild(hiyoko);

		//ラベル
		var start = new Label("スタート");
		start.font = "40px monospace";
		start.x = (SCREEN_WIDTH / 2) - 80;
		start.y = (SCREEN_HEIGHT / 2) + 10;	
		start.color = "white";
		start.width = 160;
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
			var scene = new BattleScene(1);
			game.popScene();
			game.pushScene(scene);
			
			//SEの開始
			game.assets["sound/select.wav"].play();
			
			//BGMの停止
			game.assets["sound/opening_bgm.mp3"].stop();
		})
	
		//BGMの設定(WebAudioSound対応)
		if(game.assets["sound/opening_bgm.mp3"].src){
			game.assets["sound/opening_bgm.mp3"].play();
			game.assets["sound/opening_bgm.mp3"].src.loop = true;		
		}
	
		//BGMの設定(DOMSound対応)
		this.addEventListener(Event.ENTER_FRAME, function(){
			if(!game.assets["sound/opening_bgm.mp3"].src){
				game.assets["sound/opening_bgm.mp3"].play();
			}
		});
	
	}
})