import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

const styles = (theme) => ({
  paper: {
    maxWidth: 1200,
    minHeight: 400,
    margin: 'auto',
    overflow: 'hidden',
  },
  loadBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  annotationActions: {
    maxWidth: 1200,
    margin: 'auto',
    flex: 1,
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  loadFile: {
    marginRight: theme.spacing(1),
  },
  clearButton: {
    backgroundColor: "red",
    color: "white"
  },
  annotateButton: {
    backgroundColor: "green",
    color: "white"
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Mapping(props) {
  const { classes } = props;

  return (
    <h3>asdasd</h3>
    
    
  );
}

Mapping.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mapping);