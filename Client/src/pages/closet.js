import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import fetcher from "../components/db/fetcher";
// import {ClosetSpeedDial} from "../components/speeddials/speeddials";

import { DataGrid } from '@material-ui/data-grid';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';


const Closet = (props) => {
    const belongsTo = localStorage.getItem('loginState');
    const [open, setOpen] = useState(false)
    const [currentObj, setCurrentObj] = useState({});
    const [rows, setRows] = useState([]);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        fetcher.getClothes(belongsTo, (data) => {
            setRows(data.items);
        });
    }, [belongsTo]);
    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            width: window.innerWidth / 5,
        },
        {
            field: 'size',
            headerName: 'Size:',
            width: window.innerWidth / 5,
        },
        {
            field: 'style',
            headerName: 'Style',
            width: window.innerWidth / 5,
        },
        {
            field: 'isWashed',
            headerName: 'Clean ?',
            width: window.innerWidth / 5,
            renderCell: (params) => (<p>{params?.row?.isWashed ? 'Yes' : 'No'}</p>),
            // onCellDoubleClick: (params) => 
        },
        {
            field: 'picture',
            headerName: 'Picture',
            width: window.innerWidth / 5,
            renderCell: (params) => (<Button style={{margin: 'auto'}} onClick={handleOpen.bind(null, params)}><VisibilityIcon /></Button>)
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
            {/* <ClosetSpeedDial /> */}
            <div style={{ width: '100%', marginTop: "10vh" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row['_id']}
                    disableSelectionOnClick
                    autoHeight={true}
                    density='comfortable'
                    loading={!rows}
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
                    <Divider style={{margin: "2vh 0"}} />
                    <div style={{display: 'flex', justifyContent: "space-evenly"}}>
                        <IconButton
                        onClick={(ev) => {
                            if(favorites.indexOf(currentObj._id) === -1) {
                                fetcher.postFavorite(currentObj)
                                dispatch({type: "toggleFavorite", payload: currentObj._id})
                            } else {
                                fetcher.deleteFavorite(currentObj)
                                dispatch({type: "toggleFavorite", payload: currentObj._id})
                            }
                            window.location.reload();
                        }}
                        aria-label={`star ${currentObj.size}`}
                        >
                            {(currentObj.favorite || favorites.indexOf(currentObj._id) !== -1) ? (
                                <StarIcon />
                                ) : (
                                <StarBorderIcon />
                                )}
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                        onClick={() => {
                            fetcher.deleteCloth(currentObj);
                            window.location.reload();
                        }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                        onClick={() => {
                            fetcher.updateCloth(currentObj);
                            window.location.reload();
                        }}
                        >
                            <LocalLaundryServiceIcon />
                        </IconButton>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Closet;