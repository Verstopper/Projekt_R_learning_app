import React from "react";
import {Link} from "react-router-dom";

const navbar = () => {
    return(
        <div>
            <li>
                <Link to = '/'>Početna stranica</Link>
            </li>
        </div>
    )
}

export default navbar;