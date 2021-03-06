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
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';
import SaveIcon from '@material-ui/icons/Save';
import { ResizableBox, Resizable } from 'react-resizable';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const styles = (theme) => ({
    paper: {
        //minHeight: 400,
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
        margin: '0px 0px',
    },
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
    },
    leftPane: {
        width: '60%',
        //backgroundColor: "red"
    },
    rightPane: {
        width: '40%',
        //backgroundColor: "#ede7e6",
        marginLeft: "0px",
        paddingLeft: "10px",
        position: "fixed",
        right: 25
    },
    root: {
        position: "fixed",
        right: 25,
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#232f3e",
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "sans-serif"
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function AnnotationPage(props) {
    const { classes } = props;
    let history = useHistory();
    let location = useLocation();
    let temp = location.pathname.split("/");

    const state = {
        width: 100,
        height: 100,
    }

    const onRezise = (event, { element, size, handle }) => {
        this.setState({ width: size.width, height: size.height });
    }

    const handleLoadFile = () => {

    }


    return (
        /*<div className={classes.splitScreen}>
            <div className={classes.leftPane}>*/

            
            <Grid container direction="row" spacing={2}>
                <Grid item xs={7}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Grid container spacing={1} direction="row" alignItems="top">
                                <Grid item>
                                    <Typography style={{fontWeight:"bold", fontSize:"16px"}}>
                                        Upregulation of chemokines and their receptors in Duchenne muscular 
                                        dystrophy: potential for attenuation of myofiber necrosis
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={1}>
                                <Grid item>
                                    <Button onClick={history.goBack} variant="contained" style={{backgroundColor:"black", color:"white"}} startIcon={<ArrowBackIcon />}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Previous document">
                                        <IconButton variant="contained" style={{color:"black"}}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Next document">
                                        <IconButton variant="contained" style={{color:"black"}}>
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs />
                                <Grid item>
                                    <Button variant="contained" color="secondary" startIcon={<SaveIcon />}>
                                        Save
                                    </Button>
                                </Grid>
                                {/*<Grid item>
                                    <Button variant="contained" style={{backgroundColor:"#dbc200", color:"white"}} 
                                        startIcon={<SettingsEthernetRoundedIcon />}
                                        href={location.pathname + "/mapping"}
                                    >
                                        Map Concepts
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" className={classes.annotateButton} startIcon={<CreateRoundedIcon />}>
                                        Auto Annotate
                                    </Button>
                                </Grid>*/}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="center">
                                <Grid item xs={12}>
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
                                                </Grid>
                                            </Toolbar>
                                        </AppBar>
                                        <div className={classes.contentWrapper}>
                                            {/*<Typography color="textSecondary" align="center">
                                                Load a text file to start annotating
                                            </Typography>
                                            <Resizable
                                                height={state.height}
                                                width={state.width}
                                                onRezise={onRezise}
                                            >
                                                <div className="box" style={{ width: state.width + 'px', height: state.height + 'px' }}>
                                                    <span>Contents</span>
                                                </div>
                                                
                                            </Resizable>*/}
                                            <TextField
                                                id="annotation-text-box"
                                                multiline
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Load or copy a text file to start annotating"
                                                margin="none"
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    {/*</div>*/}
                </Grid>
                <Grid item xs={5} className={classes.root}>
                {/*<div className={classes.rightPane}>*/}

                
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        <Grid item>
                            <Grid container direction="row" justify="left">
                                <Grid item>
                                    <Typography variant="h5">
                                        Annotations
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container direction="row" justify="center">
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="left">Term</StyledTableCell>
                                                    <StyledTableCell align="left">ID</StyledTableCell>
                                                    <StyledTableCell align="left">Type</StyledTableCell>
                                                    <StyledTableCell align="left">Score</StyledTableCell>
                                                    <StyledTableCell align="left">Offset</StyledTableCell>
                                                    <StyledTableCell align="left"></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <StyledTableCell component="th" scope="row" align="left">Term</StyledTableCell>
                                                    <StyledTableCell align="left">ID</StyledTableCell>
                                                    <StyledTableCell align="left">Type</StyledTableCell>
                                                    <StyledTableCell align="left">Score</StyledTableCell>
                                                    <StyledTableCell align="left">Offset</StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        <Grid container direction="row" justify="center">
                                                            <Grid item>
                                                                <Tooltip title="Delete Annotation">
                                                                    <IconButton style={{ color: "#db0e0b" }} aria-label="delete-button" component="span">
                                                                        <DeleteRoundedIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        //</div>
    );
}

AnnotationPage.propTypes = {
                    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnotationPage);