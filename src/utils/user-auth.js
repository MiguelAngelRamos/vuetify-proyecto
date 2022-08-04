let isValid = false;

export function authUser(user) {
  isValid = user ? true: false;
  localStorage.setItem('isAuth', isValid);
}

export function isAuth() {
  return isValid;
}