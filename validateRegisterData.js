module.exports = validate;

function validate(data) {
  try {
    data = JSON.parse(data);
  } catch(e) {
    return false;
  }

  var res = true;

  if (data.user_id === undefined || data.app_id === undefined || data.token === undefined) {
    res = false; 
  }
  return res;
};
