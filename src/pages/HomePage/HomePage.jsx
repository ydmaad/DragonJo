// import { supabase } from '../../service/supabase';
// import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postImg from '../../assets/diablo.jpg';
import { fetchPosts } from '../../redux/slices/postSlice';

import { PostContent, PostImage, PostItem, PostList, PostTitle, SearchBtn, SearchInput } from './HomePage.styles';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // const [signIn, setSignIn] = useState(false);

  // async function checkSignIn() {
  //   const session = await supabase.auth.getSession();
  //   const isSignIn = !!session.data.session;

  //   setSignIn(isSignIn);
  // }

  // async function signInWithGithub() {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'github'
  //   });
  // }

  // async function signOut() {
  //   await supabase.auth.signOut();
  //   checkSignIn();
  // }

  // useEffect(() => {
  //   checkSignIn();
  // }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <SearchInput>
        <input type="text" placeholder="검색하시오" />
        <SearchBtn>검색</SearchBtn>
      </SearchInput>

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
            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
            <br />
          </PostItem>
        ))}
      </PostList>
    </main>
  );
}

export default HomePage;
