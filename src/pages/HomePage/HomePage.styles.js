import styled from 'styled-components';

export const PostList = styled.ul`
  list-style-type: none;
  padding: 20px;
  width: 1320px;
  margin: 0 auto 0 0;
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
    background-color: #dcdcdc;
  }

  line-height: 1.3;
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

export const PostContent = styled.div`
  color: black;
  white-space: pre-wrap;
  font-size: 18px;
  margin: 0 25px;
  width: 250px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  blockquote {
    margin: 10px 0;
    padding-left: 20px;
    border-left: 5px solid #ccc;
  }
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
    background-color: #dcdcdc;
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

export const SearchInput = styled.form`
  padding: 20px;
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const SearchBtn = styled.button`
  padding: 8px 12px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #006633;
  }
`;
