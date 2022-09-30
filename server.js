const express = require('express')
var cookie = require('cookie');

const app = express()
const port = 3000



var MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb+srv://viewer:cookie22ee@fortune.uktcovq.mongodb.net/?retryWrites=true&w=majority';



const client = new MongoClient(DB_URL);

var key;
var content;


//async : 결과를 항상 promise(비동기 처리가 완료되면 프로미스가 결과 값을 반환)로 반환
async function run() {
  try {
    const database = client.db("myFirstDatabase");
    const fortuneDatas = database.collection("fortuneList");
 
    const query = { key: 2 };
    const options = { 
      projection: { _id: 0, key: 1, content: 1 },
    };

    //await : promise가 이행된 후 실행
    const fortuneData = await fortuneDatas.findOne(query, options);

    key =fortuneData.key;
    content =fortuneData.content;

  } finally {
    await client.close();
  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  let today = new Date();
  TodayDate = today.toLocaleDateString();

  //res.setHeader > 값 하나만 전달
  //res.writeHead > 값 여러개 전달

  //var cookies = cookie.parse(req.headers.cookie);

  if(req.headers.cookie==undefined){
    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': [

          //이틀후 쿠키 삭제
          // 억음부호 ` (물결위치) = ${}를 쓸때 쓴다
           'key='+ 2+';'+`Max-Age=${50}`, 
           'created_date=' + TodayDate+';'+`Max-Age=${50}`
          // 60*60*24*2 = 이틀
        ]
      })
      console.log("쿠키생성")
  }else{
    res.writeHead(200, { 
      'Content-Type': 'text/html; charset=utf-8'})
      console.log("쿠키사용")
  }
  
  


  //res.setHeader('Set-Cookie', `token=1`);
  //res.send(key+" "+content)
  console.log(req.headers.cookie);
  //console.log(cookies.created_date);
  res.end(key+" "+content)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})