import * as S from '../../styledComponents/MyProfile';
import profileIcon from '../../assets/profileIcon.png';
const Mypage = () => {
  return (
    <>
      <S.MyProfile>
        <div className="profile-photo">
          <S.profileId>
            <div className="profile-box">
              <img src={profileIcon} alt="profileIcon" />
            </div>
            <div>
              <h3>ID rank number</h3>
              <p>Warrior: w21fwenlei4235</p>
            </div>
          </S.profileId>
        </div>
        <div className="profile-info">
          <h3>회원정보</h3>
        </div>
      </S.MyProfile>
    </>
  );
};

export default Mypage;
