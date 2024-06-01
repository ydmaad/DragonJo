import styled from 'styled-components';

const FooterFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;

  background-image: linear-gradient(to bottom, #ffffff, #cccccc);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const FlexBox = styled.div`
  display: flex;
  font-size: 12px;
`;
const FooterTeamInfo = styled(FlexBox)`
  gap: 16px;
`;

const FooterSpartaInfo = styled(FlexBox)`
  flex-direction: column;
  gap: 6px;
`;

function Footer() {
  return (
    <FooterFooter>
      <FooterTeamInfo>
        <div>Logo</div>
        <FlexBox>
          <div>Logo2</div>
          <p>내일배움캠프 용4조(A04)</p>
        </FlexBox>
        <FlexBox>
          <div>Github</div>
          <div>Notion</div>
        </FlexBox>
      </FooterTeamInfo>
      <FooterSpartaInfo>
        <div>팀스파르타(주) 사업자 정보</div>
        <div>
          <div>
            대표자:이범규|사업자 등록번호:783-86-01715|통신판매업 신고번호:2020-서울강남-02300|평생교육시설
            신고번호:제661호
          </div>
          <div>주소:서울특별시 강남구 테헤란노44길 8 12층 | 이메일:contact@teamsparta.co|전화:1522-8016</div>
        </div>
        <div>Copyright © 2024 TEAMSPARTA. All rights reserved.</div>
      </FooterSpartaInfo>
    </FooterFooter>
  );
}

export default Footer;
