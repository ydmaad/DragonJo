import React, { useState } from 'react';
import * as S from '../../styledComponents/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import Mypost from './Mypost';
import { supabase } from '../../service/supabase';
import { useEffect } from 'react';
import { updateUserInfo } from '../../redux/slices/user.slice';

const Mypage = () => {
  const { isLoggedIn, session } = useSelector((state) => state.user.userInfo);

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const checkProfile = () => {
    const { data, error } = supabase.storage.from('avatars').getPublicUrl('profileIcon.png');
    if (error) {
      console.error('error=>', error);
    } else {
      // console.log('data=>', data.publicUrl);
      setProfileUrl(data.publicUrl);
    }
  };
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const dispatch = useDispatch();
  const handleSaveClick = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { user_name: newUsername }
    });
    if (error) {
      console.log('error=>', error);
    } else {
      // console.log('data=', data);
      dispatch(updateUserInfo(data));
      setIsEditing((prev) => !prev);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div>
          <S.MyProfile>
            <div className="profile-photo">
              <S.profileId>
                <div className="profile-box">
                  <img src={profileUrl} alt="profileIcon" />
                </div>
                <div>
                  <h3>{session.user.user_metadata.user_name}님</h3>
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
                        <h3>{session.user.id.split('-').join('').slice(0, 10)}</h3>
                      </div>
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>아이디</S.MypagetdTitle>
                    <S.MypageContents>
                      <div>
                        <h3>{session.user.user_metadata.email}</h3>
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
                      {isEditing ? (
                        <div>
                          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                          <div className="user-confirm">
                            <button onClick={handleSaveClick}>확인</button>
                            <button className="cancel-btn" onClick={handleEditToggle}>
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3>{session.user.user_metadata.user_name}</h3>
                          <button onClick={handleEditToggle}>변경</button>
                        </div>
                      )}
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
