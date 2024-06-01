import { useRef, useState } from 'react';
import styled from 'styled-components';
import ToggleIcon from '../../components/ToggleIcon';
import PasswordEyeIcon from '../../components/icons/PasswordEyeIcon';
import PasswordEyeOffIcon from '../../components/icons/PasswrodEyeOffIcon';

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
  position: relative;
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
  width: 150px;
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

const IconDiv = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
`;

function AuthPage() {
  const [authForm, setAuthForm] = useState('login');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const inputRef = useRef([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('SUBMIT !!');
    console.log(inputRef.current[0].value);
    console.log(inputRef.current[1].value);
  };

  const logIn = () => {
    console.log('log in');
  };

  const register = () => {
    console.log('register');
  };

  const toggleAuthForm = () => {
    setAuthForm((prevState) => (prevState === 'login' ? 'register' : 'login'));
    setPasswordVisible(false);
  };

  return (
    <LoginMainDiv>
      <Test>
        <div>{'<'}</div>
        <div>로그인</div>
      </Test>
      <Abc>
        <LoginImage src="http://via.placeholder.com/640x240" alt="" width={'100%'} />

        <LoginFormDiv>
          <LoginFormH1>{authForm === 'login' ? '로그인' : '회원가입'}</LoginFormH1>

          <LoginForm onSubmit={(e) => onSubmitHandler(e)}>
            <LoginFormInputBox>
              <LoginFormLabel htmlFor="email">이메일</LoginFormLabel>
              <LoginFormInput
                ref={(e) => (inputRef.current[0] = e)}
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
              />
            </LoginFormInputBox>
            <LoginFormInputBox>
              <LoginFormLabel htmlFor="password">비밀번호</LoginFormLabel>
              <LoginFormInput
                ref={(e) => (inputRef.current[1] = e)}
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
              />
              <IconDiv>
                <ToggleIcon
                  toggled={passwordVisible}
                  onToggle={setPasswordVisible}
                  onIcon={<PasswordEyeIcon />}
                  offIcon={<PasswordEyeOffIcon />}
                />
              </IconDiv>
            </LoginFormInputBox>

            {authForm === 'register' && (
              <LoginFormInputBox>
                <LoginFormLabel htmlFor="password">비밀번호 확인</LoginFormLabel>
                <LoginFormInput
                  ref={(e) => (inputRef.current[2] = e)}
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                />

                <IconDiv>
                  <ToggleIcon
                    toggled={passwordConfirmVisible}
                    onToggle={setPasswordConfirmVisible}
                    onIcon={<PasswordEyeIcon />}
                    offIcon={<PasswordEyeOffIcon />}
                  />
                </IconDiv>
              </LoginFormInputBox>
            )}

            <LoginFormButton onClick={authForm === 'login' ? logIn : register} type="submit">
              {authForm === 'login' ? '로그인' : '회원가입'}
            </LoginFormButton>
          </LoginForm>

          <LoginLink>
            <p>처음왔는가?</p>
            <LoginSignup onClick={toggleAuthForm}>{authForm === 'login' ? '회원가입' : '로그인'}</LoginSignup>
          </LoginLink>
        </LoginFormDiv>
      </Abc>
    </LoginMainDiv>
  );
}

export default AuthPage;
