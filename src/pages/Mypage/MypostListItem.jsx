import React from 'react';
import diablo from '../../assets/diablo.jpg';
import comments from '../../assets/comments.png';
import ddabong from '../../assets/ddabong.png';
import star from '../../assets/star.png';
import * as S from '../../styledComponents/Mypost';

const MypostListItem = () => {
  return (
    <S.MypostListItem>
      <div className="mypost-img">
        <img src={diablo} alt="diablo4" />
      </div>
      <div className="mypost-content">
        <h3>title</h3>
        <S.StarBox>
          <li>
            <img src={star} alt="star" />
          </li>
          <li>
            <img src={star} alt="star" />
          </li>
          <li>
            <img src={star} alt="star" />
          </li>
        </S.StarBox>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has beenLorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem Ipsum has beenLorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has beenLorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been
        </p>
        <div className="showDetailBtn-box">
          <button>자세히 보기</button>
          <S.CommentsIconBox className="comments-box">
            <div>
              <img src={comments} alt="commentsIcon" />
              <p>0</p>
            </div>
            <div>
              <img src={ddabong} alt="ddabongIcon" />
              <p>0</p>
            </div>
          </S.CommentsIconBox>
        </div>
      </div>
    </S.MypostListItem>
  );
};

export default MypostListItem;
