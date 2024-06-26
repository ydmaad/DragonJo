import styled from 'styled-components';

export const MypostBox = styled.div`
  width: 1320px;
  margin: 0px auto;
  margin-bottom: 20px;
  padding: 0px 20px;
  box-sizing: border-box;
`;

export const Mypost = styled.nav`
  width: 431px;
  margin-bottom: 50px;
  & > ul {
    display: flex;
    border-bottom: 2px solid #000;
    padding: 0px 20px 10px 20px;
    box-sizing: border-box;
    justify-content: space-between;
  }
`;
export const Menuitem = styled.li`
  color: ${(props) => (props.$active ? '#000' : '#ccc')};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s all;
`;

export const MypostListBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 33px;
`;
export const MypostListItem = styled.li`
  
  box-shadow: 0px 0px 5px #ccc;
  background: #d9d9d9;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  & > .mypost-img {
    width: 100%;
    height: 200px;
    & > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  & > .mypost-content {
    width: 90%;
    margin: 20px auto;
    height: 200px;
    box-sizing: border-box;
    overflow-x: hidden;
    & > h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom:20px;
    }
    & > p {
      height: 120px;
      margin-top: 10px;
      padding-top: 20px;
      box-sizing: border-box;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      &:nth-child(even) {
        margin-top: 5px;
      }
    }
    & > .showDetailBtn-box {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      padding:0px 20px 20px;
      box-sizing: border-box;
      height:100px;
      & > button {
        width: 90px;
        height: 30px;
        outline: none;
        background: #2fa93c;
        color: #fff;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        &:active {
          box-shadow: inset 1px 1px 4px #6e6e6e;
        }
      }
    }
  }
`;

export const CommentsIconBox = styled.div`
  display: flex;
  align-items:center;
  gap: 20px;
  width:calc(100% - 40px);
  margin:0px auto;
  padding-bottom:20px;
  box-sizing: border-box;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    & > img {
      width: 24px;
      height: 20px;
      align-items: center;
    }
  }
`;

export const Notification = styled.div`
  margin: 0px auto;
  font-size: 30px;
  font-weight: bold;
  width: 1280px;
  height: 480px;
`;
