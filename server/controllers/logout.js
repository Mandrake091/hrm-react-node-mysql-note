

const logOut = (req, res) => {
  res.clearCookie('logUser')
  res.send('ok');
}
module.exports = logOut;
