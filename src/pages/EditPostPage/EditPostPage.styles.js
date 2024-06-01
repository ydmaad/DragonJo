import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
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
  width: 100%;
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
