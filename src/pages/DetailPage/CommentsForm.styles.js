import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
`;

export const Textarea = styled.textarea`
  resize: none;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 50px;
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0b453a;
  }
`;

export const CommentContainer = styled.div`
  margin-top: 20px;
  width: 700px;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const CommentAuthor = styled.p`
  margin: 0;
  font-weight: bold;
  color: #333;
`;

export const CommentContent = styled.p`
  margin: 5px 0;
  color: #555;
`;

export const CommentDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

export const DeleteButton = styled.button`
  align-self: flex-end;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
