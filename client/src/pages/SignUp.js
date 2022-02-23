import React, {useState} from 'react';
import {TextField,InputAdornment} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

function SignUp() {
  const [inputs, setInputs] = useState({
    id : '',
    nickname : '',
    pwd : ''
  })
  const {id, nickname, pwd} = inputs;

  const [error, setError] = useState(false);
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });

    if (name === 'id') {
      axios.post('/user/checkid', {user_id : value}).then((res)=>{
        // 중복 id 체크
        console.log(res.data)
        if (res.data.callback === 202) {
          setError(true)
          console.log(error)
        } else {
          setError(false)
        }
      })
    }
  };

  const onClick = (e) => {
    axios.post('/user/signup', inputs).then((res)=> {
      console.log(res.data)
    })
  }
  return (
    <div>
      <div>회원가입</div>
      <Container maxWidth="sm" sx={{display:'flex', justifyContent:'center'}}>
        <Box sx={{width:'25ch'}}>
          <Stack spacing={2} direction="column">
            <TextField
              error={error}
              id="input-with-icon-textfield"
              label={error ? "중복된 아이디입니다" : "ID"}
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
              label="NICKNAME"
              value={nickname}
              name="nickname"
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
            <TextField
              id="input-with-icon-textfield"
              label="PASSWORD"
              value={pwd}
              name="pwd"
              onChange={onChange}
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button variant="contained" onClick={onClick}>회원가입</Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;