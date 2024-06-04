import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import postImg from '../../assets/diablo.jpg';
import { fetchPosts } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import {
  PostContent,
  PostImage,
  PostItem,
  PostList,
  PostTitle,
  SearchBtn,
  SearchInput,
  SwiperContainer
} from './HomePage.styles';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  //   useEffect(() => {
  //     const getUserData = async () => {

  // const { data: { user } } = await supabase.auth.getUser(jwt)
  //       console.log(user);
  //     };
  //     getUserData();
  //     console.log();
  //   }, []);
  // console.log(posts[0].user_id)

  const [search, setSearch] = useState('');
  const [searchPost, setSearchPost] = useState([]);

  const [images, setImages] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) => post.title.includes(search));
    setSearchPost(filteredPosts);
  };

  useEffect(() => {
    setSearchPost(posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  }, [posts]);

  // 슬라이드 추가한 부분
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     // const images = posts.map((post) => post.images);
  //     // setImages(images);
  //     const { data, error } = await posts.from('images').select('*');
  //     console.log(supabase);

  //     if (error) {
  //       console.error('이미지 가져오기 에러:', error);
  //     } else {
  //       setImages(data);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from('images').select('*');

      if (error) {
        console.error('이미지 가져오기 에러:', error);
      } else {
        // 데이터를 updatedAt 기준으로 내림차순 정렬
        const sortedImages = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        // 상위 5개의 이미지만 선택
        const topImages = sortedImages.slice(0, 5);
        setImages(topImages);
      }
    };

    fetchImages();
  }, []);

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
      {images.length > 0 && (
        <SwiperContainer>
          <Swiper {...params} navigation={true} modules={[Navigation, Pagination]} pagination={true}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.url} alt={`slide-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      )}
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
