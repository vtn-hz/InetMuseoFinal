import path, { dirname } from 'path';
import url from 'url'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import mime from 'mime-types'
//npm i mime-types


const lookup = mime.lookup;

export default function ServeStatic (req, res) {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");

  if (path == "") {
    path = "index.html";
  }

  const file = __dirname + "/static/" + path;
  fs.readFile(file, function(err, content) {
    if (err) {
      res.writeHead(404);
      res.end(`404 - NOT FOUND`);
    } else {
      res.setHeader("X-Content-Type-Options", "nosniff");
      // https://developer.mozilla.org/es/docs/Web/HTTP/Headers/X-Content-Type-Options
      const mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      res.end(content);
    }
  });
}