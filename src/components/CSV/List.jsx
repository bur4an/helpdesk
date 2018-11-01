import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListItemText >{props.value}</ListItemText>
        </ListItem>
        {props.data.map(list => (
          <ListItem key={list["Ingram Part Number"]}>
            <ListItemText primary={list["Ingram Part Description"]} secondary={"Cost: $" + list["Customer Price with Tax"]}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
