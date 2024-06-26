import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Header = styled.header`
  margin-bottom: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  color: #666;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

export const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    font-size: 18px;
    min-height: 400px;
  }

  .ql-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;
