import styled from 'styled-components';

export const Footer = styled.footer`
  width: 100%;
  background-image: linear-gradient(to bottom, #ffffff, #cccccc);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 10px;
  box-sizing: border-box;
  & .contents {
    width: 1320px;
    margin: 0px auto;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0px 20px 20px 20px;
    box-sizing: border-box;
    gap: 8px;
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
  }
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  & > a {
    width: 64px;
    height: 64px;
    display: block;
  }
  & > a > img {
    width: 100%;
    height: 100%;
    display: block;
  }
  & > .right-margin {
    margin-right: 10px;
  }
  & > p {
    font-size: 18px;
    font-weight: bold;
    margin-top:4px;
    margin-left:5px;
  }
`;
export const FooterTeamInfo = styled(FlexBox)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 5px;
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
    gap: 10px;
    font-size: 18px;
    font-weight: light;
    gap: 8px;
    margin: 20px 0px;
  }
  & .copyright {
    margin-top: 10px;
    font-weight: bold;
  }
`;
