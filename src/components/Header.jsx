import styled from 'styled-components';

const HeaderHeader = styled.header`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  justify-content: space-between;
  background-image: linear-gradient(to top, #ffffff, #cccccc);

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
function Header() {
  return (
    <HeaderHeader>
      <div>Logo</div>
      <div>
        <div>로그인</div>
      </div>
    </HeaderHeader>
  );
}

export default Header;
