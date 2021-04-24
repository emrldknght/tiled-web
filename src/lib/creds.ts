const LOGIN_KEY = 'ty-login';
const LOGIN_PASS = 'ty-pass'

export const saveCred = (login: string, pass: string) => {
  localStorage.setItem(LOGIN_KEY, login);
  localStorage.setItem(LOGIN_PASS, pass);
}
export const eraseCred = () => {
  localStorage.removeItem(LOGIN_KEY);
  localStorage.removeItem(LOGIN_PASS);
}

export const getCred = async () => {
  const login = localStorage.getItem(LOGIN_KEY);
  const pass = localStorage.getItem(LOGIN_PASS);
  return (login && pass) ? {login, pass} : null;
}