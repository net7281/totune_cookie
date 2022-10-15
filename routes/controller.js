

var fs = require('fs') // file system 이라고 해서 파일에 대한 전반적인 기능을 가진 모듈이다.

// exports.mainView = function (req, res) {
//     res.end("Hello World")
// }

const DAO = require("../models/contentDAO");

///fortunePick/////////////////////////////////////////

///randomKey//////////////////////////////////////////
function randomKey(){
    const rand = Math.floor(Math.random() * 3) + 1;
    return rand;
}
///////////////////////////////////////////////////////

///cookie//////////////////////////////////////////////
// function cookieMake(req,res,key){

//     //오늘 날짜 저장
//     let today = new Date();
//     TodayDate = today.toLocaleDateString();

//     //res.setHeader > 값 하나만 전달
//     //res.writeHead > 값 여러개 전달
    
//     if(req.headers.cookie==undefined){
//         res.writeHead(200, { 
//             'Content-Type': 'text/html; charset=utf-8',
//             'Set-Cookie': [
//             //이틀후 쿠키 삭제
//             // 억음부호 ` (물결위치) = ${}를 쓸때 쓴다
//             'key='+ key+';'+`Max-Age=${50}`, 
//             'created_date=' + TodayDate+';'+`Max-Age=${50}`
//             // 60*60*24*2 = 이틀
//             ]
//         })
//         console.log("쿠키생성")
//     }else{
//         res.writeHead(200, { 
//         'Content-Type': 'text/html; charset=utf-8'})
//         console.log("쿠키사용")
//     }
    
    
//     //res.setHeader('Set-Cookie', `token=1`);
//     //res.send(key+" "+content)
//     console.log(req.headers.cookie);
//     //console.log(cookies.created_date);
//     res.end(key+" ")
// }
////////////////////////////////////////////////////



// /main을 호출하면 ~
exports.mainView = function (req, res) {
        //랜덤키값 저장
    const key = randomKey();
    //cookieMake(req,res,key);
    let today = new Date();
    TodayDate = today.toLocaleDateString();
    if(req.headers.cookie==undefined){
        res.writeHead(200, { 
            'Content-Type': 'text/html; charset=utf-8',
            'Set-Cookie': [
            //이틀후 쿠키 삭제
            // 억음부호 ` (물결위치) = ${}를 쓸때 쓴다
            'key='+ key+';'+`Max-Age=${50}`, 
            'created_date=' + TodayDate+';'+`Max-Age=${50}`
            // 60*60*24*2 = 이틀
            ]
        });
        console.log("쿠키생성")
        }else{
        res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8'})
        console.log("쿠키사용")
    };
    const pick = new DAO.fortunePick(key);
    //fortunePick(key).catch(console.dir);//res.end(key+" ")
    console.log(req.headers.cookie);
    console.log(pick);
    
// utf8 은 인코딩 부분입니다.
    fs.readFile("./views/index.html", "utf8", function (err,buf) {
        res.end(buf);
    })
}

