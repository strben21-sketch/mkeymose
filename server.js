const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  const pathname = decodeURIComponent(
    (req.url || "/").split("?")[0]
  );

  if (pathname !== "/" && pathname !== "/index.html") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  fs.readFile(path.join(root, "index.html"), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Could not load the game hub.");
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache"
    });

    res.end(data);
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`Mega Hub running on port ${port}`);
});
