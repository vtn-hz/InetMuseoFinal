export default function Router () {
  
  const getRoutes = {};
  const get = (url, callback) => {
    getRoutes[url] = callback;
  }

  const postRoutes = {};
  const post = (url, callback) => {
    postRoutes[url] = callback;
  }

  const patchRoutes = {};
  const patch = (url, callback) => {
    patchRoutes[url] = callback;
  }

  const delRoutes = {};
  const del = (url, callback) => {
    delRoutes[url] = callback;
  }

  return {
    'get': get,
    'post': post,
    'patch': patch,
    'delete': del,
    'searchRoute':  (url, method) => {
      let route;
      switch( method ) {
        case 'GET': route = getRoutes[url]; 
        break;

        case 'POST': route = postRoutes[url]; 
        break;

        case 'PATCH': route = patchRoutes[url]; 
        break;

        case 'DELETE': route = delRoutes[url];
        break;

      } 
        return route;
    }
  }
}