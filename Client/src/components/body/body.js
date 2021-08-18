import React, {useState} from 'react';
import './body.css'
import Dialog from '@material-ui/core/Dialog';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import clothes from '../clothes/clothes';


const Body = () => {
    const item = useSelector(state => state.item);
    const Dispatch = useDispatch();

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);

    const Dialog1 = () => {
        return (
            <Dialog open={open1} onClose={handleClose1}>
                    <div className="dialog1">
                        {(clothes || []).map(clothes => 
                            <div className="clothItem">
                                <article className="clothCard">
                                    <h3>Name: {clothes.size}</h3>
                                    <h3>Style: {clothes.style}</h3>
                                    {clothes.picture ? <img className="clothPicture" src={clothes.picture} /> : <></>}
                                    {clothes.isWashed ? <p></p> : <h3>You need to wash this cloth.</h3>}
                                </article>
                            </div>
                            )}
                    </div>
            </Dialog>
        )
    }
    const Dialog2 = () => {
        return (
            <Dialog open={open2} onClose={handleClose2}>
                <div className="dialog2">
                    <ul className="typePicker2">
                        <a href="/#"><li>Shirts</li></a>
                        <br />
                        <br />
                        <a href="/#"><li>Jeans</li></a>
                        <br />
                        <br />
                        <a href="/#"><li>Shorts</li></a>
                        <br />
                        <br />
                    </ul>
                </div>
            </Dialog>
        )
    }
    const Dialog3 = () => {
        return (
            <Dialog open={open3} onClose={handleClose3}>
                <div className="dialog3">
                    <ul className="typePicker3">
                        <a href="/#"><li>Shirts</li></a>
                        <br />
                        <br />
                        <a href="/#"><li>Jeans</li></a>
                        <br />
                        <br />
                        <a href="/#"><li>Shorts</li></a>
                        <br />
                        <br />
                    </ul>
                </div>
            </Dialog>
        )
    }

    return (
        <div>
            <div id="body" className="body">
                <h1>Welcome to your closet! What would you like to do?</h1>
                <ul className="closetMenuList">
                    <a href="/#" className="closetMenuListItem" onClick={handleOpen1}><li>View an item</li></a>
                    <br />
                    <a href="/#" className="closetMenuListItem" onClick={handleOpen2}><li>Change an item</li></a>
                    <br />
                    <a href="/#" className="closetMenuListItem" onClick={handleOpen3}><li>Add an item</li></a>
                    <br />
                </ul>    
                <br />
            </div>
            <div>
                <Dialog1 />
                <Dialog2 />
                <Dialog3 />
            </div>
        </div>
    )
}

export default Body;