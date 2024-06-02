import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import { Button, PostContent, PostItem, PostList, PostTitle, Section, PostImage } from './HomePage.styles';
import postImg from '../../assets/diablo.jpg';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [signIn, setSignIn] = useState(false);

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

  useEffect(() => {
    checkSignIn();
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
          <PostItem
            key={post.id}
            onClick={() => {
              navigate(`detail/${post.id}`);
            }}
          >
            <PostImage src={postImg} />
            <PostTitle>{post.title}</PostTitle>
            <br />
            <PostContent>{post.content}</PostContent>
            <br />
          </PostItem>
        ))}
      </PostList>

      <Section>
        {signIn ? (
          <>
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
