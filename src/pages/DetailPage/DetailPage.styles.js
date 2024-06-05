import styled from 'styled-components';

export const PostContent = styled.div`
  color: black;
  white-space: pre-wrap;
  font-size: 18px;
  margin: 0 25px;
  width: 250px;

  img {
    max-width: 100%;
    /* 최소크기 */
    height: auto;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
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
  width: 80%;
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
  margin-top: 60px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #2fa93c;
  color: white;
  &:hover {
    background-color: #0b453a;
  }
`;
