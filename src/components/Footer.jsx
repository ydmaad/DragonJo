import { Link } from 'react-router-dom';
import logo from '../assets/Dragonlogo3.png';
import githubIcon from '../assets/github.png';
import nabc from '../assets/nabc.png';
import notion from '../assets/notion.png';
import * as S from '../styledComponents/Footer';

function Footer() {
  return (
    <S.Footer>
      <div className="contents">
        <S.FooterTeamInfo>
          <S.FlexBox>
            <Link to={'/'}>
              <img src={logo} alt="DragonLogo" />
            </Link>
          </S.FlexBox>
          <S.FlexBox>
            <div>
              <img className="nabc-icon" src={nabc} alt="spartaIcon" />
            </div>
            <p>내일배움캠프 용4조 (A04)</p>
          </S.FlexBox>
          <S.FlexBox>
            <div>
              <Link to={'https://github.com/ydmaad/DragonJo'} target="_blank">
                <img className="github-icon" src={githubIcon} alt="githubIcon" />
              </Link>
            </div>
            <div>
              <Link to={'https://teamsparta.notion.site/A04-14dc580d21244e7bbb1e579e45711ba9'} target="_blank">
                <img className="notion-icon" src={notion} alt="notionIcon" />
              </Link>
            </div>
          </S.FlexBox>
        </S.FooterTeamInfo>
        <S.FooterSpartaInfo>
          <p>팀스파르타(주) 사업자 정보</p>
          <ul>
            <li>대표자:이범규|</li>
            <li>사업자 등록번호:783-86-01715|</li>
            <li>통신판매업 신고번호:2020-서울강남-02300|</li>
            <li>평생교육시설 신고번호:제661호</li>
          </ul>
          <address>주소:서울특별시 강남구 테헤란노44길 8 12층 | 이메일:contact@teamsparta.co|전화:1522-8016</address>
          <div>Copyright © 2024 TEAMSPARTA. All rights reserved.</div>
        </S.FooterSpartaInfo>
      </div>
    </S.Footer>
  );
}

export default Footer;
