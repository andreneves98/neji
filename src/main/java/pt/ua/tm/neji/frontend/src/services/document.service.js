import http from "../http-common";

class DocumentDataService {
    getAll() {
        return http.get("/documents");
    }

    getByID(doc_id) {
        return http.get(`/documents/${doc_id}`);
    }

    getByTitle(title) {
        return http.get(`/documents?title=${title}`);
    }

    create(data) {
        return http.post("/documents", data);
    }

    updateByID(doc_id, data) {
        return http.put(`/documents/${doc_id}`, data);
    }
    
    updateByTitle(title, data) {
        return http.put(`/documents?title=${title}`, data);
    }

    deleteAll() {
        return http.delete("/documents");
    }

    delete(doc_id) {
        return http.delete(`/documents/${doc_id}`);
    }
}