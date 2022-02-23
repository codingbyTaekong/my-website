// 컨트롤러
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db_config = require("../db_config");
const conn = db_config.init();

module.exports = {
  add_user: async (req, res) => {
    const {
      body: { id, pwd, nickname },
    } = req;
    // console.log(`userid:::::::: ${user_id}`);
    const select_sql = `
        select * from user_table where user_id = '${id}'
    `;
    conn.query(select_sql, async (err, rows) => {
      if (err) {
        console.log(err);
        res.send({ callback: 500, err: err });
      }
      if (rows.length === 0) {
        // 비밀번호 암호화
        bcrypt.hash(pwd, 10, (err, encryptedPassoword) => {
          if (err) {
            console.log(err);
            return res.send({ callback: 500, err: err });
          }
          console.log(encryptedPassoword)

          // jwt토큰 생성
          // db에 저장할 토큰
          const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
            expiresIn: "14d",
            issuer: "bigchoi",
          });

          const insert_sql = `
                  insert into user_table set
                      user_id = '${id}',
                      user_pwd = '${encryptedPassoword}',
                      user_nickname = '${nickname}',
                      token = '${refreshToken}',
                      created_at = NOW(),
                      updated_at = NOW()
              `;
          conn.query(insert_sql, (err, rows) => {
            if (err) {
              console.log(err);
              res.send({ callback: 500, err: err });
              return;
            }
            //accessToken 발행
            const accessToken = jwt.sign(
              { id, nickname },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
                issuer: "bigchoi",
              }
            );
            res.cookie("accessToken", accessToken);
            res.cookie("refreshToken", refreshToken);
            res.send('success');
          });
        });
      } else {
        // 이미 가입되어 있는 경우
        res.send({ callback: 202, err: "This ID is already registered" });
      }
    });
  },
  variation_user : async (req, res)=> {
    const {
      body: { user_id },
    } = req;

    const select_sql = `
        select * from user_table where user_id = '${user_id}'
    `;
    conn.query(select_sql, async (err,rows)=> {
      if(rows.length === 0) {
        res.send({callback : 200})
      } else {
        res.send({callback : 202})
      }
    })
  }
};
