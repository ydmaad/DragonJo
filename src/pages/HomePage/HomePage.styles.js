import styled from 'styled-components';

export const PostList = styled.ul`
  list-style-type: none;
  padding: 20px;
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
`;

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

export const Button = styled.button`
  margin: 10px 0px 0px 25px;
  padding: 8px 12px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #6666;
  }
`;

export const Section = styled.section`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PostImage = styled.img`
  width: 250px;
  height: 150px;
  margin: 25px;
`;
