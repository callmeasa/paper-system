package com.example.dataapi;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

public class FileForPS implements Serializable {
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCata() {
        return cata;
    }

    public void setCata(String cata) {
        this.cata = cata;
    }

    private MultipartFile file;

    private String id;

    private String cata;
}
