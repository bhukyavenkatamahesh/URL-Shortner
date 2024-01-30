const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next) {
  const UserUid = req.cookies.uid;
  if (!UserUid) return res.redirect("/login");
  const user = getUser(UserUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
