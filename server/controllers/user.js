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
          console.log(encryptedPassoword);

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
            // ! 수정할 것

            res.cookie("accessToken", accessToken);
            res.cookie("refreshToken", refreshToken);
            res.send("success");
          });
        });
      } else {
        // 이미 가입되어 있는 경우
        res.send({ callback: 202, err: "This ID is already registered" });
      }
    });
  },
  // id중복체크용 함수
  varify_user: async (req, res) => {
    const {
      body: { user_id },
    } = req;

    const select_sql = `
        select * from user_table where user_id = '${user_id}'
    `;
    conn.query(select_sql, async (err, rows) => {
      if (rows.length === 0) {
        res.send({ callback: 200 });
      } else {
        res.send({ callback: 202 });
      }
    });
  },
  // 로그인 처리
  login: async (req, res) => {
    const {
      body: { id, pwd },
    } = req;

    let nickname;
    let rule;
    let authHeader = req.headers['authorization'];
    if (authHeader) {
      console.log(authHeader);
    }


    const select_sql = `
        select * from user_table where user_id = '${id}'
    `;
    // id체크
    conn.query(select_sql, async (err, rows) => {
      if (err) {
        console.log(err);
        return res.send({ callback: 500, err: err });
      }
      if (rows.length === 0) {
        return res.send({ callback: 404, err: "존재하지 않는 아이디입니다." });
      } else {
        nickname = rows[0].user_nickname;
        rule = rows[0].rule;
        // 암호화된 비밀번호
        const encodedPassword = rows[0].user_pwd;
        // console.log(encodedPassword)
        bcrypt.compare(pwd, encodedPassword, (err, same) => {
          if (err) console.log(err);
          // async callback
          if (same) {
            // 기존에 로그인한 계정인지
            if (req.cookies.refreshToken) {
              console.log("토큰있음");
              // 토큰있으면 db에 있는 토큰과 비교 후 같으면 access토큰 발금
              if (rows[0].token === req.cookies.refreshToken) {
                //accessToken 발행
                const accessToken = jwt.sign(
                  { id, nickname },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                    issuer: "bigchoi",
                  }
                );
                console.log(`엑세스 토큰 :::::${accessToken}`)
                return res.send({ accessToken: accessToken, rule: rule });
              } else {
                // 잘못된 접근
              }
            } else {
              console.log("토큰 없음");
              // 토큰이 없으면 refreshToken 생성
              const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
                expiresIn: "14d",
                issuer: "bigchoi",
              });
              const update_sql = `
                update user_table set token='${refreshToken}' where user_id='${id}'
              `;
              conn.query(update_sql, (err, rows) => {
                if (err) {
                  console.log("에러발생")
                  return res.send({ callback: 500, err: err });
                }
                // 업데이트하고 난 뒤에 엑세스 토큰 발급 후 쿠키 등록하고 엑세스토큰 리턴
                const accessToken = jwt.sign(
                  { id, nickname },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                    issuer: "bigchoi",
                  }
                );
                console.log(`리프레쉬 토큰 :::::${refreshToken}`)
                console.log(`엑세스 토큰 :::::${accessToken}`)
                res.cookie("refreshToken", refreshToken);
                
                res.send({ accessToken: accessToken, rule : rule });
              });
            }
          } else {
            res.send({ msg: "비밀번호가 다릅니다!" });
          }
        });
      }
    });
  },
};
