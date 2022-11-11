

export function NavbarHandler (Nav, routeMap) {

    function setRoutes () {
        const keys = Object.keys(routeMap);

        keys.forEach(key => {
            const A_HREF = Nav.querySelector('#'+key);
            A_HREF.addEventListener('click', routeMap[key])
        })
    }

    this.getNavbar = () => {
        return Nav;
    }

    function onCreate () {
        setRoutes();
    } onCreate();

}

