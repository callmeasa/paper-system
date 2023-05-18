package com.example.dataapi;

public class Papergrade {
    private String grade;
    private String gradecomment;

    public String getRefnumber() {
        return refnumber;
    }

    public void setRefnumber(String refnumber) {
        this.refnumber = refnumber;
    }

    private String refnumber;
    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getGradecomment() {
        return gradecomment;
    }

    public void setGradecomment(String gradecomment) {
        this.gradecomment = gradecomment;
    }

    public String getPaperid() {
        return paperid;
    }

    public void setPaperid(String paperid) {
        this.paperid = paperid;
    }

    private String paperid;
}
