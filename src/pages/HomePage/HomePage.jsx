import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import no_img from '../../assets/no_img.jpg';
import { likePost } from '../../redux/slices/postSlice';
import { supabase } from '../../service/supabase';
import {
  LikeButton,
  NoSearchResults,
  PostContent,
  PostImage,
  PostItem,
  PostList,
  PostTitle,
  ReturnAllResult,
  SearchBtn,
  SearchInput,
  SwiperContainer,
  UserName
} from './HomePage.styles';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

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

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error);
      return;
    }

    if (user) {
      dispatch(likePost({ userId: user.id, postId }));
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('이미지 가져오기 에러:', error);
      } else {
        const filteredData = data.filter((item) => item.images && item.images.length > 0);

        const sortedImages = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const topImages = sortedImages.slice(0, 5);
        setImages(topImages.map((item) => item.images));
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    setSearchPost(posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  }, [posts]);

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
          <Swiper
            {...params}
            navigation={true}
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                <img src={image} alt={`slide`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      )}
      <PostList>
        {searchPost.length > 0 ? (
          searchPost.map((post) => (
            <PostItem
              key={post.id}
              onClick={() => {
                navigate(`detail/${post.id}`);
              }}
            >
              <div className="post-img">
                <PostImage src={post.images || no_img} />
              </div>
              <PostTitle>{post.title}</PostTitle>
              <br />

              <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
              <br />
              <div className="like-button-container">
                <LikeButton data-id={post.id} onClick={(e) => handleLike(e, post.id)}>
                  👍 {post.likes}
                </LikeButton>
                <UserName>
                  <p>{post.name || 'unknow'}</p>
                </UserName>
              </div>
            </PostItem>
          ))
        ) : (
          <NoSearchResults>
            <h3>검색결과가 없습니다.</h3>
            <ReturnAllResult
              onClick={() => {
                setSearchPost(posts);
              }}
            >
              전체 보기
            </ReturnAllResult>
          </NoSearchResults>
        )}
      </PostList>
    </main>
  );
}

export default HomePage;
//푸시를 다시 해보잣
