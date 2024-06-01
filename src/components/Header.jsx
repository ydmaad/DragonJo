import { Link } from 'react-router-dom';
import logo from '../assets/Dragonlogo3.png';
import * as S from '../styledComponents/Header';

function Header() {
  return (
    <S.Header>
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
    </S.Header>
  );
}

export default Header;
