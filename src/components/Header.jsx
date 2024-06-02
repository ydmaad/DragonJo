import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Dragonlogo3.png';
import * as S from '../styledComponents/Header';
import backIcon from '../assets/back.png';
import { useEffect, useState } from 'react';
import { supabase } from '../service/supabase';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
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

  console.log(path[1]);
  return (
    <>
      <S.Header>
        <div className="contents">
          <div>
            <h1>
              <Link to={'/'}>
                <img src={logo} alt="DragonLOGO" />
              </Link>
            </h1>
          </div>
          <div className="post-login-box">
            <div className="new-post">
              <button
                className="new-post-btn"
                onClick={() => {
                  navigate('write');
                }}
              >
                새 게시글
              </button>
            </div>
            <button
              className="login-btn"
              onClick={() => {
                navigate('auth');
              }}
            >
              로그인
            </button>
            {/* 프로필 이미지 추가 부분
            <input
              onChange={(e) => handleFileInputChange(e.target.files)}
              type="file"
              ref={fileInputRef}
              className="hidden"
            /> */}
            <S.ProfileImage
              src={profileUrl}
              alt="profile"
              onClick={() => {
                navigate('mypage');
              }}
            />
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
