import React from 'react';
import Profile from '../img/profile.jpg'
import '../css/IDCard.css'

function IDCard() {
  return (
    <div className='IDCard'>
      <div className='Profile'>
        <img src={Profile}></img>
      </div>
      <ul>
          <li>이름 : 최태호</li>
          <li>생년월일 : 1993년 7월 29일</li>
          <li>포지션 : Front-End</li>
      </ul>
    </div>
  );
}

export default IDCard;