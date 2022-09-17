import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import fetcher from '../components/db/fetcher';
import { HomeSpeedDial } from "../components/speeddials/speeddials";

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Drawer } from '@material-ui/core';
import Divider from '@mui/material/Divider';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
let drawerWidth = "320px";


const Home = (props) => {
    const [text, setText] = useState("")
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [type, setType] = useState("");
    const [isWashed, setIsWashed] = useState(true);
    const [image, setImage] = useState("");
    const [value, setValue] = useState(0);
    
    const [hatsArray, setHatsArray] =  useState([]);
    const [jacketsArray, setJacketsArray] = useState([]);
    const [shirtsArray, setShirtsArray] = useState([]);
    const [jeansArray, setJeansArray] = useState([]);
    const [footersArray, setFootersArray] = useState([]);
    const [shortsArray, setShortsArray] = useState([]);
    const [shoesArray, setShoesArray] = useState([]);
    
    const dispatch = useDispatch();

    const itemObj = useSelector(state => state.items);
    const favorites = useSelector(state => state.favorites);
    const checkedOut = useSelector(state => state.checkedOut);
    // const clothesDrawer = useSelector(state => state.clothesDrawer);
    const openAccordion = useSelector(state => state.openAccordion);
    const openDialog = useSelector(state => state.openDialog);
    const belongsTo = localStorage.getItem('loginState');
    const localBelongTo = belongsTo;
    
    useEffect(() => {
        fetcher.getClothes(belongsTo, (data) => {
            setHatsArray(data.items.filter(el => el.type === "hats"));
            setJacketsArray(data.items.filter(el => el.type === "jackets"));
            setShirtsArray(data.items.filter(el => el.type === "shirts"));
            setJeansArray(data.items.filter(el => el.type === "jeans"));
            setFootersArray(data.items.filter(el => el.type === "footers"));
            setShortsArray(data.items.filter(el => el.type === "shorts"));
            setShoesArray(data.items.filter(el => el.type === "shoes"));
            favorites.push(data.items.filter(i => i.favorite));
        });
    },[belongsTo, favorites]);
    
    const itemObject = {
        type,
        style,
        size: (size === "other" ? text : size),
        isWashed,
        image,
        belongsTo
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleItemSubmit = (evt) => {
        // evt.preventDefault();
        const sizeDecider = size === "other" ? text : size;
        let item = {
            size: sizeDecider,
            style: style,
            type: type,
            isWashed: isWashed,
            image,
        }
        dispatch({type: "addItem", payload: item});
    };
    const imageListItemStyle = {
        width: "200px", 
        height: "200px", 
        zIndex: "100",
    };
    const useStyles1 = makeStyles((theme) => (
        {
            root: {
                width: '93vw',
                paddingLeft: 0,
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
            media: {
                height: 150,
                width: 150,
            },
            form: {
                // margin: 'auto',
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
            }
    }));
    const useStyles2 = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        imageList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: "white",
        },
        titleBar: {
            background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        image: {
            width: 196 + "px",
            height: 196 + "px",
        },
    }));
    const useStyles3 = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25vh',
            },
        },
    }));
    const handleDrawerClose = () => {
        dispatch({type: "clothesDrawer", payload: false });
    };
    const [error, setError] = useState(false);
    const ErrorDialog = () => {
        return (
            <Dialog open={error} onClose={() => setError(false)}>
                <DialogTitle>Error!</DialogTitle>
                <DialogContent>
                    <Typography>All parameters are required</Typography>
                </DialogContent>
            </Dialog>
        )
    }
    if(!localBelongTo) {
        dispatch({type: "login", payload: belongsTo});
    }
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    
    const renderCheckbox = (item) => {
        let isCheckedOut = checkedOut.includes(item);
        return (
            <Checkbox
            onClick={(e) => dispatch({type: "checkedOut", payload: item})}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="primary"
            z-index="9999"
            position="absolute"
            label={isCheckedOut ? "Remove me from set" : "Add me to the set"}
            checked={isCheckedOut} 
            />
            )
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const AddingDialog = () => {
        const Form = () => {
            const [style1, setStyle1] = useState('');
            const [size1, setSize1] = useState('');
            const [text1, setText1] = useState('');
            const [type1, setType1] = useState('');
            const [isWashed1, setIsWashed1] = useState(true);
            const [image1, setImage1] = useState('');
            const itemObj1 = {
                type1,
                style1,
                size1: (size === "other" ? text1 : size1),
                isWashed1,
                image1,
                belongsTo
            };
            const handleFileSelection1 = (file) => {
                toBase64(file).then(setImage1);
            }

            return (
                <form className={classes3.root} onSubmit={handleItemSubmit}>
                        <label className="formLabel">Size:</label>
                        <select className="formLabel1" onChange={(e) => setSize1(e.target.value)} defaultValue="Choose Size" value={itemObj.size1} required>
                            <option value="Choose Size" disabled>Choose Size</option>
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="XXXL">XXXL</option>
                            <option value="other">Other...</option>
                        </select>
                        {size1 === 'other' ? <input onChange={(e) => {setText1(e.target.value)}} className="formLabel1" placeholder="Enter a Size"/> : <></>}
                        <br />
                        <label className="formLabel">Style:</label>
                        <select className="formLabel1" onChange={(e) => setStyle1(e.target.value)} defaultValue="Choose Style" value={itemObj1.style} required>
                            <option value="Choose Style" disabled>Choose Style</option>
                            <option value="casual">Casual</option>
                            <option value="geeky">Geeky</option>
                            <option value="elegant">Elegant</option>
                            <option value="sport">Sport</option>
                            <option value="formal">Formal</option>
                            <option value="sport elegant">Sport Elegant</option>
                            <option value="comfort">Comfort</option>
                            <option value="maternity">Maternity</option>
                            <option value="hip hop">Hip Hop</option>
                            <option value="military">Military</option>
                            <option value="exotic">Exotic</option>
                            <option value="trendy">Trendy</option>
                            <option value="ethnic">Ethnic</option>
                            <option value="gothic">Gothic</option>
                        </select>
                        <br />
                        <label className="formLabel">Type:</label>
                        <select className="formLabel1" onChange={(e) => setType1(e.target.value)} defaultValue="Choose a type" value={itemObj1.type} required>
                            <option value="Choose a type" disabled>Choose a type</option>
                            <option value="shirts">Hat</option>
                            <option value="shirts">Shirt</option>
                            <option value="jackets">Jacket</option>
                            <option value="footers">Footers</option>
                            <option value="jeans">Jeans</option>
                            <option value="shorts">Shorts</option>
                            <option value="shoes">Shoes</option>
                        </select>
                        <br />
                        <label className="formLabel">Is it clean ?</label>
                        <select className="formLabel1" onChange={(e) => setIsWashed1(e.target.value)} defaultValue="Is it clean ?" value={itemObj1.isWashed} required>
                            <option value="Is it clean ?" disabled>Is it clean ?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <br />
                        <label className="formLabel">File:</label>
                        <input className="formLabel1" onChange={(e) => {handleFileSelection1(e.target.files[0]);}} type="file" id="myFile" name="filename" value={itemObj1.image} required/>
                        <br />
                        <img src={image1} alt="" />
                        <br />
                        <Button
                        color="secondary"
                        fullWidth
                        endIcon={<DoneIcon />}
                        onClick={(e) => {
                            if(size1 && image1 && type1 && style1) {
                                fetcher.postClothes(itemObj1);
                                window.location.reload();
                            } else {
                                alert('Must Choose all parameters...')
                            }
                            }}>
                            Save Item
                        </Button>
                        <Button
                        color="secondary"
                        fullWidth
                        endIcon={<ClearIcon />}
                        onClick={() => dispatch({type: 'openDialog'})}>
                            Nevermind
                        </Button>
                    </form>
            )
        }
        return (
            <Dialog open={openDialog} onClose={() => dispatch({type: 'openDialog'})}>
                <DialogTitle>Add a new item</DialogTitle>
                <DialogContent className={classes1.form}>
                    <Form />
                </DialogContent>
            </Dialog>
        )
    }
    const handleFileSelection = (file) => {
        toBase64(file).then(setImage);
    }
    const renderArray = (item) => {
        return (
            <ImageListItem id="imageList" key={item._id} style={imageListItemStyle}>
                {renderCheckbox(item)}
                <img src={item.image} alt={item.type + " | " + item.size} style={{width: "196px", height: "196px"}} />
                <ImageListItemBar
                title={item.size + " | " + item.style}
                classes={{
                    root: classes2.titleBar,
                    title: classes2.title,
                }}
                actionIcon={
                    <IconButton
                    onClick={(ev) => {
                        if(favorites.indexOf(item._id) === -1) {
                            fetcher.postFavorite(item)
                            dispatch({type: "toggleFavorite", payload: item._id})
                        } else {
                            fetcher.deleteFavorite(item)
                            dispatch({type: "toggleFavorite", payload: item._id})
                        }
                        console.log(favorites)
                    }}
                    aria-label={`star ${item.size}`}
                    >
                        {(item.favorite || favorites.indexOf(item._id) !== -1) ? (
                            <StarIcon />
                            ) : (
                            <StarBorderIcon />
                            )}
                    </IconButton>
                }
                />
            </ImageListItem>
            )
    }
    return (
        <div className="body" id="body">
            <HomeSpeedDial />
            <h3 className="homeTitle" style={{marginTop: "10vh", marginLeft: "2vw"}}>Welcome to your closet! What would you like to do?</h3>
            <br />
            <div className={classes1.root}>
                <AppBar position="static" style={{marginLeft: "3vw"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="type tabs" variant="fullWidth">
                        <Tab label="Hats" {...a11yProps(0)} />
                        <Tab label="Jackets" {...a11yProps(1)} />
                        <Tab label="Shirts" {...a11yProps(2)} />
                        <Tab label="Jeans" {...a11yProps(3)} />
                        <Tab label="Footers" {...a11yProps(4)} />
                        <Tab label="Shorts" {...a11yProps(5)} />
                        <Tab label="Shoes" {...a11yProps(6)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} disabled={hatsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {hatsArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} disabled={jacketsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jacketsArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} disabled={shirtsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shirtsArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3} disabled={jeansArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jeansArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4} disabled={footersArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {footersArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5} disabled={shortsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shortsArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={6} disabled={shoesArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shoesArray.map(renderArray)}
                        </ImageList>
                    </div>
                </TabPanel>
            </div>
            <br />
            <Accordion 
            id="3" 
            expanded={openAccordion}
            TransitionProps={{ unmountOnExit: true }}
            >
                <AccordionSummary
                onClick={() => dispatch({type: 'openAccordion'})}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography className={classes1.heading}>Add an item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{margin: 'auto'}}>
                        <form className={classes3.root} onSubmit={handleItemSubmit}>
                            <label className="formLabel">Size:</label>
                            <select 
                                className="formLabel1" 
                                onChange={(e) => setSize(e.target.value)} 
                                defaultValue="Choose Size" 
                                value={itemObj.size} 
                                required
                            >
                                <option value="Choose Size" disabled>Choose Size</option>
                                <option value="XXS">XXS</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                                <option value="other">Other...</option>
                            </select>
                            {size === 'other' ? <input onChange={(e) => {setText(e.target.value)}} className="formLabel1" placeholder="Enter a Size"/> : <></>}
                            <br />
                            <label className="formLabel">Style:</label>
                            <select 
                                className="formLabel1" 
                                onChange={(e) => setStyle(e.target.value)} 
                                defaultValue="Choose Style" 
                                value={itemObj.style}
                                required
                            >
                                <option value="Choose Style" disabled>Choose Style</option>
                                <option value="casual">Casual</option>
                                <option value="geeky">Geeky</option>
                                <option value="elegant">Elegant</option>
                                <option value="sport">Sport</option>
                                <option value="formal">Formal</option>
                                <option value="sport elegant">Sport Elegant</option>
                                <option value="comfort">Comfort</option>
                                <option value="maternity">Maternity</option>
                                <option value="hip hop">Hip Hop</option>
                                <option value="military">Military</option>
                                <option value="exotic">Exotic</option>
                                <option value="trendy">Trendy</option>
                                <option value="ethnic">Ethnic</option>
                                <option value="gothic">Gothic</option>
                            </select>
                            <br />
                            <label className="formLabel">Type:</label>
                            <select 
                                className="formLabel1" 
                                onChange={(e) => setType(e.target.value)} 
                                defaultValue="Choose a type" 
                                value={itemObj.type} 
                                required
                            >
                                <option value="Choose a type" disabled>Choose a type</option>
                                <option value="hats">Hat</option>
                                <option value="jackets">Jacket</option>
                                <option value="shirts">Shirt</option>
                                <option value="jeans">Jeans</option>
                                <option value="footers">Footers</option>
                                <option value="shorts">Shorts</option>
                                <option value="shoes">Shoes</option>
                            </select>
                            <br />
                            <label className="formLabel">Is it clean ?</label>
                            <select
                                className="formLabel1"
                                onChange={(e) => setIsWashed(e.target.value)}
                                defaultValue="Is it clean ?"
                                value={itemObj.isWashed}
                                required
                            >
                                <option value="Is it clean ?" disabled>Is it clean ?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <br />
                            <label className="formLabel">File:</label>
                            <input
                                className="formLabel1"
                                onChange={(e) => {handleFileSelection(e.target.files[0]);}}
                                type="file"
                                id="myFile"
                                name="filename"
                                value={itemObj.image}
                                required
                                accept="image/png, image/jpeg"
                            />
                            <br />
                            <Button 
                                color="secondary"
                                style={{width: "340px"}}
                                onClick={(e) => {
                                    if(type && style && size && isWashed && image) {
                                        fetcher.postClothes(itemObject);
                                        window.location.reload();
                                    } else {
                                        return (
                                            setError(true)
                                            )
                                        }
                                    }}>
                                Save Item
                            </Button>
                        </form>
                    </div>
                    <div style={{margin: 'auto', display: image ? 'block' : 'none'}}>
                        <img src={image} alt=""/>
                    </div>
                </AccordionDetails>
            </Accordion>
            <br />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                    },
                  }}
                z-index="1"
                anchor="left" 
                open={checkedOut.length > 0}
                onClose={handleDrawerClose} 
                variant="persistent"
            >
                <div style={{ width: drawerWidth }}>
                    {/* <Divider /> */}
                    {(checkedOut || []).map(item => {
                        return (
                            <div key={item._id*Math.random()*100} style={{display: 'block', marginBottom: '2vh'}}>
                                <br />
                                <Card sx={{ maxWidth: 256, display: 'inline-block', marginLeft: "2vw" }}>
                                    <CardMedia
                                    component="img"
                                    height="128"
                                    width="128"
                                    image={item.image}
                                    />
                                    <CardContent>
                                        <Typography variant="body2">
                                            It's a size {item.size}, {item.isWashed ? "clean" : "dirty"}, {item.style} {item.type}.
                                            <br />
                                            {item.isWashed ? "Ready to use!" : "Needs to be cleand."}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                        style={{float: "left"}} 
                                        size="small" 
                                        alt="Add to Favorites" 
                                        onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})}>
                                            {favorites.includes(item.id) 
                                            ?
                                            "Remove from Favorites" 
                                            : 
                                            "Add to Favorites"
                                            }
                                        </Button>
                                        <Button
                                        size="small"
                                        alt="Delete item"
                                        onClick={() => {
                                            fetcher.deleteClothes(item)
                                            window.location.reload(false);
                                        }}
                                        >
                                            Delete Item
                                        </Button>                                        
                                        <Button 
                                        style={{float: "right"}} 
                                        size="small" 
                                        alt="Remove from Set" 
                                        onClick={(ev) => dispatch({type: "checkedOut", payload: item})}>
                                            Remove selection
                                        </Button>
                                    </CardActions>
                                </Card>
                                <br />
                                <Divider />
                            </div>
                        )
                    })}
                </div>
            </Drawer>
            <AddingDialog />
            <ErrorDialog />
        </div>
    )
}

export default Home;