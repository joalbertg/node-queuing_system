# Queuing System

### Installs

With `package.json` and dependencies added
```shell
docker-compose run app yarn
```

Without dependencies
```shell
docker-compose run app yarn add express socket.io
docker-compose run app yarn add nodemon --dev
```

### Start project

```shell
docker-compose up
```

### Project Structure

> run `tree -I "node_modules"`
```shell
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package.json
├── public
│   ├── audio
│   │   └── new-ticket.mp3
│   ├── css
│   │   └── style.css
│   ├── escritorio.html
│   ├── index.html
│   ├── js
│   │   ├── socket-desktop.js
│   │   ├── socket-new-ticket.js
│   │   └── socket-public.js
│   ├── nuevo-ticket.html
│   └── publico.html
├── server
│   ├── classes
│   │   ├── index.js
│   │   ├── ticket-control.js
│   │   └── ticket.js
│   ├── db
│   │   └── data.json
│   ├── server.js
│   └── socket
│       └── socket.js
└── yarn.lock

8 directories, 20 files
```

