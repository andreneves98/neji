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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useLocation, Link } from 'react-router-dom';

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
        minWidth: 700,
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

function createData(title, annotations, lastUpdate) {
    return { title, annotations, lastUpdate };
}

const rows = [
    createData('Upregulation of chemokines and their receptors in Duchenne' +
    ' muscular dystrophy: potential for attenuation of myofiber necrosis', 245, '3 minutes ago'),
    createData('Sesamin extends the mean lifespan of fruit flies', 564, '2 hours ago'),
];

export default function CustomizedTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const documentsTable = () => {
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
                                            <StyledTableCell>Title</StyledTableCell>
                                            <StyledTableCell align="right">Annotations</StyledTableCell>
                                            <StyledTableCell align="right">Last Update</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                                                <StyledTableCell align="right">{row.annotations}</StyledTableCell>
                                                <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
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
                            <Button variant="contained" color="primary" startIcon={<AddCircleIcon />}>
                                New Project
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
                    {documentsTable()}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Page Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Page Three
                </TabPanel>
            </div>
        </div>
    );
}