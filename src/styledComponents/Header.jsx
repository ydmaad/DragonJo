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

    & .post-login-box {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    & .auth-div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    & .auth-div > a {
      text-decoration: none;
      font-size: 14px;
      background: none;
      border: 2px solid gray;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;

      &:visited {
        color: black;
      }
    }
    & .new-post-btn {
      font-size: 20px;
      background: none;
      border-radius: 5px;
      text-align: center;
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
