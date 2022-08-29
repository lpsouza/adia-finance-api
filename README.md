# A.D.I.A Finance API

This is the finance API of the A.D.I.A. (Automated Digital Intelligence Assistant).

## A.D.I.A. Architecture

Understand the architecture of the A.D.I.A. [here](https://gist.github.com/lpsouza/a78eee78f2aaac99549a3f10846b7666).

## A.D.I.A. Finance API funcionalities

- TODO

## Environment Variables

- `CONNECTION_STRING`: The connection string to MongoDB database.
- `CORE_API`: The URL of the A.D.I.A. core API.
- `APP_ID`: The app ID to authenticate into core API.
- `APP_TOKEN`: App token to authenticate into core API.

## Running the API with Docker

Start the API and configure the environment variables.

```bash
docker run -p 3000:3000 -e CONNECTION_STRING=<MONGODB-CONNECTION-STRING> --name adia-finance-api -d lpsouza/adia-finance-api
```

If you need run the API without connecting to the database, this API will instance a MongoDB database in memory. Use this method to tests or demonstrations.

```bash
docker run -p 3000:3000 --name adia-finance-api -d lpsouza/adia-finance-api
```
