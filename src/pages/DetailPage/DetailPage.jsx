import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePost } from '../../redux/slices/postSlice';
import { Container, Header, Title, Form, PostContent, ButtonContainer, Button } from './DetailPage.styles';
import { StyledReactQuill } from '../WritePostPage/WritePostPage.styles';
import Swal from 'sweetalert2';

const DetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId));
  const userId = useSelector((state) => state.user.userInfo.session.user.id);
  console.log(userId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState('');
  console.log(post);

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    } else {
      setTitle(post.title);
      setContent(post.content);
      setWriterId(post.user_id);
    }
  }, [dispatch, post]);

  const handleUpdatePost = () => {
    if (writerId === userId) {
      if (title && content) {
        dispatch(updatePost({ id: postId, title, content }));
        navigate(`/edit/${id}`);
      } else {
        Swal.fire(`제목과 내용을 모두 입력해주세요.`);
      }
    } else {
      Swal.fire({
        icon: `error`,
        title: `권한 없음`,
        text: `수정 권한이 없습니다.`,
        confirmButtonText: `확인`
      });
    }
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Form ref={ref}>
        <PostContent dangerouslySetInnerHTML={{ __html: content }} />
        {/* {content} */}
        <ButtonContainer>
          <Button onClick={handleUpdatePost}>수정</Button>
          {/* {writerId === userId && <Button onClick={handleUpdatePost}>수정</Button>} */}
          <Button onClick={() => navigate('/')}>돌아가기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default DetailPage;
