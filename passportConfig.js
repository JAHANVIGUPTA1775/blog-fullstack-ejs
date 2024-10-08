const LocalStrategy = require("passport-local").Strategy;
const { authenticate } = require("passport");
const bcrypt = require("bcrypt");
const client = require("./db/conn.js");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {

    try {
      const results= await client.query('SELECT * FROM users WHERE email=$1', [email]);
      if(results.rows.length>0){
        const user= results.rows[0];

        const isMatch= await bcrypt.compare(password, user.password);
        if(isMatch){
          return done(null, user);
        }
        else{
          return done(null, false, {message:'Password is incorrect'});
        }
        
      }
      else{
        return done(null, false, {message:'Email is not registered'});
      }
    } catch (error) {
        console.log(error);
        return done(error);
    }
  
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    // console.log("user id on login",user.id);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    client.query(`SELECT * FROM users WHERE id=$1`, [id], (err, results) => {
      if (err) {
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
