# E Commerce Site by Courage

This E-Commerce site takes inspiration from both our name and the upcoming holidayt that we all love.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Redux to manage our states. Express was used to handle requests to our PostgresSQL server that is being managed by Sequelizeed. Token authentication is handled using JSON Web Tokens and bcrypt. Textbased search functionality was implemented using [Algolia](https://www.algolia.com/).cart payments are handled using Stripe.

Customers have the ability to make orders for halloween costumes and create an account inorder to save a cart that persists on the database.

Guests will have the same ability to create a cart and integrate their cart with the bd saved cart once logged in or upon account creation.

Admin accounts have the ability to review orders, user information(excluding passwords) and modify products. All product modifications will be added to the algolia db for search functionality.

## Installing &testing this projest

1. `npm install`
2. `npm run seed`
3. `npm run server`
   this would run the server in development mode on [http://localhost:3000](http://localhost:3000)

## deployment

this project is currently being hosted on Heroku [courage grace shopper](https://courage-grace-shopper.herokuapp.com/)
upon deployment Heroku will run the build scripts, run the seed file and seed into algolia
