import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Dialog from './Dialog'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme,matches) => ({
  root: {
    backgroundColor: 'white',
    width: matches?500:1100,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
  },
  fabGreen: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

export default function FloatingActionButtonZoom() {
  const [todoInput,setInput] = React.useState([])
  const [doingInput, setDoing] = React.useState([])
  const [doneInput, setDone] = React.useState([])
  
  const matches = useMediaQuery('(max-width:360px)');
  console.log("media query: ", matches)
  const theme = useTheme();
  const classes = useStyles(theme,matches);
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  function changeToDo(text){
    let list = [...doingInput];
    list.push(text)
    setDoing(list)
    const todo = [...todoInput.filter(e=>e!==text)]
    setInput(todo)
  }

  function changeDoing(text){
    let list = [...doneInput];
    list.push(text)
    setDone(list)
    const todo = [...doingInput.filter(e=>e!==text)]
    setDoing(todo)
  }

  function changeDone(text){
    const todo = [...doneInput.filter(e=>e!==text)]
    setDone(todo)
  }

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <AddIcon />,
      label: 'Add',
    },
  ];
  return (
    <>
      <div>
          <h2>Instructions</h2>
          <ul>
            <li>Click on the '+' button to add items to the KanBan</li>
            <li>Select the item to move it to the next tab</li>
          </ul>
      </div>
      <div className={classes.root} style={{}}>
        
        <AppBar position="static" color="default">   
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="To-Do" {...a11yProps(0)} />
            <Tab label="Doing" {...a11yProps(1)} />
            <Tab label="Done" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {todoInput.map(text=>{
              return(<ListItem button onClick={()=>changeToDo(text)}>
                {text} 
                </ListItem>)
              
            })}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {doingInput.map(text=>{
              return(<ListItem button onClick={()=>changeDoing(text)}>
                {text} 
                </ListItem>)
              
            })}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
          {doneInput.map(text=>{
              return(<ListItem button onClick={()=>changeDone(text)}>
                {text} 
                </ListItem>)
              
            })}
          </TabPanel>
        </SwipeableViews>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === 0}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Dialog label={fab.label} className={fab.className} color={fab.color} icon={fab.icon} func={setInput} val={todoInput}></Dialog>
          </Zoom>
        ))}

      </div>
    </>
  );
}