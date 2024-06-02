import styled from 'styled-components';

// 전체 게시물 리스트
export const PostList = styled.ul`
  /* background-color: green; */
  list-style-type: none;
  padding: 20px;
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
`;

// 각각의 게시물
export const PostItem = styled.li`
  cursor: pointer;

  border: 1px solid black;
  margin: auto;
  margin-bottom: 30px;
  border-radius: 7px;
  width: 300px;
  height: 400px;

  &:hover {
    background-color: #6666;
  }
`;

// 게시물 타이틀
export const PostTitle = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin: 0 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

// 게시물 내용
export const PostContent = styled.p`
  color: black;
  white-space: pre-wrap;
  font-size: 18px;
  margin: 0 25px;
  width: 250px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 6;
  text-overflow: ellipsis;
`;

// 게시글 수정 버튼
export const Button = styled.button`
  margin: 10px 0px 0px 25px;
  padding: 8px 12px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// 프로필 이미지
export const ProfileImage = styled.img`
  border-radius: 50%;
  cursor: pointer;
  width: 45px;
  height: 45px;
`;

export const Section = styled.section`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// 게시물 이미지
export const PostImage = styled.img`
  width: 250px;
  height: 150px;
  margin: 25px;
`;
