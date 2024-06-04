import { useState } from 'react';
import * as S from '../../styledComponents/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import Mypost from './Mypost';
import { adminAuthClient, supabase } from '../../service/supabase';
import { useEffect } from 'react';
import { updateUserInfo, uploadUserAvatar } from '../../redux/slices/user.slice';
import { useRef } from 'react';

const Mypage = () => {
  const { isLoggedIn, session } = useSelector((state) => state.user.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [avatarsURL, setAvatarsURL] = useState('');
  const avatarUploadRef = useRef(null);

  const checkProfile = () => {
    const { data, error } = supabase.storage.from('avatars').getPublicUrl('profileIcon.png');
    if (error) {
      // console.error('error=>', error);
    } else {
      // console.log('data=>', data.publicUrl);
      setProfileUrl(data.publicUrl);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const dispatch = useDispatch();
  const updateUseravatar = async (avatarUrl) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url: avatarUrl }
    });
    if (error) {
      console.log('error', error);
    } else {
      console.log('성공', data);
      dispatch(uploadUserAvatar(data));
      setAvatarsURL(avatarUrl);
    }
  };
  const upLoadAvatarsBtn = async (files) => {
    if (!files || files.length === 0) {
      console.error('No files to upload');
      return;
    }
    const [file] = files;
    if (!file) {
      // alert('업로드할 이미지 파일이 업단다.');
      return;
    }
    const { data, error } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file, {
      cacheControl: '3600',
      upsert: true
    });
    if (error) {
      console.log('error=>', error);
    } else {
      console.log('성공', data);
      const imgURL = `https://dkodekduyiphnphkezzv.supabase.co/storage/v1/object/public/avatars/${data.path}`;
      // dispatch(uploadUserAvatar(avatarURL));
      setAvatarsURL(imgURL);
      await updateUseravatar(imgURL);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  const handleFileInputChange = (e) => {
    upLoadAvatarsBtn(e.target.files);
  };

  const handleUploadButtonClick = () => {
    avatarUploadRef.current.click();
  };

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

  //회원탈퇴 로직임
  const withDrawal = async () => {
    console.log(session.user.id);
    if (confirm('정말로 삭제하겠는가?')) {
      const { data, error } = await adminAuthClient.deleteUser(session.user.id);
      if (error) {
        console.log('error=>', error);
      } else {
        console.log('data=>', data);
      }
    }
    return;
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <S.MyProfile>
            <div className="profile-photo">
              <S.profileId>
                <div className="profile-box">
                  <img src={avatarsURL || session.user.user_metadata?.avatar_url} alt="profileIcon" />
                </div>
                <div className="avatars-upload">
                  <h3>{session.user.user_metadata.user_name}님</h3>
                  <p>환영합니다!</p>
                  <input type="file" ref={avatarUploadRef} onChange={handleFileInputChange} />
                  <button onClick={handleUploadButtonClick}>아바타 업로드</button>
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
                        <button onClick={withDrawal}>탈퇴</button>
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
