import React, { useEffect } from 'react';
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
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { Tooltip } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import Project from './Project';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import ProjectDataService from "../services/project.service";
import DocumentDataService from "../services/document.service";

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

function createData(name, manager, documents, members, status) {
    return { name, manager, documents, members, status };
}

const rows = [
    createData('Genes Project', 'John', 3, 2, 'Open'),
    createData('Diseases', 'Alice', 1, 2, 'Closed'),
];

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ProjectsPage() {
    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState(null);
    const [projects, setProjects] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const mountedRef = React.useRef(false); // this ref will track if the component is mounted

    const handlePopupOpen = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        setOpen(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleCreateProject = () => {
        console.log(name, description);
        var data;
        if (description !== null) {
            data = {
                proj_name: name,
                description: description,
                manager: "marcelovieira39"
            };
        }
        else {
            data = {
                proj_name: name,
                manager: "marcelovieira39"
            };
        }
        
        ProjectDataService.create(data)
            .then(response => {
                console.log(response.data);
                if(mountedRef.current) {
                    setLoading(true);
                    setReload(true);    // trigger a re-render
                    handlePopupClose();
                    setDescription(null);   // reset description in case is empty in the next project creation
                }
                
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                if(mountedRef.current) {
                    setLoading(false); 
                 }
            });
    }

    const handleDeleteProject = (proj_id) => {
        ProjectDataService.deleteByID(proj_id)
            .then(response => {
                if(mountedRef.current) {
                    setLoading(true);
                    console.log(response);
                    setReload(true);
                }
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                if(mountedRef.current) {
                    setLoading(false); 
                }
            });
    }

    const getProjects = () => {
        console.log("GET PROJECTS!!!!");
        var data;
        // Fetch all projects without nr_documents and nr_members
        ProjectDataService.getAll()
            .then(response => {
                if(mountedRef.current) {
                    setLoading(true); 
                 }
                console.log(response.data);
                data = response.data;

                // Fetch the number of documents that belong to each project
                data.forEach((project, index) => {
                    DocumentDataService.getByProjID(project.proj_id)
                        .then(response => {
                            console.log("DOCUMENTS FETCH", response);
                            var nr_documents = response.data.length;
                            //console.log(nr_documents);
                            
                            project["nr_documents"] = nr_documents;
                            //console.log(project);
                            //console.log("data", data);

                            if(index === data.length - 1) {
                                if(mountedRef.current) {
                                    setProjects(data);
                                }
                            }
                                
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                if(mountedRef.current) {
                    setLoading(false); 
                 }
            });
        
    }

    // Unmount and cleanup
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    }, []);

    // Replaces React class lifecycle methods like componentDidMount, componentDidUpdate and componentWillUnmount
    useEffect(() => {
        // Runs everytime 'reload' changes state to re-render the components
        getProjects();
        if(mountedRef.current) {
            setReload(false);
        }
        
    }, [reload]);

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
                                        <StyledTableCell align="left">ID</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Manager</StyledTableCell>
                                        <StyledTableCell align="center">Documents</StyledTableCell>
                                        <StyledTableCell align="center">Members</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {console.log("PROJECTS DATA", projects), projects.length > 0 ? projects.map((project) => (
                                        <StyledTableRow key={project.proj_id}>
                                            <StyledTableCell align="left">{project.proj_id}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Link to={{
                                                    pathname: location.pathname + "/" + project.proj_name.toLowerCase().replace(" ", "-"),
                                                    state: {projId: project.proj_id, projName: project.proj_name, description: project.description},
                                                }}>
                                                    {project.proj_name}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{project.manager}</StyledTableCell>
                                            <StyledTableCell align="center">{project.nr_documents}</StyledTableCell>
                                            <StyledTableCell align="center">{project.n_members}</StyledTableCell>
                                            <StatusStyledCell align="center">{project.status}</StatusStyledCell>
                                            <StyledTableCell align="center">
                                                <Tooltip title="Delete Project">
                                                    <IconButton 
                                                        style={{ color: "#db0e0b" }} 
                                                        aria-label="delete-button" 
                                                        size="small"
                                                        onClick={() => handleDeleteProject(project.proj_id)}
                                                    >
                                                        <DeleteRoundedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                        : <StyledTableRow>
                                            <StyledTableCell component="th" scope="row">{"null"}</StyledTableCell>
                                            <StyledTableCell align="center">{"null"}</StyledTableCell>
                                            <StyledTableCell align="center">{"null"}</StyledTableCell>
                                            <StyledTableCell align="center">{"null"}</StyledTableCell>
                                            <StyledTableCell align="center">{"null"}</StyledTableCell>
                                            <StyledTableCell align="center">{"null"}</StyledTableCell>
                                        </StyledTableRow>}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container direction="row" justify="center">
                    <Grid item xs={10}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AddCircleIcon />}
                            onClick={handlePopupOpen}
                        >
                            New Project
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handlePopupClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <Typography variant="h5" align="left">
                                                Create new project
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{ paddingBottom: "2px", paddingTop: "4px" }}>
                                            <form noValidate autoComplete="off">
                                                <TextField
                                                    id="outlined-full-width"
                                                    label="Project Name"
                                                    fullWidth
                                                    margin="dense"
                                                    variant="outlined"
                                                    onChange={handleNameChange}
                                                />
                                            </form>
                                        </Grid>
                                        <Grid item style={{ paddingBottom: "20px", paddingTop: "0px" }}>
                                            <form noValidate autoComplete="off">
                                                <TextField
                                                    id="outlined-full-width"
                                                    label="Description"
                                                    fullWidth
                                                    margin="dense"
                                                    variant="outlined"
                                                    multiline
                                                    rowsMax={10}
                                                    onChange={handleDescriptionChange}
                                                />
                                            </form>
                                        </Grid>
                                        <Grid container direction="row" justify="flex-end" spacing={1}>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#db0e0b", color: "white" }}
                                                    startIcon={<CancelIcon />}
                                                    onClick={handlePopupClose}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#12b500", color: "white" }}
                                                    startIcon={<AddCircleIcon />}
                                                    onClick={handleCreateProject}
                                                >
                                                    Create
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Fade>
                        </Modal>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}