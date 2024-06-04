import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
} from './WritePostPage.styles';

const ImageBlot = Quill.import('formats/image');
ImageBlot.className = 'custom-image';
Quill.register(ImageBlot, true);

const WritePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const [previewImageURL, setPreviewImageURL] = useState(null);

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCreatePost = () => {
    if (title && content) {
      dispatch(createPost({ title, content, imageURL: profileURL }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      setPreviewImageURL(null);
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreviewImageURL(previewURL);

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);
    const imageURL = `https://supabase.com/dashboard/project/dkodekduyiphnphkezzv/storage/buckets/avatars/${data.path}`;
    setProfileURL(imageURL);
  }

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
        {previewImageURL && <img src={previewImageURL} alt="Preview" style={{ maxWidth: '200px' }} />}
        <Header>
          <Title>게시글 작성</Title>
          <Subtitle>게시글을 작성하고 업로드하세요</Subtitle>
        </Header>
        <Form>
          <Label>게시글 제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <Label>게시글 내용</Label>
          <StyledReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
          <ButtonContainer>
            <Button onClick={handleCreatePost}>업로드</Button>
            <input
              onChange={(e) => handleFileInputChange(e.target.files)}
              type="file"
              ref={fileInputRef}
              className="hidden"
            />
            <Button onClick={() => navigate('/')}>뒤로가기</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default WritePostPage;
