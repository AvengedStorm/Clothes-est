import { connect } from 'react-redux';
import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {useDispatch} from 'react-redux';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Home = (props) => {

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
        const dispatch = useDispatch();
        
        const [size, setSize] = useState("");
        const [style, setStyle] = useState("");
        const [type, setType] = useState("");
        const [file, setFile] = useState("");
    
        const handleFileChange = (e) => {
            setFile({file: URL.createObjectURL(e.target.files[0])})
        };
        const handleChange1 = (e) => setSize(e.target.value);
        const handleChange2 = (e) => setStyle(e.target.value);
        const handleChange3 = (e) => setType(e.target.value);
        const handleChange4 = (e) => setFile(e.target.value);
    
        const handleSubmit = (evt) => {
            evt.preventDefault();
            dispatch({type: "addItem", payload:{
                size,
                style,
                type,
                file
            }});
            handleClose3();
        }
        return (
            <Dialog open={open3} onClose={handleClose3}>
                <div className="dialog3">
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="formLabel">Size:</label>
                        <select onChange={handleChange1} className="formLabel" defaultValue="Choose Size">
                            <option value="Choose Size" disabled>Choose Size</option>
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <br />
                        <label className="formLabel">Style:</label>
                        <select onChange={handleChange2} className="formLabel" defaultValue="Choose Style">
                            <option value="Choose Style" disabled>Choose Style</option>
                            <option>Elegant</option>
                            <option>Sport</option>
                            <option>Official</option>
                            <option>Sport Elegant</option>
                            <option>Comfort</option>
                        </select>
                        <br />
                        <label className="formLabel">Type:</label>
                        <select onChange={handleChange3} className="formLabel" defaultValue="Choose a type">
                            <option value="Choose a type" disabled>Choose a type</option>
                            <option>Shirts</option>
                            <option>Jeans</option>
                            <option>Shorts</option>
                        </select>
                        <br />
                        <label className="formLabel">File:</label>
                        <input className="formLabel" onChange={handleChange4} type="file" id="myFile" name="filename" />
                        <img src={file} />
                        <input className="btn btn-primary" type="submit" value="Submit" id="itemSubmit" />
                    </form>
                </div>
            </Dialog>
        )
    }
    
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);


    return (
        <div className="body" id="body">
                <h3 className="homeTitle">Welcome to your closet! What would you like to do?</h3>
                <ul className="closetMenuList">
                    <Link to="/closet"><li>View an item</li></Link>
                    <br />
                    <a href="/#" className="closetMenuListItem" onClick={handleOpen2}><li>Change an item</li></a>
                    <br />
                    <a href="/#" className="closetMenuListItem" onClick={handleOpen3}><li>Add an item</li></a>
                    <br />
                </ul>    
                <br />
                <Dialog2 />
                <Dialog3 />
            </div>
    )
}
export default connect(state => {return {items: state.items}})(Home)