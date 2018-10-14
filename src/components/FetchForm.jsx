import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import GridList from '@material-ui/core/GridList';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  button:{
    margin:12
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class FetchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', data:[]};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSubmit = (event) => {
    this.setState({data:[]});
    fetch('/ebay', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: this.state.value})
        })
      .then(res => res.json())
      .then(list => this.setState({ data: list }));
    event.preventDefault();
  }
  render(){
    return (
      <div>
        <MuiThemeProvider>
          {/***
            Filter data based on field name
          ***/}
          <SelectField
            floatingLabelText="Vendor Name"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="LOGITECH" primaryText="Logitech" />
            <MenuItem value="MICROSOFT" primaryText="Microsoft" />
            <MenuItem value="ADOBE" primaryText="Adobe" />
            <MenuItem value="ACER" primaryText="Acer" />
          </SelectField>
          <RaisedButton
            label="List" primary={true}
            style={styles.button}
            onClick={this.handleSubmit}
          />

        <GridList cellHeight={180} className={styles.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">{this.state.value}</ListSubheader>
            </GridListTile>
            {this.state.data.map(tile => (
              <GridListTile key={tile.ItemID}>
                <img src={tile.PictureURL} alt={tile.Title} />
                <GridListTileBar
                  title={tile.Title}
                  subtitle={<span>sold: {tile.QuantitySold}</span>}
                  actionIcon={
                    <IconButton className={styles.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </MuiThemeProvider>
      </div>
    );
  }
}

{/*
  <List>
    {this.state.data.map(list =>
      <ListItem primaryText={list.Title} leftIcon={<ActionGrade />} />
    )}
  </List>
  */}
  export default FetchForm
