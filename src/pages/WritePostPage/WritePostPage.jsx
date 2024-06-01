import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/slices/postSlice';
import {
  Wrapper,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Label,
  Input,
  Textarea,
  ButtonContainer,
  Button
} from './WritePostPage.styles';

const WritePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    if (title && content) {
      dispatch(createPost({ title, content }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>게시글 작성</Title>
          <Subtitle>게시글을 작성하고 업로드하세요</Subtitle>
        </Header>
        <Form>
          <Label>게시글 제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>게시글 내용</Label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <ButtonContainer>
            <Button onClick={handleCreatePost}>업로드</Button>
            <Button onClick={() => navigate('/')}>뒤로가기</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default WritePostPage;
