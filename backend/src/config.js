import dotenv from 'dotenv';
dotenv.config();
// i created this here because i was getting an error that dotenv is not defined
// Ensure that the environment variables are loaded before any other imports
// chaiorcode also recommended this but at the time i didn't know how to do it
// This will load the environment variables from a .env file into process.env