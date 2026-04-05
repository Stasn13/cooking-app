# Cooking App SSE Client

A small React + TypeScript app built with Vite that connects to
`GET http://api.dev.cooking.gg/kitchen/stove`, sends a JWT in the
`Authorization: Bearer <JWT>` header, and logs the server response to the browser
console.

## Run Locally

1. Create a local `.env` file from the example:

```bash
cp .env.example .env
```

2. Fill in your JWT inside `.env`:

```env
VITE_STOVE_URL=http://api.dev.cooking.gg/kitchen/stove
VITE_STOVE_CHAIN=solana
VITE_STOVE_JWT=PASTE_YOUR_JWT_HERE
```

3. Install dependencies and start the app:

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Environment Variables

- `VITE_STOVE_URL` - SSE endpoint.
- `VITE_STOVE_CHAIN` - required query param. Supported values: `solana`, `bsc`, `base`. Defaults to `solana`.
- `VITE_STOVE_JWT` - JWT token used in the `Authorization` header.

The `.env` file is included in `.gitignore`, so the token is not committed to
the repository. The `.env.example` file is safe to commit so other developers
know which variables are required.

## Request Headers

The request to `stove` uses these headers and query params:

```http
GET /kitchen/stove?chain=solana
Authorization: Bearer <JWT>
Accept: text/event-stream
Cache-Control: no-cache
```

## Why Native EventSource Cannot Be Used

The browser's native `EventSource` API does not allow custom headers. Because of
that, it cannot send `Authorization: Bearer <JWT>`, which is required by this
API.

That is why this project uses a different approach:

1. The connection is opened with `fetch`.
2. Required headers are passed into `fetch`, including `Authorization`.
3. The response is read as a `ReadableStream`.
4. The stream is parsed manually as SSE: messages are separated by blank lines,
   and the `event`, `id`, and `data` fields are assembled into event objects.

## Current Behavior

- The app opens the `stove` connection automatically on startup.
- Incoming SSE messages are parsed and printed with `console.log`.
- If the JWT is missing, the app logs a startup message instead of making the request.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
```
