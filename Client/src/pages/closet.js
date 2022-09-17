import React, { useState, useEffect } from 'react';
import fetcher from "../components/db/fetcher";
import {ClosetSpeedDial} from "../components/speeddials/speeddials";

import { DataGrid } from '@material-ui/data-grid';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const Closet = (props) => {
    const belongsTo = localStorage.getItem('loginState');
    const [open, setOpen] = useState(false)
    const [currentObj, setCurrentObj] = useState({});
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetcher.getClothes(belongsTo, (data) => {
            setRows(data.items);
        });
    }, [belongsTo]);
    const columns = [
        {
            field: 'type',
            headerName: 'Type',
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
            renderCell: (params) => (<p>{params.row.isWashed ? 'Yes' : 'No'}</p>)
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

    return(
        <div className="closetDiv">
            <ClosetSpeedDial />
            <div style={{ height: 600, width: '100%', marginTop: "10vh" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row['_id']}
                    disableSelectionOnClick
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Image & Info</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <Divider  />
                    <img src={currentObj.image} alt="selected item" style={{maxWidth: "250px", maxHeight: "250px"}} />
                    <Divider style={{margin: "2vh 0"}}>
                        <Chip size="small" label="Attributes" variant="outlined" />
                    </Divider>
                    <Typography>Style: {currentObj.style}</Typography>
                    <Typography>Size: {currentObj.size}</Typography>
                    <Typography>Is it Clean ? {currentObj.isWashed ? "Yes" : "No"}</Typography>
                    <Divider style={{margin: "2vh 0"}}>
                        <Chip size="small" label="Added on" variant="outlined" />
                    </Divider>
                    <Typography>{currentObj.addedOn}</Typography>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Closet;