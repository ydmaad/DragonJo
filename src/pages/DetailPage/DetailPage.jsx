import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePost } from '../../redux/slices/postSlice';
import { Container, Header, Title, Form, PostContent, ButtonContainer, Button } from './DetailPage.styles';
import { StyledReactQuill } from '../WritePostPage/WritePostPage.styles';

const DetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // console.log(post.content);

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
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Form ref={ref}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {/* {content} */}
        <ButtonContainer>
          <Button onClick={handleUpdatePost}>수정</Button>
          <Button onClick={() => navigate('/')}>돌아가기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default DetailPage;
