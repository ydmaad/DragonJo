import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import { Button, PostContent, PostItem, PostList, PostTitle, ProfileImage, Section } from './HomePage.styles';

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [signIn, setSignIn] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  async function checkSignIn() {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;

    setSignIn(isSignIn);
  }

  async function signOut() {
    await supabase.auth.signOut();
    checkSignIn();
  }

  function checkProfile() {
    const { data } = supabase.storage.from('avatars').getPublicUrl('avatar_1717215361574.png');
    setProfileUrl(data.publicUrl);
  }

  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      return;
    }

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

    setProfileUrl(`https://yzkoayeawivyvwgpnzvu.supabase.co/storage/v1/object/public/avatars/${data.path}`);
  }

  useEffect(() => {
    checkSignIn();
    checkProfile();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <PostList>
        {posts?.map((post) => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <br />
            <PostContent>{post.content}</PostContent>
            <br />
            <Link to={`/edit/${post.id}`}>
              <Button type="button">게시글 수정</Button>
            </Link>
          </PostItem>
        ))}
      </PostList>

      <Section>
        {signIn ? (
          <>
            <input
              onChange={(e) => handleFileInputChange(e.target.files)}
              type="file"
              ref={fileInputRef}
              className="hidden"
            />
            <ProfileImage src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
            <Button onClick={signOut}>로그아웃</Button>
          </>
        ) : (
          <Button onClick={signInWithGithub}>로그인</Button>
        )}
      </Section>
    </main>
  );
}

export default HomePage;
