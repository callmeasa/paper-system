package com.example.dataapi;

public class Paper {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPapercontent() {
        return papercontent;
    }

    public void setPapercontent(String papercontent) {
        this.papercontent = papercontent;
    }

    public String getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(String teacherid) {
        this.teacherid = teacherid;
    }

    private String papercontent;
    private String teacherid;
}
