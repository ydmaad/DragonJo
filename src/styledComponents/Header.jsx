import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  background-image: linear-gradient(to top, #ffffff, #cccccc);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  & .contents {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 1320px;
    margin: 0px auto;
    box-sizing: border-box;
    height: 80px;
    padding: 0px 20px;
    & a {
      display: block;
      width: 80px;
      height: 80px;
    }
    & > .post-login-box {
      display: flex;
      align-items: center;
    }
    & .new-post {
      width: 110px;
      height: 45px;
      margin-right: 50px;
    }
    & .new-post-btn {
      width: 100%;
      height: 100%;
      font-size: 20px;
      background: none;
      border-radius: 5px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
    }
    & .login-btn {
      background: none;
      border: none;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
    }
  }
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
    width: 44px;
    height: 44px;
    display: block;
    cursor: pointer;
  }
  & p {
    font-size: 24px;
    font-weight: bold;
  }
`;
