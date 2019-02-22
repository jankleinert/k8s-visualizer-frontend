
## How to run

In the project directory, you can run:

```
export BACKEND_HOST=<the URL of your k8s-visualizer-backend service>
node server.js
```

This will start the server component, which communicates with k8s-visualizer-backend.

```
yarn start
```
This starts the React app, which communicates with the server component via websockets.

Access the frontend at http://localhost:3000
