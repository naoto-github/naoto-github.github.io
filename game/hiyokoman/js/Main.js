//初期設定
enchant();

//画面サイズ
var SCREEN_WIDTH =480;
var SCREEN_HEIGHT = 320;

//背景画像サイズ
var BACK_WIDTH = 800;
var BACK_HEIGHT = 600;

//ひよこタイプ
var YELLOW = 0;
var RED = 1;
var BLUE = 2;

//武器タイプ
var DAGGER = 0;
var SWORD = 1;
var ROD = 2;

//モンスタータイプ
var SLIME = 0;
var BAT = 1;
var WARM = 2;
var ROCK = 3;
var DRAGON = 4;
var THUNDER = 5;
var ORIGINAL = 6;

//ドロップアイテムタイプ
var APPLE = 0;
var BANANA = 1;
var GRAPES = 2;

//Coreオブジェクト
var game = null;

//メイン処理
window.onload = function(){
	
	//Coreオブジェクトの作成
	game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	//FPSの設定
	game.fps = 30;
	
	//オリジナルデータの読込
	game.original = false;
	game.preload("original/character.png");
	game.preload("original/sound3.wav");
	
	//画像の読込
	game.preload("images/background/back_park.jpg");	
	game.preload("images/background/back_castle.jpg");	
	game.preload("images/background/back_rock.jpg");		
	game.preload("images/background/back_space.jpg");			
	game.preload("images/background/back_title.png");		
	game.preload("images/background/gameover_title.png");			
	game.preload("images/background/clear_title.png");				
	game.preload("images/characters/hiyoco_big.png");		
	game.preload("images/characters/hiyoco_big_lady.png");		
	game.preload("images/characters/hiyoco_big_waru.png");			
	game.preload("images/characters/hiyoco_normal_full.png");			
	game.preload("images/characters/hiyoco_lady_full.png");			
	game.preload("images/characters/hiyoco_waru_full.png");				
	game.preload("images/weapon/dagger_icon.png");
	game.preload("images/weapon/sword_icon.png");
	game.preload("images/weapon/rod_icon.png");
	game.preload("images/weapon/dagger.png");
	game.preload("images/weapon/sword.png");
	game.preload("images/weapon/rod.png");	
	game.preload("images/weapon/fire.png");		
	game.preload("images/weapon/cut.png");			
	game.preload("images/weapon/thunder.png");				
	game.preload("images/map/map0.png")	
	game.preload("images/map/map1.png");
	game.preload("images/map/icon0.png");	
	game.preload("images/monster/slime.gif");
	game.preload("images/monster/bat.gif");	
	game.preload("images/monster/dragon.gif");	
	game.preload("images/monster/warm.gif");		
	game.preload("images/monster/effect0.png");		
	
	//サウンドの読込
	game.preload("sound/opening_bgm.mp3");
	game.preload("sound/firstmap_bgm.mp3");	
	game.preload("sound/secondmap_bgm.mp3");		
	game.preload("sound/finalmap_bgm.mp3");			
	game.preload("sound/thirdmap_bgm.mp3");			
	game.preload("sound/gameover_bgm.mp3");		
	game.preload("sound/clear_bgm.mp3");			
	game.preload("sound/select.wav");		
	game.preload("sound/attack_dagger.wav");
	game.preload("sound/attack_rod.mp3");
	game.preload("sound/attack_sword.mp3");	
	game.preload("sound/bomb.mp3");				
	game.preload("sound/get.wav");					
	game.preload("sound/castle.wav");						
	game.preload("sound/clash.mp3");							
	game.preload("sound/transform.mp3");								
	game.preload("sound/thunder.mp3");									
	
	//キーバインド
	game.keybind(32, "a"); //SPACEをAボタン
	
	//ステージナンバー
	game.stage = 0;
	
	//スコア
	game.score = 0;
	
	//ゲーム開始時の処理
	game.onload = function(){
		
		//オープニングシーン
		var scene = new OpeningScene();
		game.pushScene(scene);
		
	}

	//キーリセット用のメソッドを追加
	game.resetKey = function(){
		game.input.left = false;
		game.input.right = false;
		game.input.up = false;
		game.input.down = false;		
	}

	//ゲームの開始
	game.start();
}


