module.exports = cleanToken;

function cleanToken(token) {
  return token.replace(/[<>]/g, '');
};
