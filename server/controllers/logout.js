
//clearCookies session for current user
const logOut = (req, res) => {
  res.clearCookie('logUser')
  res.send('ok');
}
module.exports = logOut;
