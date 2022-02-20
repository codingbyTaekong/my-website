import React from 'react';
import Profile from '../img/profile.jpg'
import mbti from '../img/mbti.png'
import '../css/IDCard.css'

function IDCard() {
  return (
    <>
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
      <div className='MBTICard cardContainer'>
        <h1>ENTP</h1>
        <div className='MBTI_Img'></div>
        <p>
          <b>성향 : </b> 다양한 사람들과 교류하는 것을 좋아하며,
          논리적인 순서에 따른 업무처리를 좋아합니다.
        </p>
      </div>
      <div className='reason cardContainer'>
        <h1>개발자가 된 이유?</h1>
        <div className='desContainer'>
          <span>></span>
          <p className='txt'>사회초년생 시절,<br/>
              우연히 접하게 된 누군가의 개발하는 모습을 보며,<br/>
              "나도 하고 싶다"라는 것을 느꼈습니다.<br/>
              며칠을 고민했던 것 같습니다. 경제적 어려움, 실패에 대한 두려움.<br/>
              하지만 이미 실패를 몇 번이고 겪어왔기에, 그리고 극복해냈기에.<br/>
              더 늦기 전에 이 직업을 선택해야된다는 운명적인 확신이 있었던 것 같습니다.
          </p>
        </div>
      </div>
      <div className='goal cardContainer'>
        <h1>목표 및 다짐</h1>
        <div className='desContainer'>
          <span>></span>
          <p className='txt'>
            특정 언어에 종속되어 있는 개발자가 아닌 상황에 따라 유기적으로 언어를 선택할 수 있는 개발자가 되고 싶습니다. 그러기 위해서 기본기가 가장 중요한 것 같습니다.<br/>
            오늘보다 나은 내일을 위해 배움을 끊임없이 갈구하고, 사용자에게 좋은 경험을 전달하기 위해 노력하고 있습니다.
          </p>
        </div>
      </div>
    </>
  );
}

export default IDCard;