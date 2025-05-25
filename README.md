# AI Electron

A cross-platform desktop application powered by Electron and AI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install Dependencies

```bash
# Install all dependencies including dev dependencies
yarn install
```

### Development Mode

```bash
# Start both React dev server and Electron
yarn dev

# Or start them separately:
yarn start    # Start React dev server
yarn electron:dev  # Start Electron in dev mode
```

### Build for Production

```bash
# Build React and Electron apps
yarn electron:build
```

### Project Structure

```
ai-electron/
├── public/          # Static assets
├── src/
│   ├── main/       # Electron main process
│   │   └── main.js
│   └── renderer/   # React application
│       ├── components
|           ├── App.tsx
|           ├── styles
|               ├── app.css
|       ├── types
|           ├── index.ts
│       └── index.tsx
└── package.json
```

### Available Scripts

- `yarn start` - Start React development server
- `yarn electron:dev` - Start Electron in development mode
- `yarn dev` - Start both React and Electron for development
- `yarn build` - Build React application
- `yarn electron:build` - Build and package the application
- `yarn test` - Run tests

### Test linux deployments
- appImage - `./dist/ai-electron-1.0.0.AppImage`
- deb package:
  ```bash
  # Install the .deb file using apt
  sudo apt install ./dist/ai-electron_1.0.0_amd64.deb

  # Alternatively, you can use dpkg
  sudo dpkg -i ./dist/ai-electron_1.0.0_amd64.deb
  sudo apt-get install -f  # Install dependencies if needed
  ```

### Development Notes

- React dev server runs on `http://localhost:3000`
- Hot reload is enabled for React components
- DevTools are automatically opened in development mode
- Production builds are created in the `dist` directory

## License

MIT