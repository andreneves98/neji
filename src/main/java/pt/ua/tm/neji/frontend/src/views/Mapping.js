import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#232f3e",
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "sans-serif",
        align: "center"
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const DetailsCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#496180",     // #496180  3a4e66
        color: theme.palette.common.white,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "sans-serif"
    },
    body: {
        fontSize: 13,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(sourceCode, sourceTerm, matchScore, conceptID, conceptName, domain, conceptClass, vocabulary,
    conceptCode, standardConcept, parents, children, status, user) {
    return {
        sourceCode, sourceTerm, matchScore, conceptID, conceptName, domain, conceptClass, vocabulary,
        conceptCode, standardConcept, parents, children, status, user
    };
}

const rows = [
    createData('', 'Vitamin B12', '1,00', 1308738, 'vitamin B12', 'Drug', 'Ingredient', 'RxNorm',
        11248, 'S', 0, 767, 'Approved', 'user'),
    createData('', 'Vitamin B12 2', '1,00', 1308738, 'vitamin B12', 'Drug', 'Ingredient', 'RxNorm',
        11248, 'S', 0, 767, 'Approved', 'user'),
    createData('', 'Vitamin B12 3', '1,00', 1308738, 'vitamin B12', 'Drug', 'Ingredient', 'RxNorm',
        11248, 'S', 0, 767, 'Approved', 'user'),
    createData('', 'Vitamin B12 4', '1,00', 1308738, 'vitamin B12', 'Drug', 'Ingredient', 'RxNorm',
        11248, 'S', 0, 767, 'Approved', 'user'),
    createData('', 'Cholesterin', '0,83', 19059097, 'cholesterol', 'Drug', 'Ingredient', 'RxNorm',
        2438, 'S', 0, 0, '---', '---'),
    createData('', 'Cholesterin 2', '0,83', 19059097, 'cholesterol', 'Drug', 'Ingredient', 'RxNorm',
        2438, 'S', 0, 0, '---', '---'),
    createData('', 'Cholesterin 3', '0,83', 19059097, 'cholesterol', 'Drug', 'Ingredient', 'RxNorm',
        2438, 'S', 0, 0, '---', '---'),
    createData('', 'Cholesterin 4', '0,83', 19059097, 'cholesterol', 'Drug', 'Ingredient', 'RxNorm',
        2438, 'S', 0, 0, '---', '---'),
];


function NormalTable(props) {
    const { classes } = props;
    const history = useHistory();

    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
                <Button onClick={history.goBack} variant="contained" style={{ backgroundColor: "black", color: "white" }} startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="customized table" padding="none">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Source Code</StyledTableCell>
                                <StyledTableCell align="center">Source term</StyledTableCell>
                                <StyledTableCell align="center">Match Score</StyledTableCell>
                                <StyledTableCell align="center">Concept ID</StyledTableCell>
                                <StyledTableCell align="center">Concept Name</StyledTableCell>
                                <StyledTableCell align="center">Domain</StyledTableCell>
                                <StyledTableCell align="center">Concept Class</StyledTableCell>
                                <StyledTableCell align="center">Vocabulary</StyledTableCell>
                                <StyledTableCell align="center">Concept Code</StyledTableCell>
                                <StyledTableCell align="center">Standard Concept</StyledTableCell>
                                <StyledTableCell align="center">Parents</StyledTableCell>
                                <StyledTableCell align="center">Children</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">User</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.conceptID}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.sourceCode}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.sourceTerm}</StyledTableCell>
                                    <StyledTableCell align="center">{row.matchScore}</StyledTableCell>
                                    <StyledTableCell align="center">{row.conceptID}</StyledTableCell>
                                    <StyledTableCell align="center"> {row.conceptName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.domain}</StyledTableCell>
                                    <StyledTableCell align="center">{row.conceptClass}</StyledTableCell>
                                    <StyledTableCell align="center">{row.vocabulary}</StyledTableCell>
                                    <StyledTableCell align="center"> {row.conceptCode}</StyledTableCell>
                                    <StyledTableCell align="center">{row.standardConcept}</StyledTableCell>
                                    <StyledTableCell align="center">{row.parents}</StyledTableCell>
                                    <StyledTableCell align="center">{row.children}</StyledTableCell>
                                    <StyledTableCell align="center"> {row.status}</StyledTableCell>
                                    <StyledTableCell align="center"> {row.user}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>


    );
}

NormalTable.propTypes = {
    classes: PropTypes.object.isRequired,
};


const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        /*'&:nth-of-type(even)': {  // com even não faz nada, com odd ficam todas com o hover
            backgroundColor: theme.palette.action.hover,
        },*/
    },
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    //const [rowSelected, setSelected] = React.useState("");
    //const [selected, setSelected] = React.useState([]);
    const classes = useRowStyles();

    /*const handleSelected = (event, sourceTerm) => {
        console.log("SELECTED ROW:", sourceTerm);
        setSelected(sourceTerm);
        console.log(rowSelected)
    }*/

    const handleClick = () => {
        console.log("in row, source term:", row.sourceTerm);
        props.onClick(row.sourceTerm);
    }
    

    //const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <React.Fragment>
            <TableRow
                hover
                key={row.conceptID}
                className={classes.root} > {/*style={{ backgroundColor: "#f7f7f7" }}*/}
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                    {row.sourceTerm}
                </TableCell>
                <TableCell>{row.matchScore}</TableCell>
                <TableCell>{row.conceptCode}</TableCell>
                <TableCell>{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} bgcolor="#fff">
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="mappings">
                                <TableHead>
                                    <TableRow>
                                        <DetailsCell>ID</DetailsCell>
                                        <DetailsCell>Name</DetailsCell>
                                        <DetailsCell align="center">Domain</DetailsCell>
                                        <DetailsCell align="center">Parents/Children</DetailsCell>
                                        <DetailsCell align="center">User</DetailsCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.conceptID}>
                                        <DetailsCell component="th" scope="row">
                                            {row.conceptID}
                                        </DetailsCell>
                                        <DetailsCell>{row.conceptName}</DetailsCell>
                                        <DetailsCell align="center">{row.domain}</DetailsCell>
                                        <DetailsCell align="center">
                                            {`${row.parents}/${row.children}`}
                                        </DetailsCell>
                                        <DetailsCell align="center">{row.user}</DetailsCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

/*Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};*/


function CollapsibleTable() {
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (event, sourceTerm) => {
        console.log("in handle click source term:", sourceTerm);
        const selectedIndex = selected.indexOf(sourceTerm);
        console.log("SELECTED INDEX:", selectedIndex);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, sourceTerm);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        console.log("SELECTED:", selected);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Paper style={{ width: '100%' }}>
                    <TableContainer >
                        <Table stickyHeader aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <Button onClick={history.goBack} variant="contained" style={{ backgroundColor: "white", color: "black" }} startIcon={<ArrowBackIcon />}>
                                            Back
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell>Source Term</StyledTableCell>
                                    <StyledTableCell>Match Score</StyledTableCell>
                                    <StyledTableCell>Concept Code</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <Row key={row.sourceTerm} row={row}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper >
            </Grid>
        </Grid>


    );
}

export default CollapsibleTable;
//export default NormalTable;