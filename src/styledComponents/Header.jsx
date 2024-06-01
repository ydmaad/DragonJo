import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: 80px;
  padding: 0px 20px;
  background-image: linear-gradient(to top, #ffffff, #cccccc);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  align-items: center;
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
`;
