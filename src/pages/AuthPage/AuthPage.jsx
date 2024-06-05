import { LogInIcon, UserRoundPlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleIcon from '../../components/ToggleIcon';
import PasswordEyeIcon from '../../components/icons/PasswordEyeIcon';
import PasswordEyeOffIcon from '../../components/icons/PasswrodEyeOffIcon';
import { setUser } from '../../redux/slices/user.slice';
import { supabase } from '../../service/supabase';
import { logInUser, registerUser } from '../../service/user';
import validation from '../../utils/validation';

const LoginMainDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1320px;
  padding: 10px;
  box-sizing: border-box;
  user-select: none;
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

const LoginTextBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
`;

const LoginFormLabel = styled.label``;

const LoginErrorText = styled.p`
  color: #ff4d4d;
  font-weight: bold;
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
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  width: 150px;
  padding: 10px 10px;
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

const LoginButtonText = styled.p`
  width: 100%;
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
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [authError, setAuthError] = useState({});

  const inputRef = useRef([]);

  const resetInputRef = () => {
    console.log(inputRef);
    inputRef.current.forEach((ref) => {
      ref.value = '';
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const userInfo = inputRef.current;

    const error = validation(isLoginForm ? 'login' : 'register', userInfo);

    setAuthError(error);

    if (Object.values(error).some((error) => error)) {
      return;
    }

    const response = isLoginForm ? await logInUser(userInfo) : await registerUser(userInfo);
    // console.log('AUTH PAGE', response);
    if (response.error) {
      setAuthError({ email: '이메일 혹은 비밀번호를 확인해주세요' });
      return;
    }

    if (isLoginForm) {
      dispatch(setUser({ session: response.data }));
      nav('/', { replace: true });
    } else {
      resetInputRef();
      setIsLoginForm(true);
    }
  };

  const toggleAuthForm = () => {
    setIsLoginForm((prevState) => !prevState);
    setPasswordVisible(false);
    setAuthError({});
  };

  const githubLoginHandler = async () => {
    console.log('GITHUB LOGIN');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.log('GITHUB LOGIN ERROR', error);
      return;
    }
  };

  const googleLoginHandler = async () => {
    console.log('GOOGLE LOGIN');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.log('GOOGLE LOGIN ERROR', error);
      return;
    }
  };

  const resetPasswordHandler = () => {
    console.log('RESET PASSWORD');
    nav('/forgot-password');
  };

  return (
    <LoginMainDiv>
      <Abc>
        <LoginImage src="http://via.placeholder.com/640x240" alt="" width={'100%'} />

        <LoginFormDiv>
          <LoginFormH1>{isLoginForm ? '로그인' : '회원가입'}</LoginFormH1>

          <LoginForm onSubmit={(e) => onSubmitHandler(e)}>
            {!isLoginForm && (
              <LoginFormInputBox>
                <LoginTextBox>
                  <LoginFormLabel htmlFor="user_name">유저명</LoginFormLabel>
                  {authError.user_name && <LoginErrorText>{authError.user_name}</LoginErrorText>}
                </LoginTextBox>
                <LoginFormInput
                  ref={(e) => (inputRef.current[3] = e)}
                  id="user_name"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                />
              </LoginFormInputBox>
            )}

            <LoginFormInputBox>
              <LoginTextBox>
                <LoginFormLabel htmlFor="email">이메일</LoginFormLabel>
                {authError.email && <LoginErrorText>{authError.email}</LoginErrorText>}
              </LoginTextBox>
              <LoginFormInput
                ref={(e) => (inputRef.current[0] = e)}
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
              />
            </LoginFormInputBox>

            <LoginFormInputBox>
              <LoginTextBox>
                <LoginFormLabel htmlFor="password">비밀번호</LoginFormLabel>
                {authError.password && <LoginErrorText>{authError.password}</LoginErrorText>}
              </LoginTextBox>
              <LoginFormInput
                ref={(e) => (inputRef.current[1] = e)}
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                minLength={6}
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

            {!isLoginForm && (
              <LoginFormInputBox>
                <LoginTextBox>
                  <LoginFormLabel htmlFor="passwordConfirm">비밀번호 확인</LoginFormLabel>
                  {authError.passwordConfirm && <LoginErrorText>{authError.passwordConfirm}</LoginErrorText>}
                </LoginTextBox>
                <LoginFormInput
                  ref={(e) => (inputRef.current[2] = e)}
                  id="passwordConfirm"
                  type={passwordConfirmVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  minLength={6}
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

            <OAuthIconsDiv>
              <div onClick={githubLoginHandler}>
                <img src={'/src/assets/github.png'} alt="github"></img>
              </div>
              <div onClick={googleLoginHandler}>
                <img src={'/src/assets/google.png'} alt="github"></img>
              </div>
            </OAuthIconsDiv>

            <LoginFormButton>
              <LoginButtonText>{isLoginForm ? '로그인' : '회원가입'}</LoginButtonText>
              <ToggleIcon
                toggled={isLoginForm}
                onToggle={setIsLoginForm}
                onIcon={<LogInIcon />}
                offIcon={<UserRoundPlusIcon />}
              />
            </LoginFormButton>
          </LoginForm>

          <AuthLinkBox>
            <LoginLink>
              <p>비밀번호를 잊으셨나요?</p>
              <LoginSignup onClick={resetPasswordHandler}>비밀번호 찾기</LoginSignup>
            </LoginLink>
            <LoginLink>
              <p>처음왔는가?</p>
              <LoginSignup onClick={toggleAuthForm}>{isLoginForm ? '회원가입' : '로그인'}</LoginSignup>
            </LoginLink>
          </AuthLinkBox>
        </LoginFormDiv>
      </Abc>
    </LoginMainDiv>
  );
}

export default AuthPage;

const AuthLinkBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OAuthIconsDiv = styled.div`
  display: flex;
  gap: 1rem;

  & div {
    cursor: pointer;
  }

  & img {
    width: 35px;
    height: 35px;
    background-color: white;
    border-radius: 100%;
  }

  & img:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }

  & img:active {
    background-color: #efefef;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
  }
`;
