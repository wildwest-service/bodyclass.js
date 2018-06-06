bodyclass.js
==============================================================


概要
--------------------------------------------------

ディレクトリ名・ファイル名・デバイス・OS・ブラウザの情報をJavaScriptで取得し、`<body>`などの任意の要素にclass属性値として出力するためのjsファイル。

出力されるclassは主にCSSでセレクタとして使用することを想定しており、スタイルの上書きや閲覧環境固有のバグ回避などに使用できる。

※ 類似の機能・役割としては、WordPressの「bodyClass関数」が挙げられる。  


### 特徴・有用性

* 静的なHTMLページ（サイト）で使用できる
* 出力する文字列のプレフィックスを任意に指定できる
* 5つの判定内容のうち、どれを使用するかを指定できる
* 出力先の要素を指定できる


### 判定可能なもの

1. HTMLディレクトリ
2. ファイル名
3. デバイスタイプ
4. OS
5. ブラウザ


### 利用シーン

* ナビゲーションのアクティブ表現
* デバイス別のスタイリング
* 特定環境（ブラウザ・OSなど）のバグ回避 など



目次
--------------------------------------------------

1. 動作環境
2. 利用方法
3. 機能説明
4. 出力class一覧
5. 特定端末の判定方法
6. 開発者について
7. MITライセンス



1.動作環境
--------------------------------------------------

* jQueryを利用
* jQuery 1.0.0以上 にて動作


### 注意事項

制作時にHTMLファイルをローカルファイルとして直接開くと、ファイル名の判定がサーバー上と異なるため、ルートパスが有効な状態での使用を推奨。 



2.利用方法
--------------------------------------------------

利用したいHTMLページに、「bodyclass.js」をインポートする。

記述例

`<script src="/js/bodyclass.js"></script>`



3.設定可能項目
--------------------------------------------------

「bodyclass.js」のファイル内で、以下の3種類を設定できる。


### 設定1. 識別機能それぞれのON・OFF

WordPressなど、bodyにclassを付与する既存の仕組みと重複する場合に、任意の判定のみを無効とすることができる。

以下の変数に`0`を設定すると、対応する識別classが出力されなくなる。

#### 機能設定用の変数

* `directory_enabled`　…　ディレクトリ判定機能のON・OFF
* `file_enabled`　…　ファイル名判定機能のON・OFF
* `device_enable`　…　デバイスタイプ判定機能のON・OFF
* `os_enabled`　…　OS判定機能のON・OFF
* `browser_enabled`　…　ブラウザ判定機能のON・OFF


### 設定2. プレフィックスの設定

各判定用classのプレフィックスとして出力される文字列を任意に設定可能。

#### プレフィックス用の変数

* `directory_prefix`　…　ディレクトリ用
* `file_prefix`　…　ファイル用
* `device_prefix`　…　デバイス用
* `os_prefix`　…　OS用
* `browser_prefix`　…　ブラウザ用


### 設定3. 出力先の要素を指定

ページ出力のルートとなる`<body>`に付与する事を想定したプログラムではあるが、変数`target_element`の値を変更する事で、任意のHTML要素を指定して出力できる。

※現在のところjQueryに依存したプログラムであるため、CSSのセレクタ書式でclassやidを指定することもできる。



4.出力class一覧
--------------------------------------------------

出力されるclassの仕様を以下に説明する。

※ `[****_prefix]`　の記述は、対応するプレフィックス用の変数の値で置き換えられる


### 1. ディレクトリ

* `.[directory_prefix]-[ディレクトリ名]`
	* ディレクトリ名は、`about/`→`about`のようにスラッシュを含まない状態に置換して出力する

例）dir-about、dir-company など


### 2. ファイル名

* `.[file_prefix]-[ファイル名] `
	* ファイル名は`index.html`→`index`のように拡張子を含まない状態に置換して出力する

例）pg-index、pg-complete など


### 3. デバイスタイプ

* スマートフォン
	*  `.[device_prefix]-smartphone`
* タブレット
	* `.[device_prefix]-tablet`
* PC（スマートフォンとタブレット以外は全てPCと判定）
	* `.[device_prefix]-pc`


### 4. OS

* Windows
	* `.[os_prefix]-windows`
* MacOS
	* `.[os_prefix]-macos`
* Linux
	* `.[os_prefix]-linux`
* iOS
	* `.[os_prefix]-ios`
* Android
	* `.[os_prefix]-android`
* その他
	* `.[os_prefix]-other_os`


### 5. ブラウザ

* MSEdge
	* `.[browser_prefix]-edge`
* IE11
	* `.[browser_prefix]-ie11`
* IE10
	* `.[browser_prefix]-ie10`
* IE9
	* `.[browser_prefix]-ie9`
* IE8
	* `.[browser_prefix]-ie8`
* IE7
	* `.[browser_prefix]-ie7`
* Chromium
	* `.[browser_prefix]-chromium`
* Chrome
	* `.[browser_prefix]-chrome`
* Firefox
	* `.[browser_prefix]-firefox`
* Safari
	* `.[browser_prefix]-safari`
* Opera
	* `.[browser_prefix]-opera`
* Opera Mini
	* `.[browser_prefix]-opera_mini`
* 旧Android標準（Android4.4以前の標準ブラウザ）
	* `.[browser_prefix]-standard`
* その他
	* `.[browser_prefix]-other_browser`



5.特定端末の判定方法
--------------------------------------------------

CSSファイル内で特定の端末を判定してスタイルを適用するには、bodyに出力されるclassを組み合わせたセレクタを使用する。  

### CSSセレクタ記述例

※各プレフィックスが標準設定のまま出力された場合の記述例

* iPhone（iPod touchも同じ）
	* `.os-ios.device-smartphone{}`
* iPad
	* `.os-ios.device-tablet{}`
* MacOS
	* `.os-macos.device-pc{}`
* Androidスマートフォン
	* `.os-android.device-smartphone{}`
* Androidタブレット
	* `.os-android.device-tablet{}`
* WindowsPC
	* `.os-windows.device-pc{}`
* WindowsPhone
	* `.os-windows.device-smartphone{}`


6.開発者について
--------------------------------------------------

* 開発・実装： 長尾一矢（[@wildwest_kazya](https://twitter.com/wildwest_kazya)）
* 基本設計： 黒田真一朗（[@CROO1379](https://twitter.com/CROO1379)）



7.MITライセンス
--------------------------------------------------


### 参考日本語訳

Copyright 2018 ICT, Inc.

以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。

上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。

ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。


### 原文

Copyright 2018 ICT, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.