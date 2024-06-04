import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePost } from '../../redux/slices/postSlice';
import {
  Wrapper,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Label,
  Input,
  StyledReactQuill,
  ButtonContainer,
  Button
} from './EditPostPage.styles';

const EditPostPage = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const quillRef = useRef(null);

  const handleUpdatePost = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const handleDeletePost = () => {
    const confirmDelete = confirm('정말 이 글을 삭제하시겠습니까?');
    if (confirmDelete) {
      dispatch(deletePost(postId));
      navigate('/');
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['underline', 'strike', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['image']
    ]
  };

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    } else {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [dispatch, post]);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>게시글 수정</Title>
          <Subtitle>게시글을 수정하고 업로드하세요</Subtitle>
        </Header>
        <Form>
          <Label>게시글 제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>게시글 내용</Label>
          <StyledReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
          <ButtonContainer>
            <Button onClick={handleUpdatePost}>수정</Button>
            <Button onClick={handleDeletePost}>삭제</Button>
            <Button onClick={() => navigate('/')}>돌아가기</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default EditPostPage;
