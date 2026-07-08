# Attesta

> Attesta is a full-stack project with a visible product surface and supporting service layer.

## The Story

Attesta starts with a simple goal: keep the product experience and the service layer visible in one place. Its shape tells the same story: the product interface and the service layer live close enough together that a maintainer can see the project as a whole before diving into individual folders.

## What It Includes

- A user-facing surface for the product, demo, dashboard, or static experience.
- A service layer for APIs, realtime behavior, bot logic, or server-side workflows.

## How It Is Put Together

| Path | Role |
| --- | --- |
| `.gitignore` | ignored local, dependency, and build files |
| `Architecture diagram.png` | project file or folder |
| `university` | project file or folder |
| `user` | project file or folder |

## Local Development

```bash
git clone https://github.com/ENZOMOTIVE/Attesta.git
cd Attesta
```

```bash
cd university
npm install
npm start
```

```bash
cd user
npm install
npm start
```

## Command Surface

| Area | Commands |
| --- | --- |
| `university/package.json` | `start`, `build`, `test`, `eject`, `postinstall` |
| `user/package.json` | `start`, `build`, `test`, `eject` |

## Configuration

- Document API ports, database URLs, third-party credentials, and service endpoints in `.env.example` before deployment.
- Keep wallet private keys, RPC URLs, mnemonics, and contract secrets outside version control.

## Quality Checks

- From `university`, run `npm test`.
- From `university`, run `npm run build`.
- From `user`, run `npm test`.
- From `user`, run `npm run build`.

## Where To Take It Next

- Add screenshots or a short user flow so visitors can see the interface before running it.
- Document the main API routes, bot events, or service responsibilities with example inputs and outputs.
- Keep setup commands current whenever dependencies, scripts, or deployment targets change.
- Record important product decisions here so the repository keeps its story as the code evolves.

## Project Metadata

| Field | Details |
| --- | --- |
| Repository | `ENZOMOTIVE/Attesta` |
| Categories | `Full Stack`, `Protocol` |
| Primary stack | React, Express, Node.js, JavaScript, HTML, CSS |


## License

No license file is currently committed. Add one before distributing this project publicly.
