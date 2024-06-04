import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/slices/postSlice';
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

const font = Quill.import('attributors/style/font');
font.whitelist = ['asap', 'podkova'];
Quill.register(font, true);

const WritePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const quillRef = useRef(null);

  const handleCreatePost = () => {
    if (title && content) {
      dispatch(createPost({ title, content }));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const quill = quillRef.current.getEditor();
    const cursorPosition = quill.getSelection().index;
    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0];
      uploadImage(file, cursorPosition);
    }
  };

  const handlePaste = (event) => {
    const quill = quillRef.current.getEditor();
    const cursorPosition = quill.getSelection().index;
    const clipboard = event.clipboardData;
    const items = clipboard.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        uploadImage(file, cursorPosition);
      }
    }
  };

  const uploadImage = async (file, cursorPosition) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.url;

      const quill = quillRef.current.getEditor();
      quill.insertEmbed(cursorPosition, 'image', imageUrl);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('이미지 업로드에 실패했습니다.');
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
    const quill = quillRef.current.getEditor();

    quill.root.addEventListener('drop', handleDrop, false);
    quill.root.addEventListener('paste', handlePaste, false);

    return () => {
      quill.root.removeEventListener('drop', handleDrop);
      quill.root.removeEventListener('paste', handlePaste);
    };
  }, []);

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
          <StyledReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
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
