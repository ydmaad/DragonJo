import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePost } from '../../redux/slices/postSlice';
import {
  Container,
  Header,
  Title,
  // Subtitle,
  Form,
  // Label,
  // Input,
  // Textarea,
  PostContent,
  ButtonContainer,
  Button
} from './DetailPage.styles';
// import { supabase } from '../../service/supabase';

const DetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  // console.log(ref.current.append(dangerouslySetInnerHTML={{ __html: content }}));

  const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  console.log(post.content);

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

  // const handleDeletePost = () => {
  //   const confirmDelete = window.confirm('정말 이 글을 삭제하시겠습니까?');
  //   if (confirmDelete) {
  //     dispatch(deletePost(postId));
  //     navigate('/');
  //   }
  // };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {/* <Subtitle>게시글을 수정하고 업로드하세요</Subtitle> */}
      </Header>
      <Form ref={ref}>
        {/* <Label>게시글 제목</Label> */}
        {/* <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> */}
        {/* <Label>게시글 내용</Label> */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {/* {content} */}
        {/* <div><img src={이미지경로} />{content}</div> */} 여기 수정
        {/* <Textarea value={content} onChange={(e) => setContent(e.target.value)} /> */}
        <ButtonContainer>
          <Button onClick={handleUpdatePost}>수정</Button>
          <Button onClick={() => navigate('/')}>돌아가기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default DetailPage;
