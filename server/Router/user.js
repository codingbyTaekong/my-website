// 라우터
// jwt 토큰검사 미들웨어 추가해야함
const express = require('express');
const user = require('../controllers/user'); 
// const { checkTokens, checkUser } = require('../middlewares/user'); 
const router = express.Router(); 
// 회원가입 jwt 미들웨어 필여없음
router.post('/signup', user.add_user);
// id 중복 체크
router.post('/checkid', user.varify_user);
// router.get('/checktoken', (req, res)=> {
//     let authHeader = req.headers['authorization'];
//     console.log(authHeader);
//     res.send(authHeader)
// })

// jwt 체크

// 로그인
router.post('/login', user.login)

// 로그아웃

// 업데이트

// 회원탈퇴

module.exports = router;