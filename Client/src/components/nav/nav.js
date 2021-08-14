import React from 'react';

const NavBar = () => {
    return (
        <div id="navbar" className="navBar">
            <h1>Clothes-est!</h1>
            <ul>
                <a href="#"><li className="navItem">Shirts</li></a>
                <a href="#"><li className="navItem">Jeans</li></a>
                <a href="#"><li className="navItem">Shorts</li></a>
            </ul>
            <br />
        </div>
    )
}

export default NavBar;