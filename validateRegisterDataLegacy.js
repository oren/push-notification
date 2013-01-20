module.exports = validate;

function validate(data) {
  try {
    data = JSON.parse(data);
  } catch(e) {
    return false;
  }

  var res = true;

  if (data.appId === undefined || data.m === undefined || data.tkn === undefined || data.udid === undefined || data.uid === undefined) {
    res = false; 
  }
  return res;
};
