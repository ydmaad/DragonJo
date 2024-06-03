import React from 'react';
import * as S from '../../styledComponents/MyProfile';
import profileIcon from '../../assets/profileIcon.png';
import { useSelector } from 'react-redux';
import Mypost from './Mypost';

const Mypage = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user.userInfo);

  return (
    <>
      {isLoggedIn ? (
        <div>
          <S.MyProfile>
            <div className="profile-photo">
              <S.profileId>
                <div className="profile-box">
                  <img src={profileIcon} alt="profileIcon" />
                </div>
                <div>
                  <h3>{user.username}님</h3>
                  <p>환영합니다!</p>
                </div>
              </S.profileId>
            </div>
            <div className="profile-info">
              <h3 className="profile-title">회원정보</h3>
              <h3 className="profile-subtitle">회원정보 설정</h3>
              <S.Mypagetable>
                <tbody>
                  <tr>
                    <S.MypagetdTitle>회원번호</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <h3>{user.id.split('-').join('').slice(0, 10)}</h3>
                      </div>
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>아이디</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <h3>{user.email}</h3>
                      </div>
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>비밀번호</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <h3>pass******</h3>
                        <button>변경</button>
                      </div>
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>닉네임</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <h3>{user.username}</h3>
                        <button>변경</button>
                      </div>
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>탈퇴신청</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <button>탈퇴</button>
                      </div>
                    </S.MypageContents>
                  </tr>
                </tbody>
              </S.Mypagetable>
            </div>
          </S.MyProfile>
          <Mypost />
        </div>
      ) : (
        <S.UnloginNotice>로그인이후 사용가능합니다.</S.UnloginNotice>
      )}
    </>
  );
};

export default Mypage;
