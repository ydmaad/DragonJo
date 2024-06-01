import styled from 'styled-components';

const LoginMainDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1320px;
  padding: 10px;
  box-sizing: border-box;
  user-select: none;
`;

const Test = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Abc = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  min-height: 600px;

  grid-template-columns: 400px auto;

  border: 2px solid red;
  border-radius: 8px;

  color: white;
  background-color: #095544;

  @media screen and (max-width: 700px) {
    & {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  }
`;

const LoginImage = styled.img`
  height: 100%;
  @media (max-width: 700px) {
    height: 200px;
  }
`;

const LoginFormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  padding: 20px;
  padding-bottom: 50px;
`;

const LoginFormH1 = styled.h1`
  font-weight: 600;
  font-size: 28px;
  padding: 20px;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const LoginFormInputBox = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  max-width: 500px;
`;

const LoginFormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;

const LoginFormInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: none;

  &::placeholder {
    font-size: 12px;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }

  &:focus {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }
`;

const LoginFormButton = styled.button`
  width: fit-content;
  font-size: 12px;
  font-weight: bold;
  padding: 10px 50px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }

  &:active {
    background-color: #eeeeee;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }
`;

const LoginLink = styled.div`
  display: flex;
  font-size: 11px;
  gap: 4px;
`;

const LoginSignup = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

function AuthPage() {
  return (
    <LoginMainDiv>
      <Test>
        <div>{'<'}</div>
        <div>로그인</div>
      </Test>
      <Abc>
        <LoginImage src="http://via.placeholder.com/640x240" alt="" width={'100%'} />

        <LoginFormDiv>
          <LoginFormH1>로그인</LoginFormH1>

          <LoginForm>
            <LoginFormInputBox>
              <LoginFormLabel htmlFor="email">이메일</LoginFormLabel>
              <LoginFormInput id="email" type="email" placeholder="이메일을 입력하세요" />
            </LoginFormInputBox>
            <LoginFormInputBox>
              <LoginFormLabel htmlFor="password">비밀번호</LoginFormLabel>
              <LoginFormInput id="password" type="password" placeholder="비밀번호를 입력하세요" />
            </LoginFormInputBox>
            <LoginFormButton type="button">로그인</LoginFormButton>
          </LoginForm>

          <LoginLink>
            <p>처음왔는가?</p>
            <LoginSignup>회원가입</LoginSignup>
          </LoginLink>
        </LoginFormDiv>
      </Abc>
    </LoginMainDiv>
  );
}

export default AuthPage;
