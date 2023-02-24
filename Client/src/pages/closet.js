import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import Carousel from '../components/Carousel/Carousel';

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
import CloseIcon from '@mui/icons-material/Close';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import backgroundImage from './pictures/bgimage.jpeg';

const Closet = (props) => {

    const belongsTo = localStorage.getItem('loginState');
    const [open1, setOpen1] = useState(false)
    const [currentObj, setCurrentObj] = useState({});
    const [rows, setRows] = useState([]);
    const [shouldReload,setShouldReload] = useState(false);
    
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    const tableWidth = (window.innerWidth / 3) * 2

    useEffect(() => {
        fetcher.getClothes(belongsTo, (data) => {
            setRows(data.items);
        });
        setShouldReload(false);
    }, [belongsTo, shouldReload]);
    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            width: tableWidth / 6,
        },
        {
            field: 'size',
            headerName: 'Size:',
            width: tableWidth / 6,
        },
        {
            field: 'style',
            headerName: 'Style',
            width: tableWidth / 6,
        },
        {
            field: 'isWashed',
            headerName: 'Clean ?',
            width: tableWidth / 6,
            renderCell: (params) => (<p style={{margin: '0'}}>{params?.row?.isWashed ? 'Yes' : 'No'}</p>),
        },
        {
            field: 'favorite',
            headerName: 'Favorited ?',
            width: tableWidth / 6,
            renderCell: (params) => (<p style={{margin: '0'}}>{params?.row?.favorite ? 'Yes' : 'No'}</p>),
        },
        {
            field: 'picture',
            headerName: 'Picture',
            width: tableWidth / 6,
            renderCell: (params) => (<Button onClick={handleOpen1.bind(null, params)}><VisibilityIcon /></Button>)
        }
    ];
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleOpen1 = (params) => {
        setCurrentObj(params.row);
        setOpen1(true);
    };

    const styles = {
        container: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
        }
    };

    //? Snackbars

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const onLoad = (message) => {
        setMessage(message);
        handleClick();
    };
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    function SimpleSnackbar() {
        return (
          <div>
            <Snackbar open={open} action={action} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="info">
                    {message}
                </Alert>
            </Snackbar>
          </div>
        );
    }

    return(
        <div className="closetDiv" style={styles.container}>
            <div style={{marginLeft: '2vw' ,width: tableWidth, marginTop: "10vh", display: 'inline-block' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rows.length}
                    getRowId={(row) => row['_id']}
                    disableSelectionOnClick
                    autoHeight={true}
                    density='comfortable'
                    loading={!rows}
                    stickyHeader
                    rowHeight={40}
                />
            </div>
            <Dialog open={open1} onClose={handleClose1}>
                <DialogTitle>Image & Info</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <Divider  />
                    <img src={currentObj.image} alt="selected item" style={{maxWidth: "250px", maxHeight: "250px"}} />
                    <Divider style={{margin: "2vh 0"}}>
                        <Chip size="small" label="Attributes" variant="outlined" />
                    </Divider>
                    <Typography>Style: {currentObj.style}</Typography>
                    <Typography>Size: {currentObj.size}</Typography>
                    <Typography>Ready to use ? {currentObj.isWashed ? "Yes" : "No"}</Typography>
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
                                setShouldReload(true);
                                onLoad('Favorite added!')
                            } else {
                                fetcher.deleteFavorite(currentObj)
                                dispatch({type: "toggleFavorite", payload: currentObj._id})
                                setShouldReload(true);
                                onLoad('Favorite removed!')
                            }
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
                            setShouldReload(true);
                            onLoad('Item deleted successfully!')
                        }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                        onClick={() => {
                            fetcher.updateCloth(currentObj);
                            setShouldReload(true);
                            onLoad('Item updated successfully!')
                            setOpen1(false);
                            setOpen1(true);
                        }}
                        >
                            <LocalLaundryServiceIcon />
                        </IconButton>
                    </div>
                </DialogContent>
            </Dialog>
            <SimpleSnackbar />
            {/* <Carousel /> */}
        </div>
    )
}

export default Closet;