import http from 'http'
import url from 'url'


import { router } from './RouterSet.js';

const PORT = 5000;

const server = http.createServer(function(req, res) {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;

  path = path.replace(/^\/+|\/+$/g, "");

  req.on("data", buffer => {
      const strJSON = buffer.toString('utf-8')
      req.body = req.method == 'GET'? JSON.parse(JSON.stringify(strJSON)) : JSON.parse(strJSON)
      req.params = JSON.parse(JSON.stringify(parsedURL.query));
  });
  req.on("end", _ => {
    const route = 
      typeof router.searchRoute(path, req.method) !== "undefined" 
      ? router.searchRoute(path, req.method) 
      : (req, res) => { res.writeHead(404); res.end('NOT FOUND') };

    route(req, res);
  });
});

server.listen(5000, function() {
  console.log(`LISTEN ON PORT ${PORT}`);
});