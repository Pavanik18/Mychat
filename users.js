const Users = require("../schemas/users");
let loginUser = async (req) => {
	console.log(req.email);
  const userinfo = await collection("Users").find({email:"pavani@gmail.com",password:"abcde"});
  console.log(userinfo);
  return userinfo
}
let userList = async () => {
  const userinfo = await Users.find();
  return userinfo
}
module.exports = {
    loginUser,
    userList
};