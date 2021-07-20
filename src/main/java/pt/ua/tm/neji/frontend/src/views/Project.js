import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { FormControl, Grid, OutlinedInput, InputAdornment, InputLabel, TextField, createMuiTheme, Tooltip } from '@material-ui/core';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { useLocation, useHistory, Link } from 'react-router-dom';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PanToolIcon from '@material-ui/icons/PanTool';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DocumentDataService from '../services/document.service';

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 80,
            width: '100%',
            backgroundColor: 'black',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: 'black',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    style: {
        backgroundColor: 'white',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

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

const StatusStyledCell = withStyles((theme) => ({
    body: {
        //backgroundColor: "rgb(71, 194, 60)",
        color: "rgb(71, 194, 60)",
        fontWeight: "bold"
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        /*'&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },*/
    },
}))(TableRow);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function createDocsData(id, title, annotations, lastUpdate) {
    return { id, title, annotations, lastUpdate };
}

function createMembersData(first_name, last_name, role, id) {
    return { first_name, last_name, role, id };
}

function createTypesData(type, color) {
    return { type, color };
}

const docsRows = [
    createDocsData(1, 'Upregulation of chemokines and their receptors in Duchenne' +
        ' muscular dystrophy: potential for attenuation of myofiber necrosis', 245, '3 minutes ago'),
    createDocsData(2, 'Sesamin extends the mean lifespan of fruit flies', 564, '2 hours ago'),
];

const membersRows = [
    createMembersData('Carlos', 'Almeida', 'Project Manager', 'd63c6c46-b867-4066-9e21-f174f258b51e'),
    createMembersData('David', 'Soares', 'Annotator', 'bd6f94c4-13a1-42e5-b223-a376745ecbb9'),
];

const typesRows = [
    createTypesData('GENE', 'Green'),
];

export default function CustomizedTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { pathname, state } = useLocation();
    const history = useHistory();
    const [projectDocs, setProjectDocs] = React.useState([]);
    const [projName, setProjName] = React.useState(null);
    const [projId, setProjId] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [reload, setReload] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fileContent, setFileContent] = React.useState("");

    const mountedRef = React.useRef(false);

    // https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
    const hiddenFileInput = React.useRef(null);

    const handleAnnotationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUploadChange = (e) => {
        setSelectedFile(e.target.files[0]);
        e.preventDefault();
        console.log(selectedFile);

        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onloadend = getFileContent;
    }

    const handleUploadClick = (e) => {
        hiddenFileInput.current.click();
    }

    const getFileContent = (e) => {
        const content = e.target.result;
        console.log(content);
        setFileContent(content);
    }

    const handleUpdatedAt = (updatedAt) => {
        var temp = updatedAt.split("T")[0];
        var today = new Date();
        var lastUpdate = new Date(temp);

        const utc1 = Date.UTC(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate());
        const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    const getProjectDocs = () => {
        console.log("GET PROJECT DOCS");
        var data;
        DocumentDataService.getByProjID(state.projId)
            .then(response => {
                if (mountedRef.current) {
                    setProjectDocs(response.data);
                }
                data = response.data;

                // Fetch the number of annotations from each document
                //data.forEach((document, index) => {})
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Unmount and cleanup
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    }, []);

    // Update project name and ID to fetch the data
    useEffect(() => {
        if (mountedRef.current) {
            setProjName(state.projName);
            setProjId(state.projId);
            setDescription(state.description);
        }
    }, [state.projName, state.projId, state.description]);

    // Replaces React class lifecycle methods like componentDidMount, componentDidUpdate and componentWillUnmount
    useEffect(() => {
        // Runs everytime 'reload' changes state to re-render the components
        getProjectDocs();
        if (mountedRef.current) {
            setReload(false);
        }

    }, [reload]);

    const documentsTab = () => {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
            >
                <Grid item>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">#</StyledTableCell>
                                            <StyledTableCell align="left">Title</StyledTableCell>
                                            <StyledTableCell align="center">Annotations</StyledTableCell>
                                            <StyledTableCell align="center">Last Update</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {console.log(projectDocs), projectDocs.map((doc) => (
                                            <StyledTableRow key={doc.doc_id}>
                                                <StyledTableCell component="th" scope="row" align="left">{doc.doc_id}</StyledTableCell>
                                                <StyledTableCell align="left">{doc.title}</StyledTableCell>
                                                <StyledTableCell align="center">{null}</StyledTableCell>
                                                <StyledTableCell align="center">{handleUpdatedAt(doc.updatedAt)} days ago</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Grid container direction="row" justify="center">
                                                        <Grid item>
                                                            <Tooltip title="Delete document">
                                                                <IconButton style={{ color: "#db0e0b" }} aria-label="delete-button" component="span">
                                                                    <DeleteRoundedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                            <form>
                                <Button variant="contained" color="secondary" startIcon={<PublishRoundedIcon />} onClick={handleUploadClick}>
                                    Upload
                                </Button>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                    onChange={handleUploadChange}
                                />
                            </form>

                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Button variant="contained" style={{ backgroundColor: "#dbc200", color: "white" }}
                                startIcon={<SettingsEthernetRoundedIcon />}
                                href={pathname + "/mapping"}
                            >
                                Map Concepts
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" style={{ backgroundColor: "#039c15", color: "white" }} startIcon={<CreateRoundedIcon />}
                                //href={pathname + "/annotation"}
                                onClick={handleAnnotationClick}>
                                Annotate
                            </Button>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <Link to={pathname + "/annotation"} style={{ color: '#000', textDecoration: 'none' }}>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <AutorenewIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Auto Annotation" />
                                    </StyledMenuItem>
                                </Link>
                                <hr />
                                <Link to={pathname + "/annotation"} style={{ color: '#000', textDecoration: 'none' }}>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <PanToolIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Manual Curation" />
                                    </StyledMenuItem>
                                </Link>
                            </StyledMenu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    const membersTab = () => {
        return (
            <Grid
                container
                direction="column"
                spacing={3}
            >
                <Grid item>
                    <Grid container direction="row" justify="flex-start">
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">First Name</StyledTableCell>
                                            <StyledTableCell align="center">Last Name</StyledTableCell>
                                            <StyledTableCell align="center">Role</StyledTableCell>
                                            <StyledTableCell align="center">ID</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {membersRows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row" align="center">{row.first_name}</StyledTableCell>
                                                <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                                                <StyledTableCell align="center">{row.role}</StyledTableCell>
                                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="row" justify="flex-start" spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-full-width"
                                    label="Invite annotator"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </form>

                        </Grid>
                        <Grid item>
                            <IconButton color="primary" aria-label="invite-member" component="span">
                                <PersonAddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    const typesTab = () => {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
            >
                <Grid item>
                    <Grid container direction="row" justify="flex-start">
                        <Grid item xs={6}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Type</StyledTableCell>
                                            <StyledTableCell align="center">Color</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {typesRows.map((row) => (
                                            <StyledTableRow key={row.type}>
                                                <StyledTableCell component="th" scope="row" align="center">{row.type}</StyledTableCell>
                                                <StyledTableCell align="center" style={{ color: row.color, fontWeight: "bold" }}>{row.color}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary" startIcon={<AddCircleRoundedIcon />}>
                                Add Type
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <div className={classes.root}>
            <div style={{ paddingBottom: '20px' }}>
                <Grid container direction="column" justify="left" spacing={1}>
                    <Grid item>
                        <Button onClick={history.goBack} variant="contained" style={{ backgroundColor: "black", color: "white" }} startIcon={<ArrowBackIcon />}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ fontWeight: "bold"}}>
                            Description: {description}
                        </Typography>
                    </Grid>
                </Grid>

            </div>
            <div className={classes.style}>
                <StyledTabs value={value} onChange={handleTabsChange} aria-label="styled tabs example">
                    <StyledTab label="Documents" {...a11yProps(0)} />
                    <StyledTab label="Members" {...a11yProps(1)} />
                    <StyledTab label="Types" {...a11yProps(2)} />
                </StyledTabs>
                <TabPanel value={value} index={0}>
                    {documentsTab()}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {membersTab()}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {typesTab()}
                </TabPanel>
            </div>
        </div>
    );
}