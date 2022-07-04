# silverorange Intermediate Developer Assessment
==============================================

This project was developed for an intermediate developer assessment at silverorange. The company was interested to see how you work as well, as what your final results are; include useful Git commit messages and comments where you think your code may be unclear.

## Description
This project uses React as the Front-End and Node/Express as the Back-end. The project fetches repos from GitHub API and a local JSON file to display in React.

## Demo
The features are displayed in this demo. I made a custom error page to handle the 25% cases when server returns a bad response.
![project demo](https://github.com/xihai01/super-duper-rotary-phone/blob/main/docs/repo.gif?raw=true)

Getting Started With the Express Backend (/api)
-----------------------------------------------
For this exercise a pre-built Express application is provided. The application
runs by default on `localhost:4000` and has the following endpoints:

 - `http://localhost:4000/repos` - returns a JSON-encoded array of repos. By
   default, an empty array is returned. You will need to add an implementation
   in (A).

### Running the Express Application

```sh
cd api/
npm install
npm start
```

You can verify the API is working by visiting http://localhost:4000/repos in
your browser or another HTTP client. **Please note that about 25% of the time,
the API returns an error message.**

Getting Started with the React Client (/web)
------------------------------------------------
The React client is a bare Create React App application.

### Running the Expo Application

```sh
cd web/
npm install
npm start
```

This will open your browser at http://localhost:3000, allowing you to test the
React client.
