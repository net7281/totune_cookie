

const router = require("express").Router();
const controller = require("./controller");

// router.get("/", function (req, res) {
//      res.end("Hello World");
// })


router.get("/main", controller.mainView);

/* 
controller 안에는 mainView 라는 값이 있고 이걸 exports 했기 때문에 불러오는게 가능하다.
원래 있던 함수가 controller 로 넘어갔기 때문에 없애준다.
function (req, res) {
     res.end("Hello World");
}
*/

module.exports = router;