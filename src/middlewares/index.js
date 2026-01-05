const { protect } = require("./auth.middleware");
const { authorize } = require("./role.middleware");

module.exports = {
  protect,
  authorize,
};
