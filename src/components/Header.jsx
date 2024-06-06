import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Dragonlogo3.png';
import backIcon from '../assets/back.png';
import { clearUser } from '../redux/slices/user.slice';
import { supabase } from '../service/supabase';
import { logOutUser } from '../service/user';
import * as S from '../styledComponents/Header';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.user.userInfo);
  // console.log('HEADER user', user);

  const path = location.pathname.split('/');
  const [profileUrl, setProfileUrl] = useState('');

  // const fileInputRef = useRef(null);

  function checkProfile() {
    const { data } = supabase.storage.from('avatars').getPublicUrl('avatar_1717215361574.png');
    setProfileUrl(data.publicUrl);
  }

  // async function handleFileInputChange(files) {
  //   const [file] = files;

  //   if (!file) {
  //     return;
  //   }

  //   const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

  //   setProfileUrl(`https://yzkoayeawivyvwgpnzvu.supabase.co/storage/v1/object/public/avatars/${data.path}`);
  // }

  useEffect(() => {
    checkProfile();
  }, []);

  const logOutHandler = () => {
    logOutUser();
    dispatch(clearUser());
    navigate('/', { replace: true });
  };

  return (
    <>
      <S.Header>
        <div className="contents">
          <Link to={'/'}>
            <img src={logo} alt="DragonLOGO" />
          </Link>

          <div className="post-login-box">
            <Link className="new-post-btn" to="/write">
              <S.NewPostBtn>새 게시글</S.NewPostBtn>
            </Link>

            <div className="auth-div">
              {isLoggedIn && <p>{user.name}</p>}
              {isLoggedIn ? (
                <>
                  <Link onClick={logOutHandler}>로그아웃</Link>

                  <S.ProfileImage
                    src={user.avatar_url || 'http://via.placeholder.com/640x240'}
                    alt="profile"
                    onClick={() => {
                      navigate('mypage');
                    }}
                  />
                </>
              ) : (
                <Link className="new-post-btn" to="/auth">
                  로그인
                </Link>
              )}
            </div>
            {/* 프로필 이미지 추가 부분
            <input
              onChange={(e) => handleFileInputChange(e.target.files)}
              type="file"
              ref={fileInputRef}
              className="hidden"
            /> */}
          </div>
        </div>
      </S.Header>
      {path[1] === '' ? null : (
        <S.Nav>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={backIcon} alt="Backward" />
          </div>
          <div>
            <p>
              {(() => {
                switch (path[1]) {
                  case 'auth':
                    return '로그인';
                  case 'mypage':
                    return '내 정보';
                  case 'detail':
                    return '상세페이지';
                  case 'write':
                    return '게시글 업로드';
                  case 'edit':
                    return '게시글 수정';
                  default:
                    return '';
                }
              })()}
            </p>
          </div>
        </S.Nav>
      )}
    </>
  );
}

export default Header;
