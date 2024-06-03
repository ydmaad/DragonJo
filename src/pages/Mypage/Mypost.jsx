import * as S from '../../styledComponents/Mypost';
import MypostListItem from './MypostListItem';
const Mypost = () => {
  return (
    <>
      <S.MypostBox>
        <S.Mypost>
          <ul>
            <li>내게시글</li>
            <li>팔로워</li>
            <li>찜목록</li>
          </ul>
        </S.Mypost>
        <S.MypostListBox>
          <MypostListItem />
          <MypostListItem />
          <MypostListItem />
          <MypostListItem />
          <MypostListItem />
          <MypostListItem />
        </S.MypostListBox>
      </S.MypostBox>
    </>
  );
};

export default Mypost;
