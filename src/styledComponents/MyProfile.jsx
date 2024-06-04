import styled from 'styled-components';
import diablo from '../assets/diablo.jpg';
export const MyProfile = styled.div`
  width: 1320px;
  height: 800px;
  margin: 0px auto;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;
  & > .profile-photo {
    width: 400px;
    height: 100%;
    border-radius: 15px 0px 0px 15px;
    margin: 0px auto;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background: url(${diablo}) no-repeat center;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.6;
      border-radius: 15px 0px 0px 15px;
    }
  }
  & > .profile-info {
    width: 880px;
    height: 100%;
    border-radius: 0px 15px 15px 0px;
    background: #095544;
    padding: 80px 100px;
    box-sizing: border-box;
    & > .profile-title {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px solid #fff;
      padding-bottom: 20px;
      box-sizing: border-box;
      margin-bottom: 50px;
    }
    & > .profile-subtitle {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 20px;
    }
  }
`;

export const profileId = styled.div`
  width: 300px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  & > .profile-box {
    width: 200px;
    height: 200px;
    margin: 0px auto;
    overflow: hidden;
    border-radius: 15px;
    & > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  & h3 {
    margin: 50px 0px;
    font-weight: bold;
    font-size: 24px;
  }
  & p {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const Mypagetable = styled.table`
  width: 680px;
  height: 500px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  & tbody {
    border-collapse: collapse;
  }
  & tr {
    height: 100px;
  }
  & td {
  }
`;
export const MypagetdTitle = styled.td`
  width: 185px;
  line-height: 100px;
  background: #007c60;
  border: 1px solid #fff;
  box-sizing: border-box;
  border-left: none;
`;
export const MypageContents = styled.td`
  border: 1px solid #fff;
  box-sizing: border-box;
  border-right: none;
  &>div {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    align-items: center;
    & button {
      font-size: 14px;
      font-weight: bold;
      background: #fff;
      color: red;
      border: none;
      outline: none;
      height: 30px;
      padding:0px 15px;
      box-sizing: border-box;
      border-radius: 5px;
      cursor: pointer;
    }
    & .cancel-btn{
      margin-left:15px;
    }
    & button:active {
      box-shadow: inset 1px 1px 4px #6e6e6e;
    }
    & input {
      width: 50%;
      height: 30px;
      border-radius: 5px;
      outline:none;
      border:none;
      padding-left:10px;
      box-sizing: border-box;
    }
  }
`;
export const UnloginNotice = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;
