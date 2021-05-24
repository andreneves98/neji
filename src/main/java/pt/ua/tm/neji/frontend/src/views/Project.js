import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { useLocation, Link } from 'react-router-dom';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

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
    table: {
        
    }
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
        backgroundColor: "rgb(102, 161, 255)",
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

function createDocsData(title, annotations, lastUpdate) {
    return { title, annotations, lastUpdate };
}

function createMembersData(name, role) {
    return { name, role };
}

function createTypesData(type, color) {
    return { type, color };
}

const docsRows = [
    createDocsData('Upregulation of chemokines and their receptors in Duchenne' +
    ' muscular dystrophy: potential for attenuation of myofiber necrosis', 245, '3 minutes ago'),
    createDocsData('Sesamin extends the mean lifespan of fruit flies', 564, '2 hours ago'),
];

const membersRows = [
    createMembersData('John', 'Project Manager'),
    createMembersData('Alice', 'Annotator'),
];

const typesRows = [
    createTypesData('GENE', 'Green'),
];

export default function CustomizedTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const documentsTab = () => {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
            >
                <Grid item>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Title</StyledTableCell>
                                            <StyledTableCell align="center">Annotations</StyledTableCell>
                                            <StyledTableCell align="center">Last Update</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {docsRows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row" align="center">{row.title}</StyledTableCell>
                                                <StyledTableCell align="center">{row.annotations}</StyledTableCell>
                                                <StyledTableCell align="center">{row.lastUpdate}</StyledTableCell>
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
                        <Grid item xs={10}>
                            <Button variant="contained" color="primary" startIcon={<PublishRoundedIcon />}>
                                Upload
                            </Button>
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
                spacing={5}
            >
                <Grid item>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Role</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {membersRows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row" align="center">{row.name}</StyledTableCell>
                                                <StyledTableCell align="center">{row.role}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
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
                                                <StyledTableCell align="center">{row.color}</StyledTableCell>
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
                        <Grid item xs={10}>
                            <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon />}>
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
            <div className={classes.style}>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
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