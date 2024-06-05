import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import noimg from '../../assets/no_img.jpg';
import { clearUser, updateUserInfo, uploadUserAvatar } from '../../redux/slices/user.slice';
import { supabase } from '../../service/supabase';
import { logOutUser } from '../../service/user';
import * as S from '../../styledComponents/MyProfile';
import Mypost from './Mypost';

const Mypage = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [avatarsURL, setAvatarsURL] = useState('');
  const avatarUploadRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isLoggedIn);
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };
  const updateUseravatar = async (avatarUrl) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url: avatarUrl }
    });
    if (error) {
      console.log('error', error);
    } else {
      // console.log('성공', data);
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
      // console.log('성공', data);
      const imgURL = `https://dkodekduyiphnphkezzv.supabase.co/storage/v1/object/public/avatars/${data.path}`;
      // dispatch(uploadUserAvatar(avatarURL));
      setAvatarsURL(imgURL);
      await updateUseravatar(imgURL);
    }
  };

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
  const resetUserPassword = () => {
    if (confirm('진짜로 변경할겨?')) {
      navigate('/forgot-password');
    }
  };
  const withDrawal = async () => {
    const userId = user.id;
    if (confirm('정말로 삭제하겠는가?')) {
      const { data, error } = await supabase.rpc('delete_user', { user_id: userId });
      if (error) {
        console.log('error=>', error.message);
      } else {
        // console.log('data=>', data);
        await logOutUser();
        dispatch(clearUser());
        navigate('/');
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
                  <img src={avatarsURL || user.avatar_url || noimg} alt="profileIcon" />
                </div>
                <div className="avatars-upload">
                  <h3>{user.name}님</h3>
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
                        <button onClick={resetUserPassword}>변경</button>
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
                          <h3>{user.name}</h3>
                          <button onClick={handleEditToggle}>변경</button>
                        </div>
                      )}
                    </S.MypageContents>
                  </tr>
                  <tr>
                    <S.MypagetdTitle>회원탈퇴</S.MypagetdTitle>
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
