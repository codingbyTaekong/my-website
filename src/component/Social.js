import React from "react";
import styled, {css} from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";


const SNSContainer = styled.div`
    display: flex;
    margin: 12px 0 20px  0;
`
const SNSIcon = styled.a`
    ${(props)=> {
        switch (props.$name) {
            case "github":
                return css`
                    color: #24292f;
                    margin-right: 15px;
                    :hover {
                        color : #080b0e
                    }
                `
            case "youtube":
                return css`
                    color: #CC0000;
                    margin-right: 15px;
                    :hover {
                        color: #b80000;
                    }
                `
            case "insta":
                return css`
                    background: #f09433; 
                    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
                    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
                    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
                    color: #fff;
                    padding: 4px;
                    font-size: 12px;
                    border-radius: 8px;
                    :hover {
                        background: #f09433; 
                        background: -moz-linear-gradient(45deg, #ce7f2b 0%, #db5f31 25%, #d3203b 50%, #bb1c5c 75%, #bb1285 100%); 
                        background: -webkit-linear-gradient(45deg, #ce7f2b 0%, #db5f31 25%, #d3203b 50%, #bb1c5c 75%, #bb1285 100%); 
                        background: linear-gradient(45deg, #ce7f2b 0%, #db5f31 25%, #d3203b 50%, #bb1c5c 75%, #bb1285 100%); 
                    }
                `
            default:
                break;
        }
    }}
`
function Social() {
    return (
        <SNSContainer>
            <SNSIcon href="https://github.com/codingbyTaekong" target="_blank" rel="noopener noreferrer" $name="github">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </SNSIcon>
            <SNSIcon href="https://www.youtube.com/channel/UCnL-wgZVVrhGHIKtcZIIJrw" target="_blank" rel="noopener noreferrer" $name="youtube">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </SNSIcon>
            <SNSIcon href="https://github.com/codingbyTaekong" target="_blank" rel="noopener noreferrer" $name="insta">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </SNSIcon>
        </SNSContainer>
  );
}

export default Social;