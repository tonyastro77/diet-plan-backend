# Diet Plan Webpage

You can check this webpage deployed [here:](https://fathomless-fortress-72861.herokuapp.com)

## Application

This Webpage aims to collect food nutritional values from the user and display information regarding the total calories eaten versus the suggested calories given by the user personal information such as height, weight, how active the user is and whether the user is aiming to lose, gain or maintain weight. Upon starting, the webpage will request the user to login or create a new user which then redirects to the login page after completion.

### `Features`

#### `Home Page`

The Home Page, which is the page where the user is taken after logging in, contains a chart, user progress and current day's (today) food values added by the user, either a complete new food information by pressing ADD in the table or selected from the already existant food in the Main Database by selecting the tab  "Food Database" from the left side bar and then adding a food value from there. All this is will be visible back in the Home page.

#### `Progress Chart`

This chart located at the top left in the Home Page displays Total Number of Calories vs Total Suggested Calories by Date. The total suggested calories are calculated based on the user information available and modifiable from the tab 'Personal Information'. The formula consists of BMR (Basal Metabollic Rate) which is determined by the gender as a variable. Then the level of activity and whether the user aims to lose, keep or gain weight are constants that have an influence in the final result.

The total number of calories are calculated as the sum of all the food calories for the current day. Note the quantity of each food multiplies the final result. For example, 2 cookies quantity have a modifier of 2 times the calories shown in the row of that specific cookie information.

#### `Progress Information`

This is located at the top right in the Home Page. It displays the current day's date, suggested calories and total calories based on the information added so far in the table below.

####`Food Table`

This table is located at the bottom of the Home Page. It displays the current day's food information added as part of the diet. Here you have a buttons to edit, delete the existing row, and the 'Add' button to add a complete information of any specific food that has not been added previously. Please note that you can skip all this if you already created a specific food information on a previously day by checking the 'Food Database' tab.

####`Personal Information`

Here you will see a single row containing the user's information such as Name (created when first signing up the account), the age, height, weight, gender, activity (how active the user is at exercising), goal (lose, keep or gain weight) which are modifiable and then will update the 'total amount of suggested calories' later.
As an example, if today your weight is 87, then tomorrow could 86 and you can update this information. This will change the information of the total ammount of suggested calories but will not erase the previous days information so you can keep track of changes throughout an entire week, month, year.

### `Technology used`

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
