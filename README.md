# Simple Shop

This is a simple shop written in React and Node, using a MongoDB database. It allows you to create a user account and log in/out, buy products, and view your orders. Admin users created with the email domain @simpleshop.com.au can add products, delete products, and update the stock of products.

## Setup

After cloning the project, run 'npm install' in the root directory and client directory. The root directory must contain a .env file with the following values:

SERVER_PORT='8080'
NODE_ENV='development'
DB_URL='mongodb+srv://[user]:[password]@[address]/[database]?retryWrites=true&w=majority'
ACCESS_TOKEN_SECRET='[secret]'

## Future

Aside from potential minor updates, this project is unlikely to be updated in the future. It is a learning concept and does not represent a commercial product.
