import React,{useState} from 'react';
import "../css/font.css";
import styled, {css, keyframes} from 'styled-components'
import Social from '../component/Social';
import { Button } from '@mui/material';


// font-family: 'ChosunGu';
function Home() {
    const ani = keyframes`
        0% {
            top: 50%;
        }
        100% {
            top : 20%
        }
    `
    const LeftContainer = styled.div`
        display: flex;
        align-items: center;
        position: fixed;
        height: 100%;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        &.active {
            /* animation: name duration timing-function delay iteration-count direction fill-mode; */
            animation: ${ani} 0.5s cubic-bezier(0.51, 0.03, 0.26, 0.49) forwards;
        }
        > div {
            /* display: flex; */
            /* flex-direction: column; */
        }
        h1 {
            font-family: 'NEXON Lv2 Gothic Light';
            font-weight: normal;
            line-height: 1.35;
        }
        strong:nth-of-type(2) {
            color : #3f3f3f;
        }
        .subTxt {
            width: fit-content;
            color : #969696;
            border-bottom: 1px solid #cfcfcf;
            padding-right: 5px;
            padding-bottom: 3px;
        }
        .subTxt::before {
            content: "🔥";
            margin-right: 5px;
        }
        .started {
            text-transform: none;
        }
    `;

    const [ $Nav, $SetNav ] = useState(null);
    
    return (
        <main>
            <LeftContainer className={$Nav ? 'active' : ''}>
                <div>
                    <h1><strong>안녕하세요.</strong><br/>
                        어제보다 오늘 더 발전하는<br/>
                        Full Stack Developer <strong>최태호</strong>입니다.
                    </h1>
                    <div className='subTxt'>Effort never betrays</div>
                    <Social />
                    <Button variant='contained' className='started' onClick={()=> {$SetNav(!$Nav)}}>Get Started</Button>
                </div>
            </LeftContainer>
        </main>
    );
}

export default React.memo(Home);