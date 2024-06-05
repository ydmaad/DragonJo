import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePost } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import {
  Wrapper,
  Container,
  Header,
  Title,
  // Subtitle,
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
  const [imageURL, setImageURL] = useState('');
  const [previewImageURL, setPreviewImageURL] = useState(null);

  const quillRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleUpdatePost = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content, imageURL: imageURL }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const handleDeletePost = (e) => {
    const confirmDelete = confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      dispatch(deletePost(postId));
      navigate('/');
    } else {
      e.preventDefault();
    }
  };

  const handleGoBack = (e) => {
    const confirmGoBack = confirm('변경 사항이 저장되지 않을 수 있습니다. 페이지를 나가시겠습니까?');
    if (confirmGoBack) {
      navigate('/');
    } else {
      e.preventDefault();
    }
  };

  async function handleImageInputChange(files) {
    const [file] = files;

    if (!file) {
      setPreviewImageURL(null);
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreviewImageURL(previewURL);

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);
    const imageURL = `https://dkodekduyiphnphkezzv.supabase.co/storage/v1/object/public/avatars/${data.path}`;
    setImageURL(imageURL);
  }

  const handleImageButtonClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
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
      setImageURL(post.images || '');
      setPreviewImageURL(post.images);
    }
  }, [dispatch, post]);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>썸네일 이미지 미리보기</Title>
          <br />
          {previewImageURL ? (
            <img src={previewImageURL} alt="Preview" style={{ maxWidth: '500px' }} />
          ) : (
            post && post.images && <img src={post.images} style={{ maxWidth: '500px' }} />
          )}
        </Header>
        <Form>
          <Label>게시글 제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>게시글 내용</Label>
          <StyledReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
          <ButtonContainer>
            <Button onClick={handleUpdatePost}>수정</Button>
            <Button onClick={handleImageButtonClick}>썸네일 이미지 업로드</Button>
            <input
              onChange={(e) => handleImageInputChange(e.target.files)}
              type="file"
              ref={imageInputRef}
              style={{ display: 'none' }}
            />
            <Button
              onClick={(e) => {
                handleDeletePost(e);
              }}
              isRed
            >
              삭제
            </Button>
            <Button
              onClick={(e) => {
                handleGoBack(e);
              }}
            >
              뒤로가기
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default EditPostPage;
