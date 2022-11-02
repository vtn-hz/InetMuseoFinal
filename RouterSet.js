export function SetRoute(router, path){
    typeof router.searchRoute(path, req.method) !== "undefined" 
    ? router.searchRoute(path, req.method) 
    : (req, res) => { res.writeHead(404); res.end('NOT FOUND') };
}
