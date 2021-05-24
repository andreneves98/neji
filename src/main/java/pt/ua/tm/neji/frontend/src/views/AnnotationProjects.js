import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
//import { Link } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import Project from './Project';

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

function createData(name, manager, documents, members, status) {
  return { name, manager, documents, members, status };
}

const rows = [
  createData('Genes Project', 'John', 3, 2, 'Open'),
  createData('Diseases', 'Alice', 1, 2, 'Closed'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AnnotationProjects() {
  const classes = useStyles();
  const location = useLocation();

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
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="center">Manager</StyledTableCell>
                      <StyledTableCell align="center">Documents</StyledTableCell>
                      <StyledTableCell align="center">Members</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          <Link to={location.pathname + "/" + row.name.toLowerCase().replace(" ", "-")}>
                            {row.name}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.manager}</StyledTableCell>
                        <StyledTableCell align="center">{row.documents}</StyledTableCell>
                        <StyledTableCell align="center">{row.members}</StyledTableCell>
                        <StatusStyledCell align="center">
                            {row.status}
                        </StatusStyledCell>
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
              <Button  variant="contained" color="primary" startIcon={<AddCircleIcon />}>
                New Project
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}