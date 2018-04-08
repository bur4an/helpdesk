import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';


const IngramList = (props) => (
    <List>
      {props.data.map(list =>
        <ListItem primaryText={list["Ingram Part Description"]} leftIcon={<ActionGrade />} />
      )}
    </List>
);

export default IngramList;
