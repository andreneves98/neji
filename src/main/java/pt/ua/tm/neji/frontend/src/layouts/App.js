import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../components/Navigator';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Copyright from '../components/Copyright';
import SA_AnnotationPage from '../views/SA_AnnotationPage';
import routes from "../routes.js";
import { Link } from 'react-router-dom';
import { regexifyString } from "regexify-string";

import { Route, Switch, useLocation } from "react-router-dom";
import { Typography } from '@material-ui/core';

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#000000',
            dark: '#006db3',
        },
        secondary: {
            main: '#009be5'
        }
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
    },
};

const drawerWidth = 256;

const styles = {
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flexGrow: 1,
        padding: theme.spacing(2, 1),
        background: '#eaeff1',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
};

/*export const result = (sections, section, tmp, title) => regexifyString({
    pattern: /\[.*?\]/gim,
    decorator: () => {
        return (
            <Link to={sections[section]}> {tmp} </Link>
        );
    },
    input: title,
});*/

function App(props) {
    const { classes } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/app") {
                return (
                    <Route
                        exact path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    let originalPath = useLocation().pathname;  // Current page path (e.g.: /app/projects)
    let sections = {}                           // Dictionary to store each section's path
    let orderedSections = [];                   // Helper array to store the correct path order
    let title = "";
    const getHeaderTitle = () => {
        // Loop until we get to the root
        while (originalPath !== "/app") {
            // Get the last section from the original path
            const lastSection = originalPath.split("/").pop();

            // Add section name and path to the dictionary
            sections[lastSection] = originalPath;

            // Add section to array
            orderedSections.push(lastSection);

            // Remove the last section from the original path
            originalPath = originalPath.replace("/" + lastSection, "");
        }
        orderedSections.reverse();
        console.log(orderedSections);

        for (let section of orderedSections) {
            let tmp = section.charAt(0).toUpperCase() + section.slice(1);   // capital letter
            console.log(tmp);
            let sectionLink = <Link to={sections[section]}>{tmp}</Link>;
            console.log(sectionLink);
            //title += ` ${sectionLink} »`;
            title += ` ${tmp} »`;
            //console.log(result(sections, section, tmp, title));
        }
        title = title.slice(0, -1);     // remove the last character '»'

        return title;

        /*let title;
        switch (location.pathname) {
          case "/app/projects":
            title = "Projects";
            break;
          case "/app/annotation":
            title = "Annotation";
            break;
          case "/app/mapping":
            title = "Mapping";
            break;
          case "/app/dictionaries":
            title = "Dictionaries";
            break;
          case "/app/machine learning models":
            title = "Machine Learning Models";
            break;
          default:
            title = "Projects";
            break;
        }
        return title;*/
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{ style: { width: drawerWidth } }} onClose={handleDrawerToggle} />
                    </Hidden>
                </nav>
                <div className={classes.app}>
                    <Header onDrawerToggle={handleDrawerToggle} title={getHeaderTitle()} />
                    <main className={classes.main}>
                        {console.log(getRoutes(routes))}
                        <Switch>{getRoutes(routes)}</Switch>
                    </main>
                    <footer className={classes.footer}>
                        <Copyright />
                    </footer>
                </div>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);