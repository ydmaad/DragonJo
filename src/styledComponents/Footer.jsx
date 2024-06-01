import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;
  background-image: linear-gradient(to bottom, #ffffff, #cccccc);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  & .nabc-icon {
    display: block;
    width: 44px;
  }
  & .github-icon {
    width: 48px;
    display: block;
    cursor: pointer;
  }
  & .notion-icon {
    width: 35px;
    display: block;
    cursor: pointer;
  }
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;
export const FooterTeamInfo = styled(FlexBox)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const FooterSpartaInfo = styled.div`
  gap: 6px;
  & > p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & ul {
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    font-weight: light;
  }
  & address {
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: light;
  }
`;
