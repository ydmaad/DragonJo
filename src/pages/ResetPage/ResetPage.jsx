import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleIcon from '../../components/ToggleIcon';
import PasswordEyeIcon from '../../components/icons/PasswordEyeIcon';
import PasswordEyeOffIcon from '../../components/icons/PasswrodEyeOffIcon';
import { supabase } from '../../service/supabase';
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 600px;

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
const IconDiv = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
`;
function ResetPage() {
  const inputRef = useRef([]);
  const location = useLocation();
  const nav = useNavigate();
  const [authError, setAuthError] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const userInfo = inputRef.current;

    const validationError = validation('reset', userInfo);

    if (Object.keys(validationError).length) {
      setAuthError(validationError);
      return;
    }

    const password = userInfo[0].value;
    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      console.log('REAET PASSWORD', error);

      setAuthError({ paassword: '비밀번호 재설정에 실패했습니다. 다시 시도해 주세요' });
      return;
    }

    nav(`/auth`, { replace: true });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.hash.substring(1));
    if (searchParams.get('error_code')) {
      alert(`${searchParams.get('error_description')}`);
      nav('/', { replace: true });
    }
  }, [location, nav]);

  return (
    <LoginMainDiv>
      <Abc>
        <LoginFormDiv>
          <LoginFormH1>비밀번호 재설정</LoginFormH1>

          <LoginForm onSubmit={(e) => onSubmitHandler(e)}>
            <LoginFormInputBox>
              <LoginTextBox>
                <LoginFormLabel htmlFor="password">비밀번호</LoginFormLabel>
                {authError.password && <LoginErrorText>{authError.password}</LoginErrorText>}
              </LoginTextBox>
              <LoginFormInput
                ref={(e) => (inputRef.current[0] = e)}
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

            <LoginFormInputBox>
              <LoginTextBox>
                <LoginFormLabel htmlFor="passwordConfirm">비밀번호 확인</LoginFormLabel>
                {authError.passwordConfirm && <LoginErrorText>{authError.passwordConfirm}</LoginErrorText>}
              </LoginTextBox>
              <LoginFormInput
                ref={(e) => (inputRef.current[1] = e)}
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

            <LoginFormButton>
              <LoginButtonText>비밀번호 재설정</LoginButtonText>
            </LoginFormButton>
          </LoginForm>
        </LoginFormDiv>
      </Abc>
    </LoginMainDiv>
  );
}

export default ResetPage;
