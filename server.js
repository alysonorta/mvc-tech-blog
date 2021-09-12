//Dependencies
const routes = require ('./Develop/controllers')
const path = require('path');

//Express dependencies
const express = require ('express');
const exphbs = require ('express-handlebars');
const hbs = exphbs.create({});
const session = require ('express-session');

//Sequelize dependencies
const sequelize = require('./Develop/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Secret message here...',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port:' + PORT));
});
