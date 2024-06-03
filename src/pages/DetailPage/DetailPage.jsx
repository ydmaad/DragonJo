import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, updatePost } from '../../redux/slices/postSlice';
import { Wrapper, Container, Header, Title, Content, Form, ButtonContainer, Button } from './DetailPage.styles';

const DetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    } else {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [dispatch, post]);

  const handleUpdatePost = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }));
      navigate(`/edit/${id}`);
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Form>
          <Content dangerouslySetInnerHTML={{ __html: post.content }}></Content>
          <ButtonContainer>
            <Button onClick={handleUpdatePost}>수정</Button>
            <Button onClick={() => navigate('/')}>돌아가기</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default DetailPage;
