package com.example.dataapi;

public class Cue {
    public String getTowhom() {
        return towhom;
    }

    public void setTowhom(String towhom) {
        this.towhom = towhom;
    }

    public String getFromwhom() {
        return fromwhom;
    }

    public void setFromwhom(String fromwhom) {
        this.fromwhom = fromwhom;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    private String towhom;
    private String fromwhom;
    private String content;

}
