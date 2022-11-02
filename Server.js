import http from 'http'
import url from 'url'
import ServeStatic from './StaticSolver.js';


import router from './RouterSet.js';




const PORT = 5000;


const server = http.createServer(function(req, res) {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;

  path = path.replace(/^\/+|\/+$/g, "");

  req.on("data", buffer => {
    const strJSON = buffer.toString('utf-8');
    req.body = JSON.parse(strJSON);
    req.params = JSON.parse(JSON.stringify(parsedURL.query));
  }); 
  req.on("end", _ => {
    const route = 
      typeof router.searchRoute(path, req.method) !== "undefined" 
      ? router.searchRoute(path, req.method) 
      : ServeStatic;

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
      res.setHeader('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
      

      if (req.method == 'OPTIONS') {
        console.log('-------------------------------------------')
        res.writeHead(200);
        res.end();
      }else{
        route(req, res);
      }
      
  });
});

server.listen(PORT, _ => {
  console.log(`LISTEN ON PORT ${PORT}`);
});