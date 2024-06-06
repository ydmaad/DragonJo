import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  background-image: linear-gradient(to top, #ffffff, #cccccc);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  & .contents {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 1320px;
    margin: 0px auto;
    box-sizing: border-box;
    padding: 0px 20px;

    & > a {
      display: block;
      width: 64px;
      height: 64px;
    }
    & > a > img {
      display: block;
      width: 64px;
      height: 64px;
    }

    & .post-login-box {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    & .auth-div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    & .auth-div > a {
      text-decoration: none;
      font-size: 16px;
      background: none;
      border: 2px solid gray;
      border-radius: 5px;
      padding: 5px 10px;
      box-sizing: border-box;
      font-weight:bold;
      cursor: pointer;

      &:visited {
        color: black;
      }
    }
  }
`;

export const NewPostBtn = styled.button`
  font-size: 16px;
  background: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition:0.3s all;
  &:hover{background:#000;color:#fff;}
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 1320px;
  margin: 50px auto;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
  & img {
    width: 28px;
    height: 28px;
    display: block;
    cursor: pointer;
  }
  & p {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  cursor: pointer;
  width: 45px;
  height: 45px;
`;
