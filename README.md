# LBU University Management system (SESC)

This application allows the student to create an account, enroll into courses, borrow books and pay fees.

The architecture overview of the project is shown below:

![Architecture Overview!](/assets/lbu_sesc-architecture.jpg "Architecture Overview")

## The API Documentation

The complete API collection and postman documentation can be found in the [Link here](https://documenter.getpostman.com/view/12322615/2sA3Bq5rGA "Postman API Documentation")

## Environment variables

### Student Portal

Backend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.
3. Rename the `example.environment.properties` -> `environment.properties`
4. Assign the values to the variables.

Frontend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.

### Finance Portal

Backend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.

Frontend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.

### Library Portal

Backend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.
3. Rename the `example.environment.properties` -> `environment.properties`
4. Assign the values to the variables.

Frontend:

1. Rename the `.env.example` -> `.env`
2. Assign the values to the variables.

## Run the Project

To run the project. Make sure that the Docker is installed on your machine and is running.

Create a docker network

```
docker network create lbu-sesc
```

Then, run the shell script that launches all the docker compose files

```
# Make the shell script file executable by running this command first
chmod +x ./start.sh

# Run the shell script
./start.sh
```

Thank you 🙂
