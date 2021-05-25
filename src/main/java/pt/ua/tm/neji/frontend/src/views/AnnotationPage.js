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
    backgroundColor: "rgba(214, 2, 2, 1)",
    color: "white",
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 0, 0, 1)',
    },
  },
  annotateButton: {
    backgroundColor: "rgba(0, 150, 0, 1)",
    color: "white",
    '&:hover,&:focus': {
      backgroundColor: 'rgba(0, 170, 0, 1)',
    }
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function AnnotationPage(props) {
  const { classes } = props;

  const handleLoadFile = () => {
     
  }

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Paper className={classes.paper}>
          <AppBar className={classes.loadBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <CreateRoundedIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <Typography color="textSecondary" variant="h6">Annotation Area</Typography>
                </Grid>
                <Grid item>
                  <Button  variant="contained" color="secondary" startIcon={<PublishRoundedIcon />}>
                    Load file
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              Load a text file to start annotating
            </Typography>
          </div>
        </Paper>
      </Grid>

      <Grid item>
        <Grid container spacing={2} direction="row" justify="flex-end">
          <Grid item>
            <Button 
              variant="contained" 
              className={classes.clearButton} 
              startIcon={<CancelRoundedIcon 
              onClick={handleLoadFile}
            />}>
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.annotateButton} startIcon={<CreateRoundedIcon />}>
              Annotate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    
    
  );
}

AnnotationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnotationPage);