import { connect } from 'react-redux';
import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from 'react-redux'
import clothes from "../components/db/clothes";
// import sets from "../components/db/sets";
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SaveIcon from '@material-ui/icons/Save';
import BallotIcon from '@material-ui/icons/Ballot';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import ClearIcon from '@material-ui/icons/Clear';
// import RemoveIcon from '@material-ui/icons/Remove';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Drawer } from '@material-ui/core';
import Divider from '@mui/material/Divider';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const hatsArray = clothes.filter(el => el.type === "hat");
const shirtsArray = clothes.filter(el => el.type === "shirt");
const jeansArray = clothes.filter(el => el.type === "jeans");
const footersArray = clothes.filter(el => el.type === "footer");
const shortsArray = clothes.filter(el => el.type === "shorts");
const shoesArray = clothes.filter(el => el.type === "shoes");
const jacketsArray = clothes.filter(el => el.type === "jackets");

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

const Home = (props) => {
    const itemObj = useSelector(state => state.items);
    const favorites = useSelector(state => state.favorites);
    const items = useSelector(state => state.items);
    const checkedOut = useSelector(state => state.checkedOut);
    const dispatch = useDispatch();
    
    const [text, setText] = useState("")
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState("");
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleItemSubmit = (evt) => {
        evt.preventDefault();
        const sizeDecider = size === "other" ? text : size;
        let item = {
            id: items.length+1,
            size: sizeDecider,
            style: style,
            type: type,
            file: file,
        }
        // alert(`${item.size}, ${item.style}, ${item.type}`);
        dispatch({type: "addItem", payload: item});
    };
    const handleSetSubmit = (set) => {
        const submittedSet = checkedOut;
        dispatch({type: "saveSet", payload: submittedSet});
    };

    const imageListItemStyle = {
        width: "200px", 
        height: "200px", 
        zIndex: "100",
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
        },
        speedDial: {
            position: 'fixed',
            top: "7vh",
            right: "1vw",
        },
    }));
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
            width: '25ch',
            },
        },
    }));

    const drawerToggeler = () => {
        if(drawerOpen) {
            toggleDrawer(false);
        } else {
            toggleDrawer(true);
        };
    };
    const clearCurrentSet = () => {
        dispatch({ type:'clearDrawer' })
    };
    const [drawerOpen, toggleDrawer] = useState(true);

    const actions = [
        {
            icon: <SaveIcon />,
            name: 'Save current set',
            func: handleSetSubmit
        },
        {
            icon: <BallotIcon />, 
            name: 'Drawer', 
            func: drawerToggeler
        },
        {
            icon: <ClearIcon />, 
            name: "Clear All",
            func: clearCurrentSet
        }
    ];  
    
    const classes = useStyles();
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
    const SpeedDials = () => {
        return (
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
                z-index="9999"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.func}
                    />
                ))}
            </SpeedDial>
        );
    };

    return (
        <div className="body" id="body">
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
                            {hatsArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} onClick={(e) => console.log(checkedOut)} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                            <StarBorderIcon />
                                            )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} disabled={jacketsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jacketsArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                                )}
                                    </IconButton>
                                }
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} disabled={shirtsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shirtsArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} onClick={(e) => console.log(checkedOut)} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                            <StarBorderIcon />
                                            )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3} disabled={jeansArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jeansArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                                )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4} disabled={footersArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {footersArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                                )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5} disabled={shortsArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shortsArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                                )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={6} disabled={shoesArray.length > 0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shoesArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img key={item.id} src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
                                <ImageListItemBar
                                title={item.size}
                                classes={{
                                    root: classes2.titleBar,
                                    title: classes2.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={(ev) => dispatch({type: "toggleFavorite", payload: item.id})} aria-label={`star ${item.size}`}>
                                        {favorites.includes(item.id) ? (
                                            <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                                )}
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </TabPanel>
            </div>
            <br />
            <Accordion id="3" expanded={props.openAccordion === '3'}>
                <AccordionSummary
                onClick={e => props.dispatch({type: 'openAccordion', payload: '3'})}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography className={classes1.heading}>Add an item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={classes3.root} onSubmit={handleItemSubmit}>
                        <label className="formLabel">Size:</label>
                        <select className="formLabel1" onChange={(e) => setSize(e.target.value)} defaultValue="Choose Size" value={itemObj.size}>
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
                        <select className="formLabel1" onChange={(e) => setStyle(e.target.value)} defaultValue="Choose Style" value={itemObj.style}>
                            <option value="Choose Style" disabled>Choose Style</option>
                            <option value="casual">Casual</option>
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
                        <select className="formLabel1" onChange={(e) => setType(e.target.value)} defaultValue="Choose a type" value={itemObj.type}>
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
                        <label className="formLabel">File:</label>
                        <input className="formLabel1" onChange={(e) => {setFile(e.target.files[0])}} type="file" id="myFile" name="filename" value={itemObj.img}/>
                        <label>{file ? <p>{Math.round((file.size) / 1024)} KBs</p> : <></>}</label>
                        <img src={file} alt=""/>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Submit" id="itemSubmit" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <br />
            <Drawer
                anchor="bottom" 
                open={drawerOpen || checkedOut.lenght > 0}
                onClose={() => toggleDrawer(false)} 
                variant="persistent"
                >
                <div>
                    <br />
                    <Divider />
                    {(checkedOut || []).map(item => {
                            return (
                                <div key={item.id} style={{display: 'inline-block'}}>
                                    <br />
                                    <Card sx={{ maxWidth: 345, display: 'inline-block' }}>
                                        <CardMedia
                                        component="img"
                                        height="196"
                                        width="196"
                                        image={item.img}
                                        onClick={() => console.log(item)}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
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
                                            style={{float: "right"}} 
                                            size="small" 
                                            alt="Remove from Set" 
                                            onClick={(ev) => dispatch({type: "checkedOut", payload: item})}>
                                                Remove from Set
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
            <SpeedDials />
        </div>
    )
}

export default connect(state => {return {items: state.items, openAccordion: state.openAccordion}})(Home)