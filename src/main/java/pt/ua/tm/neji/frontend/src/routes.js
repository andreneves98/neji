import AnnotationPage from "./views/AnnotationPage";
import Mapping from "./views/Mapping";

const routes = [
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
    }
]

export default routes;