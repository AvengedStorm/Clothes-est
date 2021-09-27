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
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Drawer } from '@material-ui/core';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

let drawerWidth = 240;

const shirtsArray = clothes.filter(el => el.type === "shirt");
const jeansArray = clothes.filter(el => el.type === "jeans");
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
                <Typography>{children}</Typography>
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
    
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState("");
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch({type: "addItem", payload:{
            id: items.length+1,
            size: size,
            style: style,
            type: type,
            file: file,
        }});
    }
    const imageListItemStyle = {
        maxWidth: "200px", 
        minWidth: "100px", 
        maxHeight: "200px", 
        minHeight: "100px", 
        zIndex: "100",
    }
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

    const [isDrawerOpen, toggleDrawer] = useState(false);
    const drawerContent = useSelector(state => state.drawerContent)
    
    const useStyles3 = makeStyles((theme) => ({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        }));
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const renderCheckbox = (item) => {
        let isCheckedOut = checkedOut.includes(item.id);
        return (
            <Checkbox
            onClick={(e) => dispatch({type: "checkedOut", payload: item.id})}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="primary"
            z-index="9999"
            position="absolute"
            label={isCheckedOut ? "Remove me from set" : "Add me to the set"}
            checked={isCheckedOut} 
            />
        )
    }
    return (
        <div className="body" id="body">
            <h3 className="homeTitle" style={{marginTop: "10vh", marginLeft: "2vw"}}>Welcome to your closet! What would you like to do?</h3>
            <br />
            <div className={classes1.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="type tabs" variant="fullWidth">
                    <Tab label="Shirts" {...a11yProps(0)} disabled={!shirtsArray} />
                    <Tab label="Jeans" {...a11yProps(1)} disabled={!jeansArray}/>
                    <Tab label="Shorts" {...a11yProps(2)} disabled={!shortsArray}/>
                    <Tab label="Shoes" {...a11yProps(3)} disabled={!shoesArray}/>
                    <Tab label="Jackets" {...a11yProps(4)} disabled={!jacketsArray}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shirtsArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img src={item.img} onClick={(e) => console.log(checkedOut)} alt={item.size} style={{width: "196px", height: "196px"}} />
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
                <TabPanel value={value} index={1}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jeansArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                            {renderCheckbox(item)}
                            <img src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
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
                <TabPanel value={value} index={2}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shortsArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                            {renderCheckbox(item)}
                            <img src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
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
                <TabPanel value={value} index={3}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {shoesArray.map((item) => (
                            <ImageListItem key={item.img} style={imageListItemStyle}>
                            {renderCheckbox(item)}
                            <img src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
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
                <TabPanel value={value} index={4}>
                    <div className={classes2.root}>
                        <ImageList className={classes2.imageList} cols={2.5}>
                            {jacketsArray.map((item) => (
                                <ImageListItem key={item.img} style={imageListItemStyle}>
                                {renderCheckbox(item)}
                                <img src={item.img} alt={item.size} style={{width: "196px", height: "196px"}} />
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
                        <Typography>
                        <div className="dialog3">
                            <form className={classes3.root} onSubmit={handleSubmit}>
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
                                </select>
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
                                    <option value="shirts">Shirts</option>
                                    <option value="jeans">Jeans</option>
                                    <option value="shorts">Shorts</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="jackets">Jackets</option>
                                </select>
                                <br />
                                <label className="formLabel">File:</label>
                                <input className="formLabel1" onChange={(e) => {setFile(e.target.files[0])}} type="file" id="myFile" name="filename" value={itemObj.img}/>
                                <label>{file ? <div>{Math.round((file.size) / 1024)} KBs</div> : <></>}</label>
                                <img src={file} alt=""/>
                                <br />
                                <input className="btn btn-primary" type="submit" value="Submit" id="itemSubmit" />
                            </form>
                        </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    anchor="right" 
                    open={isDrawerOpen}
                    onClose={() => toggleDrawer(false)} 
                    variant="persistent">
                        <Button onClick={(e) => dispatch({type: 'clearDrawer'})}>Clean</Button>
                        <Button>Save Set</Button>
                        <Button onClick={() => toggleDrawer(false)}>Close</Button>
                </Drawer>
            <br />
        </div>
    )
}
export default connect(state => {return {items: state.items, openAccordion: state.openAccordion}})(Home)