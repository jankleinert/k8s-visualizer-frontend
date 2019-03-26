
Frontend for the k8s-visualizer-backend. Written using React, SVG, and socket.io to visualize pods, services, and deployments on a Kubernetes cluster.

## How to run

In the project directory, you can run:

```
export BACKEND_HOST=<hostname.of.your.k8s-visualizer-backend.com>
node server.js
```

Do not include the protocol as part of the BACKEND_HOST.

This will start the server component, which communicates with k8s-visualizer-backend.

```
yarn start
```
This starts the React app, which communicates with the server component via websockets.

Access the frontend at http://localhost:3000
