import Express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = Express();
app.set('port', process.env.PORT || 8088);

app.get('/', (req, res) => {
  res.send('express test');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/about.html'));
});

app.listen(app.get('port'), () => {
  console.log('express start 🚀');
});
