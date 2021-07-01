import http from "../http-common";

class ProjectDataService {
    getAll() {
        return http.get("/projects");
    }

    getByID(proj_id) {
        return http.get(`/projects/${proj_id}`);
    }

    getByName(proj_name) {
        return http.get(`/projects?proj_name=${proj_name}`);
    }

    create(data) {
        return http.post("/projects", data);
    }

    updateByID(proj_id, data) {
        return http.put(`/projects/${proj_id}`, data);
    }
    
    updateByName(proj_name, data) {
        return http.put(`/projects?proj_name=${proj_name}`, data);
    }

    deleteAll() {
        return http.delete("/projects");
    }

    delete(proj_id) {
        return http.delete(`/projects/${proj_id}`);
    }
}

export default new ProjectDataService();