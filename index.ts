import http from "http";
import app from "./app";

var server = http.createServer(app);

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

server.listen(port);
