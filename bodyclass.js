$(function(){
//---

// bodyclass
// ==============================================================
// 様々な情報をbody開始タグに出力するためのjs  
// ローカルサーバーを起動した状態など、ルートパスが有効な状態での使用を推奨  
// （ローカルファイルとして直接開くとファイル名の判定がサーバー上と異なるため）
// 

// 識別classそれぞれのON・OFF設定が可能
// --------------------------------------------------
// 以下の変数に0を設定すると対応する識別classが出力されなくなる
// 
// * directory_enabled
// * file_enabled
// * device_enabled
// * os_enabled
// * browser_enabled
// 

// 出力先要素の指定が可能
// --------------------------------------------------
// 便宜上bodyclassという呼称ではあるが、変数target_elementの値に指定した  
// セレクタとなる要素に出力されるようになっている  
// 現在のところjQueryに依存しているため、CSSのセレクタ書式でclassやidでの指定も可能
// 

// ディレクトリの判定class一覧（[directory_prefix]は変数の値で置き換えられる）
// --------------------------------------------------
// [directory_prefix]-[ディレクトリ名] （ディレクトリ名はabout/のaboutなどスラッシュを含まない状態で出力）
// 

// ファイル名の判定class一覧（[file_prefix]は変数の値で置き換えられる）
// --------------------------------------------------
// [file_prefix]-[ファイル名] （ファイル名はindex.htmlのindexなど拡張子を含まない状態で出力）
// 

// デバイスタイプの判定class一覧（[device_prefix]は変数の値で置き換えられる）
// --------------------------------------------------
// スマートフォン： [device_prefix]-smartphone
// タブレット：    [device_prefix]-tablet
// PC：        [device_prefix]-pc （スマートフォンとタブレット以外は全てPCと判定）
// 

// OSの判定class一覧（[os_prefix]は変数の値で置き換えられる）
// --------------------------------------------------
// Windows: [os_prefix]-windows
// MacOS:   [os_prefix]-macos
// Linux:   [os_prefix]-linux
// iOS:     [os_prefix]-ios
// Android: [os_prefix]-android
// その他:    [os_prefix]-other_os
// 

// ブラウザの判定class一覧（[browser_prefix]は変数の値で置き換えられる）
// --------------------------------------------------
// MSEdge:       [browser_prefix]-edge
// IE11:         [browser_prefix]-ie11
// IE10:         [browser_prefix]-ie10
// IE9:          [browser_prefix]-ie9
// IE8:          [browser_prefix]-ie8
// IE7:          [browser_prefix]-ie7
// Chromium:     [browser_prefix]-chromium
// Chrome:       [browser_prefix]-chrome
// Firefox:      [browser_prefix]-firefox
// Safari:       [browser_prefix]-safari
// Opera:        [browser_prefix]-opera
// Opera Mini:   [browser_prefix]-opera_mini
// 旧Android標準: [browser_prefix]-standard （Android4.4以前の標準ブラウザ）
// その他:         [browser_prefix]-other_browser
// 

// 特定端末の判定方法
// --------------------------------------------------
// 特定の端末を判定してスタイルを適用するには、出力されるbodyのclassを組み合わせたセレクタを使用する  
// 以下の例は分かりやすくするため、各プレフィックスが標準の状態で出力されたとして記述している
// 
// iPhone:           .os-ios.device-smartphone （iPod touchも同じ）
// iPad:             .os-ios.device-tablet
// MacOS:            .os-macos.device-pc
// Androidスマートフォン: .os-android.device-smartphone
// Androidタブレット:    .os-android.device-tablet
// WindowsPC:        .os-windows.device-pc
// WindowsPhone:     .os-windows.device-smartphone
// 


// class出力のON・OFF設定
// ==================================================
// それぞれ0で無効、1などそれ以外の値で有効となる
// 

// ディレクトリ識別
var directory_enabled = 1;
// ファイル識別
var file_enabled      = 1;
// デバイス識別
var device_enabled    = 1;
// OS識別
var os_enabled        = 1;
// ブラウザ識別
var browser_enabled   = 1;


// class出力先要素の設定
// ==================================================
// 出力先のセレクタを指定
// 

var target_element = 'body';


// プレフィックスの設定
// ==============================================================
// 出力先要素に付与するclass名のプレフィックスを設定できます。
// 

// ディレクトリ用のプレフィックス
var directory_prefix = 'dir';
// ファイル用のプレフィックス
var file_prefix = 'pg';
// デバイス名に使用するプレフィックス
var device_prefix = 'device';
// OS名に使用するプレフィックス
var os_prefix = 'os';
// ブラウザ名に使用するプレフィックス
var browser_prefix = 'browser';



// ディレクトリとファイル識別Classの出力
// ==============================================================
// ディレクトリやファイル名を元に、エリアやページを特定するためのClassをbodyタグに出力する
// 

// 共通処理
// --------------------------------------------------
// パスを取得
var locPath = location.pathname;
// パスを整形
var path = locPath.split("/").reverse();


// ディレクトリによる識別Class出力処理
// --------------------------------------------------
// 
if (directory_enabled) {
	// ルートディレクトリの場合
	if(locPath == '/' || locPath.indexOf('/index') === 0){
		directoryClass = directory_prefix+'-root';
		// ディレクトリ識別用Classの出力
		$(target_element).addClass(directoryClass);
	// 下層ディレクトリの場合
	} else {
		//ファイル名を削除
		var dirPath = path.slice(1);
		// 配列の中に空が含まれていたら削除
		var dirPath = $.grep(dirPath, function(e){
			return e !== "";
		});
		for (var i = dirPath.length; i--; ) {
			var directoryClass = directory_prefix+'-'+dirPath[i];
			// ディレクトリ識別用Classの出力
			$(target_element).addClass(directoryClass);
		}

		if (dirPath.length == 0) {
			directoryClass = directory_prefix+'-root';
			$(target_element).addClass(directoryClass);
		}
	}
}

// ファイル名による識別Class出力
// --------------------------------------------------
// 
if (file_enabled) {
	// ディレクトリ名とファイル名の連結用変数の初期化
	if(locPath == '/' || locPath.indexOf('/index') === 0){
		var filePath = '-root';
	} else {
		var filePath = '';
	}
	// ディレクトリ名とファイル名の連結
	for (var j=path.length - 2; j>-1; j--) {
		// 空の場合は、アクセスしたURLが/で終っているため、明示的にindexを付与
		if (path[j].length < 1) {
			filePath = filePath + '-index';

		// 拡張子つきの場合は拡張子を削除
		} else if (path[j].indexOf('.') > -1) {
			filePath = filePath+'-'+path[j].substring(0,path[j].indexOf("."));

		// それ以外の場合はそのまま連結
		} else {
			filePath = filePath+'-'+path[j];
		}
	}
	// ファイル識別用Classの組み立て
	var fileClass = file_prefix + filePath;
	// ファイル識別用Classの出力
	$(target_element).addClass(fileClass);
}



// 端末情報識別処理
// --------------------------------------------------
// 

/**
 * 処理に使用するネームスペースとなるオブジェクト
 * @type {Object}
 */
var body_class = {};

/**
 * バージョンを配列化するメソッド
 * @param  {String} version バージョンを表すドット区切りの文字列
 * @return {Array}          バージョンをドットで区切った配列
 */
body_class.to_array_version = function (version) {
	version_array = version.split('.');
	for (var i=0; i < version_array.length; i++) {
		version_array[i] = parseFloat(version_array[i]) || 0;
	}
	return version_array;
};

/**
 * 合致するデバイスタイプでの閲覧時にtrueを返すメソッド群
 * @param  {String}  ua 全て小文字にしたUserAgent
 * @return {Boolean}    trueまたはfalse
 */
body_class.is_smartphone = function (ua) {
	if (ua.match('nexus 10') || ua.match('nexus 9') || ua.match('nexus 7')) {
		return false;
	} else if (ua.match('iphone') || ua.match('ipod')) {
		return true;
	} else if ((ua.match('android') && ua.match('mobile')) || (ua.match('android') && !ua.match('mobile') && !ua.match('tablet'))) {
		return true;
	} else if (ua.match('windows') && ua.match('phone')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_tablet = function (ua) {
	if (ua.match('nexus 10') || ua.match('nexus 9') || ua.match('nexus 7')) {
		return true;
	} else if (ua.match('ipad')) {
		return true;
	} else if (ua.match('android') && (!ua.match('mobile') || ua.match('tablet'))) {
		return true;
	} else {
		return false;
	}
};

/**
 * 合致するOSでの閲覧時にtrueを返すメソッド群
 * @param  {String}  ua 全て小文字にしたUserAgent
 * @return {Boolean}    trueまたはfalse
 */
body_class.is_windows = function (ua) {
	if (ua.match('windows')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_macos = function (ua) {
	if (ua.match('macintosh')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_linux = function (ua) {
	if (ua.match('x86_64') || ua.match('i686') || ua.match('amd64') || ua.match('tizen')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_ios = function (ua) {
	if (ua.match('iphone') || ua.match('ipod') || ua.match('ipad')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_android = function(ua) {
	if (ua.match('android')) {
		return true;
	} else {
		return false;
	}
};


/**
 * 合致するブラウザでの閲覧時にtrueを返すメソッド群
 * @param  {String}  ua 全て小文字にしたUserAgent
 * @return {Boolean}    trueまたはfalse
 */
body_class.is_chrome = function (ua) {
	if ((ua.match('chrome') && !ua.match('edge')) || (ua.match('crios'))) {
		return true;
	} else {
		return false;
	}
};
body_class.is_chromium = function (ua) {
	if (ua.match('chromium')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_firefox = function (ua) {
	if (ua.match('firefox') || ua.match('fxios')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_safari = function (ua) {
	if (ua.match('safari') && ua.match('version') && !ua.match('chrome') && !ua.match('crios') && !ua.match('linux; u;')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_edge = function (ua) {
	if (ua.match('edge') && ua.match('chrome') && !ua.match('opera')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_ie = function (ua) {
	if ((ua.match('msie') || ua.match('trident/7')) && !ua.match('chrome') && !ua.match('opera')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_opera = function (ua) {
	if (ua.match('opera') || ua.match('opr')) {
		return true;
	} else {
		return false;
	}
};
body_class.is_opera_mini = function (ua) { // Android・ios共通
	if ((ua.match('opera') || ua.match('opr')) && (ua.match('linux; u;') || ua.match('ios') || ua.match('iphone') || ua.match('opera mini'))) {
		return true;
	} else {
		return false;
	}
};
body_class.is_standard = function (ua) { // Android 4.4以前の標準ブラウザ
	if ((ua.match('android')) && ua.match('linux; u;') && !ua.match('chrome') || (ua.match('android'))  && ua.match('chrome') && ua.match('version')) {
		return true;
	} else {
		return false;
	}
};


/**
 * 全て小文字にしたUserAgent
 * @type  {String}
 */
body_class.ua = (function () {
	var ua = window.navigator.userAgent;
	ua = ua.toLowerCase();

	return ua;
})();


/**
 * OS名
 * @type  {String}
 */
body_class.os_name = (function () {
	switch (true) {
		case body_class.is_windows(body_class.ua):
			return 'windows';

		case body_class.is_macos(body_class.ua):
			return 'macos';

		case body_class.is_linux(body_class.ua):
			return 'linux';

		case body_class.is_ios(body_class.ua):
			return 'ios';

		case body_class.is_android(body_class.ua):
			return 'android';

		default:
			return 'other_os';
	}
})();

/**
 * ブラウザ名
 * @type  {String}
 */
body_class.browser_name = (function () {
	switch (true) {
		case body_class.is_edge(body_class.ua):
			return 'edge';

		case body_class.is_ie(body_class.ua):
			return 'ie';

		case body_class.is_opera_mini(body_class.ua):
			return 'opera_mini';

		case body_class.is_opera(body_class.ua):
			return 'opera';

		case body_class.is_chromium(body_class.ua):
			return 'chromium';

		case body_class.is_chrome(body_class.ua):
			return 'chrome';

		case body_class.is_firefox(body_class.ua):
			return 'firefox';

		case body_class.is_safari(body_class.ua):
			return 'safari';

		case body_class.is_standard(body_class.ua):
			return 'standard';

		default:
			return 'other_browser';
	}	
})();

/**
 * ブラウザのバージョン
 * @type  {Array}
 */
body_class.browser_version = (function () {
	/**
	 * バージョン
	 * @type {Number}
	 */
	var version = 0;

	// バージョン判定処理
	switch (body_class.os_name) {
		case 'windows':
			switch (body_class.browser_name) {
				case 'edge':
					version = body_class.ua.match(/edge\/[0-9]+\.[0-9]+/)[0].replace('edge/','');
					break;
				case 'ie':
					// IE11
					if (body_class.ua.indexOf('msie') === -1) {
						version = body_class.ua.match(/rv:([0-9]+\.*)+/)[0].replace('rv:','');
					// IE10以前
					} else {
						version = body_class.ua.match(/msie\s([0-9]+\.*)+/)[0].replace('msie ','');
					}
					break;
				case 'chromium':
					version = body_class.ua.match(/chromium\/([0-9]+\.*)+/)[0].replace('chromium/','');
					break;
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'macos':
			switch (body_class.browser_name) {
				case 'safari':
					version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					break;
				case 'chromium':
					version = body_class.ua.match(/chromium\/([0-9]+\.*)+/)[0].replace('chromium/','');
					break;
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'linux':
			switch (body_class.browser_name) {
				case 'chromium':
					version = body_class.ua.match(/chromium\/([0-9]+\.*)+/)[0].replace('chromium/','');
					break;
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'ios':
			switch (body_class.browser_name) {
				case 'safari':
					version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					break;
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'android':
			switch (body_class.browser_name) {
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'standard':
					version = body_class.ua.match(/android ([0-9]+\.*)+/)[0].replace('android ','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'other_os':
			switch (body_class.browser_name) {
				case 'chrome':
					if (!body_class.ua.match('crios')) {
						version = body_class.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					} else {
						version = body_class.ua.match(/crios\/([0-9]+\.*)+/)[0].replace('crios/','');
					}
					break;
				case 'firefox':
					if (!body_class.ua.match('fxios')) {
						version = body_class.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					} else {
						version = body_class.ua.match(/fxios\/([0-9]+\.*)+/)[0].replace('fxios/','');
					}
					break;
				case 'opera':
				case 'opera_mini':
					if (body_class.ua.match('opr')) {
						version = body_class.ua.match(/opr\/([0-9]+\.*)+/)[0].replace('opr/','');
					} else {
						version = body_class.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					}
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;
	}

	return version;
})();



	// デバイスタイプ識別クラスの出力処理
	// --------------------------------------------------
	// 
	if (device_enabled) {
		//smartphone
		if(body_class.is_smartphone(body_class.ua)) {
			$(target_element).addClass(device_prefix+'-smartphone');
		}
		//tablet
		else if(body_class.is_tablet(body_class.ua)) {
			$(target_element).addClass(device_prefix+'-tablet');
		}
		//PC
		else {
			$(target_element).addClass(device_prefix+'-pc');
		}
	}



	// OS識別クラスの出力処理
	// ==============================================================
	// 
	if (os_enabled) {
		// Mac
		if(body_class.is_macos(body_class.ua)) {
			$(target_element).addClass(os_prefix+'-mac');
		}
		// windows
		else if(body_class.is_windows(body_class.ua)){
			$(target_element).addClass(os_prefix+'-windows');
		}
		// Linux
		else if(body_class.is_linux(body_class.ua)){
			$(target_element).addClass(os_prefix+'-linux');
		}
		// iOS
		else if(body_class.is_ios(body_class.ua)){
			$(target_element).addClass(os_prefix+'-ios');
		}
		// Android
		else if(body_class.is_android(body_class.ua)){
			$(target_element).addClass(os_prefix+'-android');
		}
	}



	// ブラウザ識別クラスの出力処理
	// ==============================================================
	// 
	if (browser_enabled) {
		// IEの場合
		if (body_class.browser_name === 'ie') {
			$(target_element).addClass(browser_prefix+body_class.browser_name+parseInt(body_class.browser_version));
		}
		else {
			$(target_element).addClass(browser_prefix+body_class.browser_name);
		}
	}

// bodyclass END

//---
});


