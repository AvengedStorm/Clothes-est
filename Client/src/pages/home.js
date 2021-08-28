import { connect } from 'react-redux';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useDispatch} from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import clothes from "../components/clothes/clothes";

import {
    Link
  } from "react-router-dom";

const Home = (props) => {

    const rows = clothes;

    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            type: 'number',
            width: 110,
        },
        {
            field: 'size',
            headerName: 'Size:',
            width: 150,
        },
        {
            field: 'style',
            headerName: 'Style',
            width: 150,
        },
        {
            field: 'isWashed',
            headerName: 'Is Washed',
            width: 150,
        },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 300,
            renderCell: (params) => (<img src={params.value}/>)
        }
    ];

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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch({type: "addItem", payload:{
            size,
            style,
            type,
            file
        }});
    }

    const useStyles = makeStyles((theme) => (
        {
            root: {
                width: '100%',
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
        }));
    
    const classes = useStyles();
        
    return (
        <div className="body" id="body">
                <h3 className="homeTitle">Welcome to your closet! What would you like to do?</h3>
                <ul className="closetMenuList">
                    <Accordion id="1" expanded={props.openAccordion === '1'}>
                        <AccordionSummary
                        onClick={e => props.dispatch({type: 'openAccordion', payload: '1'})}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography className={classes.heading}>View an item</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            <div style={{ height: 400, width: '1640px' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br />
                    <Accordion id="2" expanded={props.openAccordion === '2'}>
                        <AccordionSummary
                        onClick={e => props.dispatch({type: 'openAccordion', payload: '2'})}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Change an item</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            <div className="dialog2">
                                <ul className="typePicker2">
                                    <a href="/#"><li>Shirts</li></a>
                                    <br />
                                    <a href="/#"><li>Jeans</li></a>
                                    <br />
                                    <a href="/#"><li>Shorts</li></a>
                                    <br />
                                </ul>
                            </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br />
                    <Accordion id="3" expanded={props.openAccordion === '3'}>
                        <AccordionSummary
                        onClick={e => props.dispatch({type: 'openAccordion', payload: '3'})}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Add an item</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
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
                                    <input className="formLabel" onChange={handleFileChange} type="file" id="myFile" name="filename" />
                                    <img src={file} />
                                    <input className="btn btn-primary" type="submit" value="Submit" id="itemSubmit" />
                                </form>
                            </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br />
                </ul>    
                <br />
            </div>
    )
}
export default connect(state => {return {items: state.items, openAccordion: state.openAccordion}})(Home)