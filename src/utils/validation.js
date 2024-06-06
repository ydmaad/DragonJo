const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const usernameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function validateUsername(username) {
  if (!usernameRegex.test(username)) {
    return '2~10자 사이의 한글, 알파벳, 숫자만 가능합니다!';
  }
  return null;
}

function validateEmail(email) {
  if (!emailRegex.test(email)) {
    return '이메일 양식을 확인해주세요!';
  }
  return null;
}

function validatePassword(password) {
  if (!passwordRegex.test(password)) {
    return '8자리 이상 영문숫자 특수문자 조합으로 입력하세요!';
  }
  return null;
}

function validatePasswordConfirm(password, passwordConfirm) {
  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다. 다시 확인해주세요!';
  }
  return null;
}

export default function validation(page, targets) {
  const error = {};
  const field = {};

  targets.forEach((target) => {
    if (target) field[target.id] = target.value;
  });

  switch (page) {
    case 'login': {
      const { email, password } = field;

      error.email = validateEmail(email);
      error.password = validatePassword(password);
      break;
    }
    case 'register': {
      const { email, password, passwordConfirm, user_name } = field;
      error.email = validateEmail(email);
      error.password = validatePassword(password);
      error.passwordConfirm = validatePasswordConfirm(password, passwordConfirm);
      error.user_name = validateUsername(user_name);
      break;
    }
    case 'forgot': {
      const { email } = field;
      error.email = validateEmail(email);
      break;
    }
    case 'reset': {
      const { password, passwordConfirm } = field;
      error.password = validatePassword(password);
      error.passwordConfirm = validatePasswordConfirm(password, passwordConfirm);
      break;
    }
    default:
      throw new Error('Invalid Page');
  }

  for (const key in error) {
    if (error[key] === null) delete error[key];
  }

  return error;
}
