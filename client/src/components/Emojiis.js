import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function EmojiDrawer(props) {
  const [emojis, setEmojis] = React.useState({}) 
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(()=>{
    getEmoji()
    
  },[])

  async function getEmoji(){
      const result = await fetch('https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json').then(r=>r.json())
      console.log(result)
      setEmojis(result)
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <GridList cellHeight={50} cols={4}>
        {Object.values(emojis).map(e=>{
            return (
        <GridListTile  cols={e.cols || 1}>
            <GridListTileBar title={e} style={{backgroundColor:"#F2E291"}} onClick={()=>props.data(e)}></GridListTileBar>
        </GridListTile>
        )})}
      </GridList>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <Fab onClick={toggleDrawer('right', true)} style={{position:"absolute", right:"0px" }}><FavoriteIcon /></Fab>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}