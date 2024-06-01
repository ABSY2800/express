// 

const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;


function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day === 0 || day === 6 || hour < 9 || hour >= 17) {
    return res.send('<h1>Notre site est disponible uniquement du lundi au vendredi, de 9h à 17h.</h1>');
  }
  next();
}


app.use(checkWorkingHours);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
