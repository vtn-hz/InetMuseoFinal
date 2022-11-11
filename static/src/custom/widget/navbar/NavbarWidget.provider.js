import { NavbarHandler } from "./NavController";

export default function createNavbar ( routeMap, navRef ) {
    const NavClone = navRef.cloneNode(true).content.firstElementChild;
    const NavbarHandlerInstance = new NavbarHandler(NavClone, routeMap);
    return NavbarHandlerInstance;
}