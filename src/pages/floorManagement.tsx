import React, { useEffect } from 'react';
import { useState } from "react";
import Floor from '../components/floor.tsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import SideNav from '../components/sideNav.tsx';
import SummaryBar from '../components/summaryBar.tsx';
import '../styles/comman.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sidebar: {
    width: '300px',
    padding: theme.spacing(2),
    borderRight: '1px solid #ddd',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));


const FloorManagement = () => {
  const floorRoom = ["main", "second", "third", "fourth", "fifth", "sixth"]

  const [open, setOpen] = useState(false);
  const [selectRoom, setSeclectRoom] = useState(floorRoom[0]);
  const [allRooms, setAllRoom] = useState<String[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (rooms: any) => {
    setSeclectRoom(rooms);
    setOpen(false);
  };


  useEffect(() => {
    setAllRoom(floorRoom);
    console.log('Selected value changed:', selectRoom);

  }, []);

  useEffect(() => {
    console.log('Selected value changed:', selectRoom);
  }, [selectRoom]);

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <SideNav />
      <div>
        <Paper elevation={3} className='floor-mang-head-top' >
          <Typography variant="h5">Floor Management</Typography>
        </ Paper>

        <Paper className='floor-mang-dashboard'>
          <button onClick={handleClickOpen} ><MoreVertIcon /></button>
          <Dialog
            open={open}
            onClose={() => handleClose(floorRoom[0])}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogActions>
              {allRooms.map((rooms, index) =>
                <div><button key={index} onClick={() => handleClose(rooms)}>{rooms}</button></div>
              )}
            </DialogActions>
          </Dialog>
          
          <Floor value={selectRoom}   />
        </Paper>





        <SummaryBar />
      </div>


    </div>
  );
};

export default FloorManagement;
