const express = require('express');
const defaultRouter = require('./Router/default');
const bodyParser = require('body-parser');
const userRouter = require('./Router/user');
const cookieParser = require('cookie-parser');
const cors = require('cors')



const app = express();
app.use(cors({orgin: "http://localhost:3000"}))




app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

const port = 5000;
app.listen(port, ()=> console.log(`current Port : ${port}`))


// 라우터
app.use('/api', defaultRouter);
app.use('/user', userRouter);






// const password = '1234';
// let mypwd;
// bcrypt.hash(password, 10, (err, encryptedPassowrd) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(encryptedPassowrd)
//     mypwd = encryptedPassowrd
//     bcrypt.compare(password, mypwd, (err, same) => {
//         // async callback
//         console.log(same)
//     })
//   })

