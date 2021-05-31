import ProjectsPage from "./views/ProjectsPage";
import SA_AnnotationPage from "./views/SA_AnnotationPage";
import Mapping from "./views/Mapping";
import Project from "./views/Project";
import AnnotateProject from "./views/AnnotateProject";

const routes = [
    {
        path: "/stand-alone annotation",
        name: "Stand-alone Annotation",
        component: SA_AnnotationPage,
        layout: "/app",
    },
    {
        path: "/projects",
        name: "Annotation Projects",
        component: ProjectsPage,
        layout: "/app",
    },
    {
        path: "/mapping",
        name: "Mapping",
        component: Mapping,
        layout: "/app",
    },
    {
        path: "/projects/:name",
        name: "Project",
        component: Project,
        layout: "/app"
    },
    {
        path: "/projects/:name/annotation",
        name: "Project",
        component: AnnotateProject,
        layout: "/app"
    }
]

export default routes;