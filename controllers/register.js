const jwt = require('jsonwebtoken');
const redisClient = require('./signin').redisClient;

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
  // JWT token, return user data
  const { email, id } = user[0];
  const token = signToken(email);
  return setToken(token, id)
  .then(() => { 
    return {success: 'true', userId: id, token }
  })
  .catch(console.log)
}

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if(!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          return createSessions(user)
        })
        .then(session => res.json(session))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
}