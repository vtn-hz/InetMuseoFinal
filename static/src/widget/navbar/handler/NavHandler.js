

function NavbarHandler (Nav, routeMap) {

    function setRoutes () {
        const keys = Object.keys(routeMap);

        keys.forEach(key => {
            const A_HREF = Nav.querySelector('#'+key);
            A_HREF.addEventListener('click', routeMap[key])
        })
    }

    this.getNavbar = () => {
        setRoutes();
        return Nav;
    }
}

export default function createNavbar ( routeMap, navRef ) {
    const NavClone = navRef.cloneNode(1).content.firstElementChild;
    const Nav = new NavbarHandler(NavClone, routeMap);
    return Nav;
}