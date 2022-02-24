import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";





const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
function Login() {
  const [inputs, setInputs] = useState({
    id: "",
    pwd: "",
  });
  const { id, pwd } = inputs;
  const onClick = (e) => {
    axios
      .post("/user/login", inputs)
      .then(onLoginSuccess)
      .catch((error) => {
        // ... 에러 처리
      });
  };
  const onLoginSuccess = (response) => {
    console.log(response)
    const { accessToken } = response.data;
    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    // 화면 리다이렉션 어드민인 경우 어드민 페이지로 일반 유저일 경우 블로그로 이동
    
    
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
}
  return (
    <div>
      <div>로그인</div>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "25ch" }}>
          <Stack spacing={2} direction="column">
            <TextField
              id="input-with-icon-textfield"
              label="ID"
              value={id}
              name="id"
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              id="input-with-icon-textfield"
              label="PASSWORD"
              value={pwd}
              name="pwd"
              type="password"
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button variant="contained" onClick={onClick}>
              로그인
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
