import React,{useState, useEffect} from 'react';
import "../css/font.css";
import styled, {keyframes} from 'styled-components'
import Social from '../component/Social';
import { Button } from '@mui/material';
import Nav from '../component/Nav'
import IDCard from '../component/IDCard';
// import instance from '../component/instance'
import axios from 'axios'

const ani = keyframes`
    0% {
        top: 50%;
    }
    100% {
        top : 33%;
    }
`
const unani = keyframes`
    0%{
        top: 33%;
    }
    100% {
        top: 50%;
    }
`
const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    &.active {
        animation: ${ani} 0.5s cubic-bezier(0.51, 0.03, 0.26, 0.49) forwards;
    }
    &.passive {
        animation: ${unani} 0.5s cubic-bezier(0.51, 0.03, 0.26, 0.49) forwards;
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
        width: 150px;
        text-transform: none;
        background-color: #039be5;
    }
    .started:hover {
        background-color: #006db3;
    }
`;
function Home() {
    const [ $Nav, $SetNav ] = useState('init');

    const StartedCnClick = () => {
        if ($Nav !== 'active') {
            $SetNav('active')
        } else if ($Nav === 'active') {
            $SetNav('passive')
        }
    }
    const [radio, SetRadio] = useState({selectedValue : "AboutMe"});
    const onChange = (e) => {
        const {value} = e.target;
        SetRadio({...radio, selectedValue : value})
    }
    return (
        <main>
            <LeftContainer className={$Nav}>
                <div>
                    <h1><strong>안녕하세요.</strong><br/>
                        오늘보다 나은 내일을 위해<br/>
                        노력하는 <strong>최태호</strong>입니다.
                    </h1>
                    <div className='subTxt'>Effort never betrays</div>
                    <Social />
                    <Button variant='contained' className='started' onClick={()=> StartedCnClick()}>Get Started</Button>
                </div>
            </LeftContainer>
            <Nav radio={radio} onChange={onChange} $Nav={$Nav}></Nav>
            <IDCard></IDCard>
        </main>
    );
}

export default React.memo(Home);