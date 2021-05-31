import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import FolderIcon from '@material-ui/icons/Folder';
import routes from "../routes.js";
import { Route } from "react-router-dom";

const categories = [
  {
    id: 'Annotation',
    children: [
      { id: 'Stand-alone Annotation', icon: <CreateRoundedIcon />, active: false },
      { id: 'Projects', icon: <FolderIcon />, active: true },
      { id: 'Dictionaries', icon: <StorageRoundedIcon />, active: false },
      { id: 'Machine Learning Models', icon: <AccountTreeRoundedIcon />, active: false },
      { id: 'Preferences', icon: <SettingsIcon />, active: false },
    ],
  },
  {
    id: 'Mapping',
    children: [
      
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    //backgroundColor: '#363333',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  paper: {
    background: "474545"
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Navigator(props) {
  const { classes, ...other } = props;

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        if (prop.layout === "/app") {
            return (
                <Route
                    exact path={prop.layout + prop.path}
                    render={(props) => <prop.component {...props} />}
                    key={key}
                />
            );
        } else {
            return null;
        }
    });
};

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Neji
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              /*<ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >*/
              //
              <ListItemLink href={"/app/"+childId.toLowerCase()} 
                key={childId} 
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItemLink>
              //</ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);