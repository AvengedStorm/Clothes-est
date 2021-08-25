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

    const CustomDialog = (props) => {
        return (
            <Dialog open={props.isOpen} onClose={props.closeFunction}>
                {props.content || props.children}
            </Dialog>
        )
    }
    // const Dialog1 = () => {
    //     return (
    //         <Dialog open={open1} onClose={handleClose1}>
    //                 <div className="dialog1">
    //                     {(clothes || []).map(clothes => 
    //                         <div className="clothItem">
    //                             <article className="clothCard">
    //                                 <h3 className="clothSize">Size: {clothes.size} | Style: {clothes.style}</h3>
    //                                 <div className="clothPicture">
    //                                     {clothes.picture ? <img className="cloth" src={clothes.picture} /> : <></>}
    //                                     {clothes.isWashed ? <></> : <h3 className="isWashed">You need to wash this cloth.</h3>}
    //                                 </div>
    //                             </article>
    //                         </div>
    //                         )}
    //                 </div>
    //         </Dialog>
    //     )
    // }
    const Dialog2 = (data) => {
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
        const [size, setSize] = useState("");
        const [style, setStyle] = useState("");
        const [type, setType] = useState("");
        const [file, setFile] = useState("");

        const handleFileChange = (e) => {
            setFile({file: URL.createObjectURL(e.target.files[0])})
        };
        const handleChange1 = (e) => {
            setSize(e.target.value);
        };
        const handleChange2 = (e) => {
            setStyle(e.target.value);
        };
        const handleChange3 = (e) => {
            setType(e.target.value);
        };
        const handleChange4 = (e) => {
            setFile(e.target.value);
        };

        const handleSubmit = (evt) => {
            evt.preventDefault();
            alert(`Submitting Item: 
                    Size: ${size}
                    Type: ${type}
                    Style: ${style}
                    Picture: ${file}
                    `)
        }
        return (
            <Dialog open={open3} onClose={handleClose3}>
                <div className="dialog3">
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="formLabel">Size:</label>
                        <select onChange={handleChange1} className="formLabel">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <label className="formLabel">Style:</label>
                        <select onChange={handleChange2} className="formLabel">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option>Elegant</option>
                            <option>Sport</option>
                            <option>Official</option>
                            <option>Sport Elegant</option>
                            <option>Comfort</option>
                        </select>
                        <label className="formLabel">Type:</label>
                        <select onChange={handleChange3} className="formLabel">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option>Shirts</option>
                            <option>Jeans</option>
                            <option>Shorts</option>
                        </select>
                        <input className="formLabel" onChange={handleChange4} type="file" id="myFile" name="filename" />
                        <img src={file} />
                        <input className="formLabel" type="submit" value="Submit"/>
                    </form>
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
                <Dialog2 />
                <Dialog3 />
            </div>
        </div>
    )
}

export default Body;