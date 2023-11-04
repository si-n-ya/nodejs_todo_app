import http from 'http'; // httpモジュールの読み込み

const server = http.createServer((req, res) => { //  HTTPサーバを作成
  if (req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' }); // レスポンスHTTPヘッダーを設定
    res.end(JSON.stringify({ message: 'todoテスト' })); // レスポンスボディを送信
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'ページが見つかりません。' }));
  }
});

const PORT = process.env.PORT || 3000; // ポート3000でリクエストを行う

server.listen(PORT, () => console.log(`サーバー起動中：ポート ${PORT}`));
