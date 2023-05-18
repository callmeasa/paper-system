package com.example.dataapi;

public class WeekReportReason {
    public String getReasonvalue() {
        return reasonvalue;
    }

    public void setReasonvalue(String reasonvalue) {
        this.reasonvalue = reasonvalue;
    }

    public String getWeekreportid() {
        return weekreportid;
    }

    public void setWeekreportid(String weekreportid) {
        this.weekreportid = weekreportid;
    }

    public int getIspass_Weekreport() {
        return ispass_Weekreport;
    }

    public void setIspass_Weekreport(int ispass_Weekreport) {
        this.ispass_Weekreport = ispass_Weekreport;
    }

    private String reasonvalue;
    private String weekreportid;
    private int ispass_Weekreport;
}
