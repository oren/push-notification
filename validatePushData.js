module.exports = validate;

function validate(data) {
  try {
    data = JSON.parse(data);
  } catch(e) {
    return false;
  }

  var res = data;

  if (data.user_id === undefined || data.app_id === undefined || data.message === undefined) {
    res = false; 
  }
  return res;
};
