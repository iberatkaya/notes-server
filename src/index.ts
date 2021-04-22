import http from "http";
import app from "./app";

const server = http.createServer(app);

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

server.listen(port);
