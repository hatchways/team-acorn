# flask-starter

## Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
4. run `pipenv shell`
3. Activate the virtual environment and start the app with `FLASK_APP=run.py FLASK_DEBUG=1 flask run`
4. proceed to run worker instructions. 

## Starting the worker for tasks:
0. update pipenv `pipenv update`
1. Open new terminal and go to the server folder. 
2. run `pipenv shell`
3. cd back to team-acorn directory `cd ..`
4. run worker `rq worker --with-scheduler`

## Setup Local Postgres Database (for linux machines)

1. Update `sudo apt-get update`
2. Install PostgreSQL `sudo apt-get install postgresql`
3. Create postgres user `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`
4. Start PostgresSQL server `sudo service postgresql start`
5. Login to server `sudo -i -u postgres`
6. Open Postgres command line `psql`
7. Create databases, `create database team_acorn;`, `create database team_acorn_test;`
8. To stop server `sudo service postgresql stop`

### Useful commands for postgres command line (will remove later)

- `psql` - open postgres command line
- `\list` - list all databases hosted on server
- `\c team_acorn` - connect to database "team_acorn"
- `\dt` - if connected to a database, list all tables in selected database
- `TABLE tableName;` - if connected to a database, list rows inside the table tableName
- `\q` - exit out of psql command line

