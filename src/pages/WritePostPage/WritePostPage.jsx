import { useRef, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import {
  Button,
  ButtonContainer,
  Container,
  // Subtitle,
  Form,
  Header,
  Input,
  Label,
  StyledReactQuill,
  Title,
  Wrapper
} from './WritePostPage.styles';

const ImageBlot = Quill.import('formats/image');
ImageBlot.className = 'custom-image';
Quill.register(ImageBlot, true);

const WritePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user.userInfo);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [previewImageURL, setPreviewImageURL] = useState(null);

  const quillRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleCreatePost = (e) => {
    if (title && content) {
      dispatch(createPost({ title, content, imageURL: imageURL, name: user.name }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
      e.preventDefault();
    }
  };

  const handleGoBack = (e) => {
    const confirmGoBack = window.confirm('변경 사항이 저장되지 않을 수 있습니다. 페이지를 나가시겠습니까?');
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

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>썸네일 이미지 미리보기</Title>
          <br />
          {previewImageURL && (
            <img src={previewImageURL} alt="Preview" style={{ maxWidth: '500px', maxHeight: '300px' }} />
          )}
        </Header>
        <Form>
          <Label>게시글 제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>게시글 내용</Label>
          <StyledReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
          <ButtonContainer>
            <Button
              onClick={(e) => {
                handleCreatePost(e);
              }}
            >
              업로드
            </Button>
            <Button onClick={handleImageButtonClick}>썸네일 이미지 업로드</Button>
            <input
              onChange={(e) => handleImageInputChange(e.target.files)}
              type="file"
              ref={imageInputRef}
              style={{ display: 'none' }}
            />
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

export default WritePostPage;
