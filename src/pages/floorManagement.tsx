import React from 'react';
import Floor from '../components/floor.tsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import SideNav from '../components/sideNav.tsx';
import SummaryBar from '../components/summaryBar.tsx';
import '../styles/comman.css';

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideNav />
      <div>
        <Paper elevation={3} className='floor-mang-head-top' >
          <Typography variant="h5">Floor Management</Typography>
        </ Paper>

        <Paper className='floor-mang-dashboard'>
          <Paper className={classes.sidebar}>
            <Typography variant="h6">Table Options</Typography>
            <button onClick={() => alert('Drag tables from here')}>Instruction</button>
          </Paper>
          <Floor />
        </Paper>
        <SummaryBar />
      </div>


    </div>
  );
};

export default FloorManagement;
