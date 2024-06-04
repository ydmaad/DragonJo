import diablo from '../../assets/diablo.jpg';
import comments from '../../assets/comments.png';
import ddabong from '../../assets/ddabong.png';
import * as S from '../../styledComponents/Mypost';
import { useNavigate } from 'react-router-dom';
const MypostListItem = (props) => {
  const navigate = useNavigate();
  return (
    <S.MypostListItem
      onClick={() => {
        navigate(`/detail/${props.contentsId}`);
      }}
    >
      <div className="mypost-img">
        <img src={diablo} alt="diablo4" />
      </div>
      <div className="mypost-content">
        <h3>{props.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
        <div className="showDetailBtn-box">
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
