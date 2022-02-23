// 라우터
// jwt 토큰검사 미들웨어 추가해야함
const express = require('express');
const user = require('../controllers/user'); 
// const { checkTokens, checkUser } = require('../middlewares/user'); 
const router = express.Router(); 
// 회원가입 jwt 미들웨어 필여없음
router.post('/signup', user.add_user);
router.post('/checkid', user.variation_user);
// 로그인

// 로그아웃

// 업데이트

// 회원탈퇴

module.exports = router;