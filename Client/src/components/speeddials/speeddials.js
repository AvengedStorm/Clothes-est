import React, { useState } from 'react';

import {useSelector, useDispatch} from 'react-redux'

import sets from '../db/sets';

import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import SaveIcon from '@material-ui/icons/Save';
import BallotIcon from '@material-ui/icons/Ballot';
import ClearIcon from '@material-ui/icons/Clear';

const HomeSpeedDial = () => {
    const dispatch = useDispatch();
    const checkedOut = useSelector(state => state.checkedOut);

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
    const classes = useStyles();

    const [open1, setOpen1] = useState(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const clearCurrentSet = () => {
        dispatch({ type:'clearDrawer' })
    };
    const handleSetSubmit = () => {
        const submittedSet = checkedOut;
        dispatch({type: "saveSet", payload: submittedSet});
        sets.push(submittedSet);
    };
    const drawerToggle = () => {
        dispatch({ type: 'clothesDrawer' })
    }
    const actions1 = [
        {icon: <SaveIcon />, name: 'Save to Sets', func: handleSetSubmit },
        {icon: <BallotIcon />, name: 'Toggle Drawer', func: drawerToggle },
        {icon: <ClearIcon />, name: "Clear All", func: clearCurrentSet },
    ];

    return (
        <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose1}
                onOpen={handleOpen1}
                open={open1}
                direction="down"
                z-index="9999"
            >
                {actions1.map((action) => (
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

const ClosetSpeedDial = () => {
    const dispatch = useDispatch();
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
    const classes = useStyles();
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const actions2 = [
        {icon: <SaveIcon />, name: 'Save current set', func: () => console.log("Save Current Set")},
        {icon: <BallotIcon />, name: 'Drawer', func: () => dispatch({type: "clothesDrawer"})},
        {icon: <ClearIcon />, name: "Clear All", func: () => dispatch({type: "clearDrawer"})},
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={handleClose2}
            onOpen={handleOpen2}
            open={open2}
            direction="down"
            z-index="9999"
        >
            {actions2.map((action) => (
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

export {HomeSpeedDial, ClosetSpeedDial};