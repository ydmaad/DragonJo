import styled from 'styled-components';

export const PostContent = styled.div`
  color: black;
  white-space: pre-wrap;
  font-size: 18px;
  margin: 0 25px;
  width: 250px;
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis; */

  /* h1 {
    font-size: 36px;
    font-weight: 900;
  }
  h2 {
    font-size: 32px;
    font-weight: 800;
  }
  h3 {
    font-size: 28px;
    font-weight: 700;
  }
  h4 {
    font-size: 24px;
    font-weight: 600;
  }
  h5 {
    font-size: 20px;
    font-weight: 500;
  }
  h6 {
    font-size: 16px;
    font-weight: 500;
  } */

  img {
    max-width: 100%;
    /* 최소크기 */
    height: auto;
  }

  /* ul,
  ol {
    padding-left: 20px;
  } */
  /* li { 들여쓰기 } */
  /* 글자수 제한, 용량 제한에 따른 css 적용 */

  /* blockquote {
    margin: 10px 0;
    padding-left: 20px;
    border-left: 5px solid #ccc;
  } */
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;
