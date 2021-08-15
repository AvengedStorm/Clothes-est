import React, {useState} from 'react';

import Dialog from '@material-ui/core/Dialog';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Body = () => {
    const item = useSelector(state => state.item);
    const Dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    return (
        <div id="body" className="body">
            <h1>Welcome to your closet!</h1>
            <h2>What would you like to do?</h2>
            <ul className="closetMenuList">
                <a href="/#"><li>View an item</li></a>
                <a href="/#"><li>Add/Change an item</li></a>
            </ul>    
        </div>
    )
}

export default Body;