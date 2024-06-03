const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const usernameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export default function validationUserInfo([email, password, passwordConfirm, username]) {
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmValue = passwordConfirm ? passwordConfirm.value : null;
  const usernameValue = username ? username.value : null;

  const error = {};

  if (!emailRegex.test(emailValue)) {
    error.email = '이메일 양식을 확인해주세요!';
  }

  if (usernameValue !== null && !usernameRegex.test(usernameValue)) {
    error.username = '2~10자 사이의 한글,알파벳,숫자만 가능합니다!';
  }

  if (!passwordRegex.test(passwordValue)) {
    error.password = '8자리 이상 영문숫자 특수문자 조합으로 입력하세요!';
  }

  if (passwordConfirmValue !== null && passwordValue !== passwordConfirmValue) {
    error.passwordConfirm = '비밀번호가 일치하지 않습니다. 다시 확인해주세요!';
  }

  return error;
}
