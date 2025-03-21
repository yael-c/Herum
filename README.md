## How To Run The Project

### Prerequisites

- Node.js version compatible with `angular v14` (works on `v22.14.0` as well).
- Dotnet (works with `7.0.401`).
- Python3 and C++ build tools. Required by `node-sass` as it uses
  `node-gyp` [official instructions](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-unix)
- Pull the relevant nuget API for `dotnet run` to successfully build.

### Backend

```bash
  cd backend
  dotnet run
```

### Frontend

1. Install dependencies

```bash
  npm ci
```

2. Run the dev server

```bash
  npm run start
```

> Note:
> For dev server clear the browser's local storage on `localhost:4200` as the backend is non-persistent with holding
> session-id  
