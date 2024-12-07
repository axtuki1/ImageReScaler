# 画像リサイズツール (ImageReScaler)

背景色と背景画像とメイン画像からいい感じに画像作ってくれるやつです。  

---

## 使い方

以下のページで画像を入力して生成ボタン押せば落っこちてきます。  
https://axtuki1.github.io/ImageReScaler/

以下の制約というか仕様です。  
- メイン画像をキャンバス内に収めるようにリサイズします。
- 背景画像はキャンバスに中央寄せで覆いかぶさるようにリサイズします。  
  はみ出た箇所は描画されません。
- レイヤーは以下のように構成されています。  
  \<User\> <-- メイン画像 <-- 背景画像 <-- 背景色 |
- 背景色は単色でパターンはありません。 