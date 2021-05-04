# Diet Plan Webpage

You can check this webpage deployed [here:](https://fathomless-fortress-72861.herokuapp.com)

## Application

This Webpage aims to collect food nutritional values from the user and display information regarding the total calories eaten versus the suggested calories given by the user personal information such as height, weight, how active the user is and whether the user is aiming to lose, gain or maintain weight. Upon starting, the webpage will requested the user to login or create a new user which then redirects to the login page after completion.

### `Home Page`

The Home Page, which is the page where the user is taken after logging in, contains a chart, user progress and current day's (today) food values added by the user, either a complete new food information by pressing ADD in the table or selected from the already existant food in the Main Database by selecting the tab  "Food Database" from the left side bar and then adding a food value from there. All this is will be visible back in the Home page.

### `Features`

This app contains and runs with:
#### `Frontend`
* [ReactJS](https://reactjs.org/)
* [Material-UI Core Components](https://material-ui.com/) 
* [Material-UI Icons](https://material-ui.com/components/icons/)
* [Material-UI Theme Provider](https://material-ui.com/customization/theming/) for the overall color appereance of the app
* [Axios](https://github.com/axios/axios) for handling the requests
* [React-Router](https://reactrouter.com/) for handling navigation
* [Lodash](https://lodash.com/) library for arrays handling need for the chart
* [Moment](https://momentjs.com/) library for date handling
* [Recharts](https://recharts.org/en-US/) library for the Chart Progress display 
* [ESLint](https://eslint.org/) for Code Syntax
* [Jest](https://jestjs.io/) library for Unit Tests

#### `Backend`
* [Express](https://expressjs.com/) web application framework used for handling APIs
* [Dotenv](https://www.npmjs.com/package/dotenv) for handling environment variables
* [Bcrypt](https://www.npmjs.com/package/bcrypt) used for hashing passwords
* [Mongoose](https://mongoosejs.com/) for handling schemas and connecting to MongoDB 
* [Mongoose Unique Validator](https://www.npmjs.com/package/mongoose-unique-validator) adds a unique validation within a Mongoose Schema
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) checks for a token (linked to a user) to be allowed to obtain certain response
* [Cors](https://www.npmjs.com/package/cors) to handle Cross-origin resource sharing
* [Jest](https://jestjs.io/) library for Unit Testing 
* [Supertest](https://www.npmjs.com/package/supertest) library for Integration Testing

#### `Database`
* [MongoDB](https://www.mongodb.com/cloud/atlas) document database for being free of charge and easily available for this application's purpose.

## Installation

## Instructions to run locally only with .env file which is not provided here for security reasons

After cloning both repositories locally with 'git clone' [Frontend](https://github.com/tonyastro77/diet-plan-frontend) and [Backend](https://github.com/tonyastro77/diet-plan-backend), don't forget to install the dependencies with 'npm install'

After all the depencies have been installed in both dependencies locally you have to 'npm run build' in the frontend folder to then copy the 'build' folder and paste it in the root folder of the backend.

Finally, once the build folder is pasted in the backend folder, add the .env file with the correct environmental files pointing the mongodb_uri, port and secret. From the root folder then run 'npm run dev' to start the application locally in the port 3001.
From the browser go to 'localhost:3001' address and you should be able to run this project locally.

### Deployment

You can try this webpage deployed on Heroku [here:](https://fathomless-fortress-72861.herokuapp.com)
