import styled from 'styled-components';

export const PostList = styled.ul`
  list-style-type: none;
  padding: 0px 20px;
  width: 1320px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const PostItem = styled.li`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 15px;
  height: 400px;
  overflow: hidden;
  &:hover {
    background-color: #dcdcdc;
  }
  & > .post-img {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  & > .post-img > img {
    width: 100%;
    height: 100%;
    display: block;
  }
  line-height: 1.3;
`;

export const PostTitle = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin: 0 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

export const PostContent = styled.div`
  color: black;
  white-space: pre-wrap;
  margin: 0 25px;
  width: 250px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis;

  img {
    max-width: 100%;
    height: auto;
  }

  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  blockquote {
    margin: 10px 0;
    padding-left: 20px;
    border-left: 5px solid #ccc;
  } */
`;

export const Button = styled.button`
  margin: 10px 0px 0px 25px;
  padding: 8px 12px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
`;

export const Section = styled.section`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PostImage = styled.img`
  width: 250px;
  height: 150px;
`;

export const SearchInput = styled.form`
  padding: 0px 20px;
  width: 1320px;
  margin: 20px auto;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  box-sizing: border-box;
`;

export const SearchBtn = styled.button`
  padding: 8px 12px;
  background-color: #2fa93c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #006633;
  }
`;

export const LikeButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ff4757;
  color: white;
  &:hover {
    background-color: #e84118;
  }
`;

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;

  .swiper-container {
    width: 100%;
    height: 300px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    overflow: hidden;
  }

  .swiper-slide img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  .swiper-pagination {
    /* bottom: 10px !important; */
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }
`;
