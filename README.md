# flask-starter

## Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `FLASK_APP=run.py FLASK_DEBUG=1 flask run`

## Setup Local Postgres Database

1. Update `sudo apt-get update`
2. Install PostgreSQL 10.4 `sudo apt-get install postgresql-10.4`
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

### Current features implemented for issue 15
