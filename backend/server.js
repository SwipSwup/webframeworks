const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const users = [];
const sessions = [];

// SignUp Route
app.post('/users', (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: uuidv4(), email, password };
  users.push(newUser);

  const token = uuidv4();
  sessions.push({ email, token });

  res.status(201).json({ message: 'User created', token });
});

// SignIn Route
app.post('/sessions', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = uuidv4();
  sessions.push({ email, token });

  res.status(200).json({ message: 'Login successful', token });
});

// Highscore POST Route
app.post('/highscores', (req, res) => {
  const { username, score, token } = req.body;

  const session = sessions.find(session => session.token === token);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!session.highscores) {
    session.highscores = [];
  }

  session.highscores.push({ username, score });

  res.status(201).json({ message: 'Highscore recorded' });
});

// Highscore GET Route
app.get('/highscores', (req, res) => {
  const { token } = req.headers.authorization;

  console.log(token)

  const session = sessions.find(session => session.token === token);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json(session.highscores || []);
});

//TODO just for testing
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Logout Route
app.delete('/sessions', (req, res) => {
  const { token } = req.body;

  const index = sessions.findIndex(session => session.token === token);

  if (index !== -1) {
    sessions.splice(index, 1);
    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(400).json({ message: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
