import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import fetcher from "../components/db/fetcher";
import {ClosetSpeedDial} from "../components/speeddials/speeddials";

import { DataGrid } from '@material-ui/data-grid';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';


const Closet = (props) => {
    const belongsTo = useSelector(state => state.belongsTo);
    useEffect(() => {
        fetcher.getClothes(belongsTo, (data) => {
            setRows(data.items);
        });
    }, [belongsTo]);
    const [open, setOpen] = useState(false)
    const [currentObj, setCurrentObj] = useState({});
    const [rows, setRows] = useState([]);
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
            width: 110,
        },
        {
            field: 'style',
            headerName: 'Style',
            width: 120,
        },
        {
            field: 'isWashed',
            headerName: 'Ready to use ?',
            width: 170,
        },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 200,
            renderCell: (params) => (<Button onClick={handleOpen.bind(null, params)}>Open image & info</Button>)
        }
    ];
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (params) => {
        setCurrentObj(params.row);
        setOpen(true);
    };
    // const imageListItemStyle = {
    //     width: "196px", 
    //     height: "196px", 
    //     zIndex: "100",
    // };
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //         justifyContent: 'space-around',
    //         overflow: 'hidden',
    //         backgroundColor: theme.palette.background.paper,
    //     },
    //     imageList: {
    //         display: "flex",
    //         flexDirection: "row",
    //         transform: 'translateZ(0)',
    //     },
    //     title: {
    //         color: "white",
    //     },
    //     titleBar: {
    //         background:
    //         'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    //     },
    //     image: {
    //         width: 196 + "px",
    //         height: 196 + "px",
    //     },
    //     speedDial: {
    //         position: 'fixed',
    //         top: "7vh",
    //         right: "1vw",
    //     },
    // }));
    
    // const classes = useStyles();

    return(
        <div className="closetDiv">
            <div>
                <ClosetSpeedDial />
            </div>
            <div style={{ height: 400, width: '100%', marginTop: "10vh" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}ת
                    getRowId={(row) => row['_id']}
                    disableSelectionOnClick
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Image & Info</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <img src={currentObj.image} alt="" style={{maxWidth: "250px", maxHeight: "250px"}} />
                    <br />
                    <Typography>Item Style: {currentObj.style}</Typography>
                    <Typography>Item Size: {currentObj.size}</Typography>
                    <Typography>Is it Clean ? {currentObj.isWashed ? "Yes" : "No"}</Typography>
                    <br />
                    <Typography>Item Added on: {currentObj.addedOn}</Typography>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Closet;