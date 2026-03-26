# Acquisitions API Docker Setup

This project supports two database modes:

- Development uses Neon Local in Docker to proxy to ephemeral Neon branches.
- Production uses a managed Neon Cloud database URL directly.

## Files

- `Dockerfile`: multi-stage image for development and production.
- `docker-compose.dev.yml`: runs the API and Neon Local together.
- `docker-compose.prod.yml`: runs only the API container. Neon Cloud remains an external managed service.
- `.env.development`: local Docker development settings.
- `.env.production`: production runtime settings.

## Environment Switching

The app loads environment files in this order at startup:

1. `.env`
2. `.env.<NODE_ENV>`

That means:

- `NODE_ENV=development` loads `.env.development`
- `NODE_ENV=production` loads `.env.production`

The database config also enables Neon Local HTTP mode automatically when either of these is true:

- `NEON_LOCAL_FETCH_ENDPOINT` is set
- `DATABASE_URL` points at `localhost`, `127.0.0.1`, or `neon-local`

## Local Development With Neon Local

Populate `.env.development` with your Neon project values:

- `NEON_API_KEY`
- `NEON_PROJECT_ID`
- `PARENT_BRANCH_ID`
- `JWT_SECRET`
- `ARCJET_KEY`

Important values already wired for Docker development:

- `DATABASE_URL=postgres://neon:npg@neon-local:5432/acquisitions?sslmode=require`
- `NEON_LOCAL_FETCH_ENDPOINT=http://neon-local:5432/sql`

`PARENT_BRANCH_ID` tells Neon Local to create an ephemeral branch derived from that parent branch. By default, the branch is deleted when the container stops because `DELETE_BRANCH=true`.

Start local development:

```bash
docker compose -f docker-compose.dev.yml up --build
```

The API will be available at `http://localhost:3000`.

Neon Local will be available inside the Compose network at `neon-local:5432` and on your host at `localhost:5432`.

Stop and remove containers:

```bash
docker compose -f docker-compose.dev.yml down
```

## Production With Neon Cloud

Populate `.env.production` with production secrets:

- `DATABASE_URL`
- `JWT_SECRET`
- `ARCJET_KEY`

Use the direct managed Neon connection string for `DATABASE_URL`, for example:

```env
DATABASE_URL=postgres://<user>:<password>@<project>.<region>.aws.neon.tech/<database>?sslmode=require&channel_binding=require
```

Start the production container:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Stop it:

```bash
docker compose -f docker-compose.prod.yml down
```

## Notes

- `docker-compose.prod.yml` does not start a database container because Neon Cloud is a managed external service, not something you run inside Compose.
- `.env`, `.env.development`, and `.env.production` are ignored by Git, so secrets stay out of version control.
- If you later want a persistent local branch per Git branch, mount `.neon_local/` and `.git/HEAD` into the Neon Local container and set `DELETE_BRANCH=false`.