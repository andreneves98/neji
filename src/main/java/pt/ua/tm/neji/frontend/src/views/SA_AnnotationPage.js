import React, { useState, useRef } from 'react';
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
import { ResizableBox, Resizable } from 'react-resizable';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
//import { Document, Page } from 'react-pdf';
//import { Document, Page } from 'react-pdf/build/entry.noworker';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


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
    },
    leftPane: {
        width: '60%',
        //backgroundColor: "red"
    },
    rightPane: {
        width: '40%',
        //backgroundColor: "#ede7e6",
        marginLeft: "10px",
        paddingLeft: "20px",
        position: "fixed"
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

function SA_AnnotationPage(props) {
    const { classes } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isPDF, setIsPDF] = useState(false);

    // https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
    const hiddenFileInput = useRef(null);

    const state = {
        width: 100,
        height: 100,
    }

    const onRezise = (event, { element, size, handle }) => {
        this.setState({ width: size.width, height: size.height });
    }

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    const onPDFLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const previousPage = () => {
        changePage(-1);
    }

    const nextPage = () => {
        changePage(1);
    }

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        e.preventDefault();
        console.log(selectedFile);

        /*if (selectedFile.type === "application/pdf")      // text/plain
            setIsPDF(true);
        else {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0]);
            reader.onloadend = getFileContent;
        }*/

        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onloadend = getFileContent;
    }

    const getFileContent = (e) => {
        const content = e.target.result;
        console.log(content);
        setFileContent(content);
    }

    const clearTextArea = () => {
        setFileContent("");
        setSelectedFile(null);
        setPageNumber(1);
        setNumPages(null);
    }

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={7}>
                <Grid container direction="column" spacing={4}>
                    <Grid item>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <AppBar className={classes.loadBar} position="static" color="default" elevation={0}>
                                        <Toolbar style={{ paddingTop: '10px' }}>
                                            <Grid container direction="column" spacing={1}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <CreateRoundedIcon className={classes.block} color="inherit" />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography color="textSecondary" variant="h6">Annotation Area</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <form>
                                                            <Button variant="contained" color="secondary" startIcon={<PublishRoundedIcon />} onClick={handleClick} style={{ marginLeft: '5px' }}>
                                                                Load file
                                                            </Button>
                                                            <input
                                                                type="file"
                                                                style={{ display: 'none' }}
                                                                ref={hiddenFileInput}
                                                                onChange={handleChange}
                                                            />
                                                        </form>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    {selectedFile ? <Typography color="textPrimary" variant="body1">{selectedFile.name}</Typography> : ""}
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
                                            value={selectedFile ? fileContent : ""}
                                        />
                                        {/*<div>
                                            <Document
                                                file={selectedFile}
                                                onLoadSuccess={onPDFLoadSuccess}
                                                onLoadError={console.error}
                                            >
                                                <Page pageNumber={pageNumber} />
                                            </Document>
                                            <p>Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</p>
                                            <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                                                Previous
                                            </button>
                                            <button
                                                type="button"
                                                disabled={pageNumber >= numPages}
                                                onClick={nextPage}
                                            >
                                                Next
                                            </button>
                                        </div>*/}
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs />
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className={classes.clearButton}
                                    startIcon={<CancelRoundedIcon />}
                                    onClick={clearTextArea}
                                >
                                    Clear
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" className={classes.annotateButton} startIcon={<CreateRoundedIcon />}>
                                    Auto Annotate
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.root}>

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
    );
}

SA_AnnotationPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SA_AnnotationPage);