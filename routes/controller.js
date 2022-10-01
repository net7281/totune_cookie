

var fs = require('fs') // file system 이라고 해서 파일에 대한 전반적인 기능을 가진 모듈이다.

// exports.mainView = function (req, res) {
//     res.end("Hello World")
// }

exports.mainView = function (req, res) {
// utf8 은 인코딩 부분입니다.
    fs.readFile("./views/index.html", "utf8", function (err,buf) {
        res.end(buf);
    })
}