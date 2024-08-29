const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./db/index");
const passport = require("passport");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username); // Fetch by username

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID into the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id); // Fetch by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});
