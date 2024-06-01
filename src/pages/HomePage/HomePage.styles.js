import styled from 'styled-components';

export const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
`;

export const PostItem = styled.li`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const PostContent = styled.p`
  white-space: pre-wrap;
  font-size: 16px;
  margin: 10px 0 0 0;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

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
