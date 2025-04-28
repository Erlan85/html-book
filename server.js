const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// Авторизация тексеру мидлвары
function checkAuth(req, res, next) {
  if (req.session.user) {
    return next(); // Егер сессияда қолданушы бар болса, келесі қадамға өту
  } else {
    return res.status(401).json({ error: 'Кіру қажет' }); // Қолданушы тіркелмеген жағдайда қате хабарлама қайтару
  }
}

// Кіру маршруты
app.post('/login', (req, res) => {
  const { username } = req.body;
app.post('/logout', (req, res) => {
    res.clearCookie('token'); // егер авторизация JWT арқылы болса
    res.status(200).json({ message: 'Logged out' });
});




  // Бұл жерде тексеру логикасы болады
  req.session.user = { name: username }; // Қолданушыны сессияға сақтау
  res.json({ success: true });
});

// Профиль маршруты тек тіркелген қолданушыларға
app.get('/profile', checkAuth, (req, res) => {
  res.json({ name: req.session.user.name });
});

// Басқа қорғалған маршрут
app.get('/dashboard', checkAuth, (req, res) => {
  res.json({ message: 'Сіз тіркелген қолданушысыз!' });
});

// Қорғалмаған маршруттар (мысалы, басты бет)
app.get('/', (req, res) => {
  res.send('Қош келдіңіз, басты бет!');
});

// Серверді іске қосу
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} портында іске қосылды`);
});
