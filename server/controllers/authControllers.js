const Auth = require("../models/userModels")
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.jwt_secret;


//Registration
const register = async (req, res) => {
const salt = "260idk"
const { email, username, password, password2 } = req.body;
if(!email || !password || !password2) {
    return res.json({ ok: false, message: "All fields required" });
  }
if (password !== password2) {
    return res.json({ ok: false, message: "Passwords must match" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ ok: false, message: "Invalid email" });
  }
  try {
    const userFromEmail = await Auth.findOne({ email });
    const userFromName = await Auth.findOne({ username });
    if (userFromEmail) return res.json({ ok: false, message: "User with this email already exists!" });
    if (userFromName) return res.json({ ok: false, message: "User with this username already exists!" });

    const hash = await argon2.hash(password, salt);
    

    const newUser = {email, username, password: hash};
      await Auth.create(newUser);
      console.log(newUser)
      res.json({ ok: true, message: `${username} successfully registered` });
    } catch (e) {
      console.log(e);
      res.json({ ok: false, message: "Something went wrong" });
    }
}
//Login
const login = async (req, res) => {

   const { identifier, password } = req.body;
   if(!identifier || !password) {
       return res.json({ ok: false, message: "All fields required" });
     }

     const getUserFromIdentifier = async (identifier) => {
      try {
        if (validator.isEmail(identifier)) {
          return await Auth.findOne({ email: identifier });
        } else {
          return await Auth.findOne({ username: identifier });
        }
      } catch (e) {
      res.json({ok: false, e}); 
      }
    };
    try {
      const userFromIdentifier = await getUserFromIdentifier(identifier) 
      if (!userFromIdentifier) {
        return res.json({ ok: false, message: "User not found" });
      }
       const match = await argon2.verify(userFromIdentifier.password, password);
       try{
       if (match) {
        const token = jwt.sign({userId: userFromIdentifier._id}, jwt_secret, {expiresIn: "1h"})
        res.json({ ok: true, message: "Welcome back", token })} 
        else return res.json({ ok: false, message: "Invalid data provided" }); }
        catch (error) {
    res.json({ ok: false, error });}
  } catch (e) {
    return res.json({ ok: false, e });
  }
}

    const verify_token = (req, res) => {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        jwt.verify(token, jwt_secret, (err, succ) => {
          err
            ? res.json({ ok: false, message: "Token is corrupted" })
            : res.json({ ok: true, succ });
        });
  }


module.exports = { register, login, verify_token };