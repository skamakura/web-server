const express = require('express')
const path = require("path")
const app = express()

app.unsubscribe(express.urlencoded({ extended: false}))
// console.log(__dirname);      ルートディレクトリをコンソールに出力
app.use(express.static(path.join(__dirname, "public")))     //ルートディレクトリのpublicフォルダを参照

//npmでbody-parserをインストールした
var bodyParser = require('body-parser')     //POSTデータ(body)取得時のエラー回避
const { serialize } = require('v8')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/api/v1/quiz", function (req, res) {
    const answer = req.body.answer;
    if(answer === "2") {
        // res.send("right!")
        res.redirect("/correct.html")
    } else {
        // res.send("miss!")
        res.redirect("/wrong.html")

    }
    res.send(answer)
})

const PORT = process.env.PORT || 3000;  //herokuサーバーのポート番号またはローカルホストの3000番
app.listen(PORT, function () {
    console.log("server is running")
})