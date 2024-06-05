import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
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

function ForgotPage() {
  const nav = useNavigate();
  const [authError, setAuthError] = useState({});
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const code = searchParams.get('code');
  // console.log(message, code);
  const inputRef = useRef([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const userInfo = inputRef.current;
    const validationError = validation('forgot', userInfo);

    if (Object.keys(validationError).length) {
      setAuthError(validationError);
      return;
    }

    const email = userInfo[0].value;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password'
    });
    console.log(error);
    if (error) {
      console.log('FORGOT PAGE ERROR', error);
      setAuthError({ email: '이메일을 확인 해주세요' });
      return;
    }

    nav('/forgot-password?message=메일을 확인 해주세요&code=200', { replace: true });
  };

  return (
    <LoginMainDiv>
      <Abc>
        <LoginFormDiv>
          {code == 200 && <LoginFormH1>{message}</LoginFormH1>}
          {code != 200 && <LoginFormH1>비밀번호 찾기</LoginFormH1>}

          {code != 200 && (
            <LoginForm onSubmit={(e) => onSubmitHandler(e)}>
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

              <LoginFormButton>
                <LoginButtonText>메일 보내기</LoginButtonText>
              </LoginFormButton>
            </LoginForm>
          )}
        </LoginFormDiv>
      </Abc>
    </LoginMainDiv>
  );
}

export default ForgotPage;
