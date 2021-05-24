import AnnotationProjects from "./views/AnnotationProjects";
import AnnotationPage from "./views/AnnotationPage";
import Mapping from "./views/Mapping";
import Project from "./views/Project";

const routes = [
    {
        path: "/projects",
        name: "Annotation Projects",
        component: AnnotationProjects,
        layout: "/app",
    },
    {
        path: "/annotation",
        name: "Annotation",
        component: AnnotationPage,
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
    }
]

export default routes;