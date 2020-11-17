## Peer Code Review
A web app that matches programmers to a mentor to review their code. Programmers earn credits by giving code reviews, and you can spend credits on getting your code reviewed (by someone a level up from you).

### Who’s it for?
Programmers who are looking for a mentor to provide code feedback! 

### Features:
  - Login/sign up flow with e-mail address
  - Create profile
  - Buy/earn/spend credits
  - Notifications center
  - Upload code using rich text editor
  - Receive code review with real time messaging using web-sockets
  - Send code review

### Tech Stack Used:
1. React, MaterialUI, react-router, context API
2. Python, Flask, Redis server, 
3. Postgres, SQLAlchemy, web-sockets, Stripe API, For-editor, S3 Bucket, JWT

### How to setup this project on local environment?
1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment `pipenv shell`
4. Make sure, your Postgres local server is running on local machine.
###### FOR LINUX
     - Update `sudo apt-get update`
     - Install PostgreSQL `sudo apt-get install postgresql`
     - Create postgres user `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`
     - Start PostgresSQL server `sudo service postgresql start`
     - Login to server `sudo -i -u postgres`
     - Open Postgres command line `psql`
     - Create databases, `create database team_acorn;`, `create database team_acorn_test;`
     - To stop server `sudo service postgresql stop`
###### FOR WINDOWS
     - Install latest version of Postgres with default options from https://www.postgresql.org/download/.
     - Run it and Choose USER= postgres
     - Chose password= postgres and rest of the stuff can be default ex: port#.
     - Run PSQL terminal from start menu.
     - Enter the user and password with defaults for rest of options.
     - Create a database using `create database team_acorn;`
5. Make sure redis server is installed and running on local machine. (Linux only or install WSLv2 on windows)
      - `sudo apt update`
      - `sudo apt install redis-server`
      - `sudo service redis-server start`
6. Now run the service worker
      - Open new terminal and go to the server folder.
      - run `pipenv shell`
      - update pipenv `pipenv update`
      - run worker `rq worker --with-scheduler`
7. Now goto server folder rename the `example.env` file to `.env` file and open it and change all the keys to your own keys (!important)
8. Start the server now:
      - Open a terminal and go to the server folder.
      - Activate the virtual environment `pipenv shell`
      - run `pipenv run python run.py` from the server folder
9. Now we will setup client side (make sure NodeJS is installed)
      - Open cmd and move to the client directory inside your project.
      - Run `npm install`
      - Wait couple of minutes for it to finish
      - Run `npm start`
10. That's it.
