export const verifyIsTestAccess = () => {
  return localStorage.getItem('isTest') === 'true';
}
