import {Link, NavLink} from "react-router-dom";
import React from "react";
import {Routes} from "./Routes";

export function Nav() {
    return (
        <div>
            <nav className="row">
                <div>
                    <NavLink to={Routes.Home} activeClassName="selected">Home</NavLink>
                </div>
                <div>
                    <NavLink to={Routes.MapEditor} activeClassName="selected">Map</NavLink>
                </div>
                <div>
                    <NavLink to={Routes.Tiler} activeClassName="selected">Tiler</NavLink>
                </div>
                <div>
                    <NavLink to={Routes.CharEditor} activeClassName="selected">Char Ed</NavLink>
                </div>
                <div>
                    <NavLink to={Routes.ItemEditor} activeClassName="selected">Item Ed</NavLink>
                </div>
                <div>
                    <NavLink to={Routes.SpellEditor} activeClassName="selected">Spell Ed</NavLink>
                </div>
            </nav>
        </div>
    )
}