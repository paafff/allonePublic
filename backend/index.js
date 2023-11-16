const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const dbSetting = require('./config/Database.js');
const authRouter = require('./routes/AuthRoute.js');
const articleRouter = require('./routes/ArticleRoute.js');
const productRouter = require('./routes/ProductRoute.js');

const SequelizeStore = require('connect-session-sequelize');
const userRouter = require('./routes/UserRoute.js');

const app = express();

dotenv.config();

(async () => {
  await dbSetting.sync();
})();

const sessionStore = new SequelizeStore(session.Store);

const Store = new sessionStore({
  db: dbSetting,
});

app.use(
  session({
    secret: 'loliipop',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: Store,
  })
);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.get('/', (req, res) => {
  res.send('goodluck nang!');
});
app.use(express.json());
app.use(authRouter);
app.use(articleRouter);
app.use(productRouter);
app.use(userRouter);

app.listen(5000, () => {
  console.log('server jalan bang...');
});
