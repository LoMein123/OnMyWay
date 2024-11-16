# OnMyWay - A ridesharing app

This project is a Node.js application following the Model-View-Controller (MVC) architecture. It uses Express and ejs templates.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/LoMein123/OnMyWay
    ```

2. Install MySQL.

3. Start MySQL and create the MySQL database:\
&nbsp;&nbsp;&nbsp;&nbsp;In MySQL, run everything inside `create_db.txt` (located in the project folder).

4. Change the user/password field in `db.js` to match your MySQL credentials.
    ```js
    const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',           // Adjust this value as needed
    password: 'password',   // Adjust this value as needed
    database: 'carpooldb',  
    connectionLimit: 10
    });
    ```

5. Install Node.js at https://nodejs.org/en.  The latest version (LTS) will work.

6. In a terminal, navigate to the directory that you unzipped to:
    ```sh
    cd <directory>
    ```

7. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the application:
    ```sh
    node app.js
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
nodejs-mvc-year3/
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
├── public/
├── app.js
├── db.js
├── package.json
└── README.md
```

- **controllers/**: Contains the application logic.
- **middleware/**: Contains middleware for the application.
- **models/**: Contains the database models.
- **routes/**: Contains the route definitions.
- **views/**: Contains the ejs templates.
- **public/**: Contains static files (CSS, images).
- **app.js**: The main application file.
- **package.json**: The project configuration file.
- **db.js**: Database Connection Information.