# flask-starter

## Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment `pipenv shell`
4. Make sure, your Postgres local server is running on local machine. (See below for setup)
5. run `pipenv run python run.py` from the server folder
6. proceed to run worker instructions.

## Starting the worker for tasks: (for linux machines)

0. Open new terminal and go to the server folder.
1. run `pipenv shell`
2. update pipenv `pipenv update`
3. run worker `rq worker --with-scheduler`

## Setup Local Postgres Database: (for linux machines)

1. Update `sudo apt-get update`
2. Install PostgreSQL `sudo apt-get install postgresql`
3. Create postgres user `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`
4. Start PostgresSQL server `sudo service postgresql start`
5. Login to server `sudo -i -u postgres`
6. Open Postgres command line `psql`
7. Create databases, `create database team_acorn;`, `create database team_acorn_test;`
8. To stop server `sudo service postgresql stop`

## Setup Local Postgres Database: (for Windows machines)

1. install latest version of Postgres with default options from https://www.postgresql.org/download/.
2. Run it and Choose USER= postgres
3. Chose password= postgres and rest of the stuff can be default ex: port#.
4. Run PSQL terminal from start menu.
5. Enter the user and password with defaults for rest of options.
6. Create a database using `create database team_acorn;`
7. all set and you can close the terminal. But make sure it is running in the background. Check the taskbar icon near wifi icon.
8. Check below commands to use in PSQL terminal if you want to do some testing (not mandatory though)

## Other importants things to note:

1. You need to add STRIPE_API_SK (secret key to .env file on server side to make payment methods to work) Please consult your team members to get the key.
2. One PK (public key) needed on client .env side. (That's included in the bundle)

### Useful commands for postgres command line (will remove later)

- `psql` - open postgres command line
- `\list` - list all databases hosted on server
- `\c team_acorn` - connect to database "team_acorn"
- `\dt` - if connected to a database, list all tables in selected database
- `TABLE tableName;` - if connected to a database, list rows inside the table tableName
- `\q` - exit out of psql command line

# To run the React Front End Server.

## Windows :-

1. Open cmd and move to the client directory inside your project.
2. Run `npm install`
3. Wait couple of minutes for it to finish
4. Run `npm start`
5. That's it.

# Note: Server port will be 5000 & Client port will be 3000 (Most of the time, unless these ports are being used by some other apps.)

=======
