import noimg from '../../assets/no_img.jpg';
import comments from '../../assets/comments.png';
import ddabong from '../../assets/ddabong.png';
import * as S from '../../styledComponents/Mypost';
import { useNavigate } from 'react-router-dom';
import { PostContent } from '../HomePage/HomePage.styles';

const MypostListItem = (props) => {
  const navigate = useNavigate();
  return (
    <S.MypostListItem
      onClick={() => {
        navigate(`/detail/${props.contentsId}`);
      }}
    >
      <div className="mypost-img">
        <img src={props.image ? props.image : noimg} alt="mainImage" />
      </div>
      <div className="mypost-content">
        <h3>{props.title}</h3>
        <PostContent dangerouslySetInnerHTML={{ __html: props.content }}></PostContent>
      </div>
      <div className="showDetailBtn-box">
        <S.CommentsIconBox className="comments-box">
          <div>
            <img src={comments} alt="commentsIcon" />
            <p style={{marginTop:'3px'}}>0</p>
          </div>
          <div>
            <img src={ddabong} style={{height:'24px'}} alt="ddabongIcon" />
            <p style={{marginTop:'3px'}}>0</p>
          </div>
        </S.CommentsIconBox>
      </div>
    </S.MypostListItem>
  );
};

export default MypostListItem;
