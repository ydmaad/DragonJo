import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Dragonlogo3.png';
import * as S from '../styledComponents/Header';
import backIcon from '../assets/back.png';
function Header() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const navigate = useNavigate();
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
              <button className="new-post-btn">새 게시글</button>
            </div>

            <button className="login-btn">로그인</button>
          </div>
        </div>
      </S.Header>
      {path === '' ? null : (
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
                switch (path) {
                  case 'auth':
                    return '로그인';
                  case 'mypage':
                    return '내 정보';
                  case 'detail':
                    return '상세페이지';
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
