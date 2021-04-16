package pt.ua.tm.neji.sdk;

import java.util.List;

public class Annotation {
    private int id;
    private int start;
    private int end;
    private String text;
    private List<Term> terms;

    /*public Annotation(int id, int start, int end, String text, List<Term> terms) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.text = text;
        this.terms = terms;
    }*/

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStart() {
        return this.start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getEnd() {
        return this.end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Term> getTerms() {
        return this.terms;
    }

    public void setTerms(List<Term> terms) {
        this.terms = terms;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", text='" + getText() + "'" +
            ", terms='" + getTerms() + "'" +
            "}";
    }
    
}
