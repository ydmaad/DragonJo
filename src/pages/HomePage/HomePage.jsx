// import { supabase } from '../../service/supabase';
// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postImg from '../../assets/diablo.jpg';
import { fetchPosts } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Button,
  PostContent,
  PostImage,
  PostItem,
  PostList,
  PostTitle,
  SearchBtn,
  SearchInput,
  SwiperContainer
} from './HomePage.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [search, setSearch] = useState('');
  const [searchPost, setSearchPost] = useState([]);
  // const [signIn, setSignIn] = useState(false);

  const [images, setImages] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) => post.title.includes(search));
    setSearchPost(filteredPosts);
  };

  useEffect(() => {
    setSearchPost(posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  }, [posts]);

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

  // 슬라이드 추가한 부분
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const { data, error } = await supabase.from('images').select('*');

  //     if (error) {
  //       console.error('Error fetching images:', error);
  //     } else {
  //       setImages(data);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  // 슬라이드 추가한 부분
  const params = {
    pagination: {
      clickable: true
    },
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  };

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
      <SearchInput onSubmit={handleSearchChange}>
        <input type="text" placeholder="검색하시오" value={search} onChange={(e) => setSearch(e.target.value)} />
        <SearchBtn>검색</SearchBtn>
      </SearchInput>
      {/* 슬라이드 추가한 부분 */}
      {/* {images.length > 0 && ( */}
      <SwiperContainer>
        <Swiper {...params} navigation={true} modules={Navigation}>
          {[postImg, postImg, postImg, postImg].map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      {/* )} */}
      <PostList>
        {searchPost.map((post) => (
          <PostItem
            key={post.id}
            onClick={() => {
              navigate(`detail/${post.id}`);
            }}
          >
            <div className="post-img">
              <PostImage src={postImg} />
            </div>
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
