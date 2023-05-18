package com.example.dataapi.controller;

import com.example.dataapi.*;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.dataapi.database.connect;

import javax.swing.plaf.nimbus.State;
import java.sql.*;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/TeacherBlock")
public class TeacherBlock {
    @RequestMapping("/FindMessageTobeConduct")
    @ResponseBody
    String FindMessageTobeConduct(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select * from studentconfirmpapermessage where isconfirm = 0 and teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }
    @RequestMapping("/studentconfirmpapermessageSet_isconfirmTo1")
    @ResponseBody
    String studentconfirmpapermessageSet_isconfirmTo1(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        Statement stmt2=connection.createStatement();
        String paperid=request.getParameter("paperid");
        String studentid=request.getParameter("studentid");

        String sql="update studentconfirmpapermessage set isconfirm = 1 where paperid = "+paperid;

        String setpaperischosen="update paper set ischosen = 1 where paperid = "+paperid;

        String setstudentid="update paper set studentid = "+studentid+" where paperid = "+paperid;


        int result=stmt.executeUpdate(sql);
        if(result>0){
            int result1=stmt1.executeUpdate(setpaperischosen);
            int result2=stmt2.executeUpdate(setstudentid);

            String GetRefnumber="select * from ref";
            Statement GetRef=connection.createStatement();

            ResultSet Ref=GetRef.executeQuery(GetRefnumber);
            while(Ref.next()){
                String refnumber=Ref.getString("refnumber");
                String Insert_ref="insert into papergrade(paperid,refnumber) values("+paperid+" , "+refnumber+")";
                Statement Ins=connection.createStatement();
                Ins.executeUpdate(Insert_ref);
            }
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }
    @RequestMapping("/studentconfirmpapermessageSetReject")
    @ResponseBody
    String studentconfirmpapermessageSetReject(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");

        String sql="delete from studentconfirmpapermessage where paperid = "+paperid;

        int result = stmt.executeUpdate(sql);
        if(result>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }
    @RequestMapping("/GetAllchosenPaper")
    @ResponseBody
    String GetAllchosenPaper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select name,studentid,paperid,taskplan from paper where ischosen = 1 and teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);

            String taskplan=rs.getString("taskplan");
            if(taskplan!=null){
                map.put("istaskplamupload","yes");
            }else{
                map.put("istaskplamupload","no");
            }
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }


    @RequestMapping("/SetTaskplan")
    @ResponseBody
    String SetTaskplan(@RequestBody Taskplan taskplan) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String taskplanvalue= taskplan.getTaskplanvalue();
        //System.out.println(startreport);
        String paperid=taskplan.getPaperid();
        //System.out.println(paperid);


        String sql="update paper set taskplan = '"+taskplanvalue+"' where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/SetPaperComment")
    @ResponseBody
    String SetPaperComment(@RequestBody PaperReason paperReason) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String reasonvalue= paperReason.getReasonvalue();
        //System.out.println(startreport);
        String paperid=paperReason.getPaperid();
        //System.out.println(paperid);
        int ispass= paperReason.getIspass();


        String sql="update paper set papercomment = '"+reasonvalue+"', paperstate = "+ispass+" where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            String sql_select="select teacherid , studentid from paper where id = "+paperid;
            Statement stmt_select=connection.createStatement();
            ResultSet rs_select = stmt_select.executeQuery(sql_select);
            rs_select.next();
            String towhom=rs_select.getString("studentid");
            String fromwhom=rs_select.getString(("teacherid"));
            String content;
            if(ispass==1){
                content="您的论文已被教师审核通过";
            }else{
                content="您的论文审核未通过,请及时按照指导老师建议进行修改";
            }
            String sql_cue="insert into cue(towhom,fromwhom,content) values (\""+towhom+"\",\""+fromwhom+"\",\""+content+"\")";
            Statement stmt_insert=connection.createStatement();
            stmt_insert.executeUpdate(sql_cue);
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }


    @RequestMapping("/GetStartReportUncheckPaper")
    @ResponseBody
    String GetStartReportUncheckPaper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select name,studentid,paperid from paper where studentid !="+'0'+" and startreportstate = 0 and teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);
            String studentname=GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetStartreportForTeacher")
    @ResponseBody
    String GetStartreportForTeacher(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");
        //System.out.println(startreport);
        //System.out.println(studentid);

        String sql="select startreport from paper where studentid = "+studentid;

        System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String startreport = rs.getString("startreport");
            startreport=jsonObject.escape(startreport);
            return "{\"success\":true,\"startreport\":\""+startreport+"\"}";
        }else{
            return "{\"success\":false,\"startreport\":\"未提交开题报告\"}";
        }

    }


    @RequestMapping("/Setstartreportstatetopass")
    @ResponseBody
    String Setstartreportstatetopass(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");


        String sql="update paper set startreportstate = 1 where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/Setstartreportstatetoreject")
    @ResponseBody
    String Setstartreportstatetoreject(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");


        String sql="update paper set startreportstate = 2 where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }



    @RequestMapping("/GetTranslationUncheckPaper")
    @ResponseBody
    String GetTranslationUncheckPaper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select name,studentid,paperid from paper where studentid !="+'0'+" and translationstate = 0 and teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);
            String studentname=GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetUncheckPaper")
    @ResponseBody
    String GetUncheckPaper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select name,studentid,paperid from paper where studentid !="+'0'+" and paperstate = 0 and teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);
            String studentname=GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/SetTranslationstatetopass")
    @ResponseBody
    String SetTranslationstatetopass(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");


        String sql="update paper set translationstate = 1 where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/SetTranslationstatetoreject")
    @ResponseBody
    String SetTranslationstatetoreject(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");


        String sql="update paper set translationstate = 2 where paperid = "+paperid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }
    @RequestMapping("/GetTranslationstate")
    @ResponseBody
    String GetTranslationstate(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String studentid=request.getParameter("studentid");

        String sql="select translationstate from paper where studentid="+studentid;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return "{\"success\":true,\"translationstate\":"+rs.getInt("translationstate")+"}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/GetPaperstate")
    @ResponseBody
        String GetPaperstate(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String studentid=request.getParameter("studentid");

        String sql="select paperstate from paper where studentid="+studentid;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return "{\"success\":true,\"paperstate\":"+rs.getInt("paperstate")+"}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/SetWeekreportComment")
    @ResponseBody
    String SetWeekreportComment(@RequestBody WeekReportReason weekReportReason) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String reasonvalue= weekReportReason.getReasonvalue();
        //System.out.println(startreport);
        String id=weekReportReason.getWeekreportid();
        //System.out.println(paperid);
        int ispass= weekReportReason.getIspass_Weekreport();


        String sql="update weekreport set comment = '"+reasonvalue+"', state = "+ispass+" where id = "+id;
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            String sql_select="select teacherid, studentid from weekreport where id = "+id;
            Statement stmt_select=connection.createStatement();
            ResultSet rs_select = stmt_select.executeQuery(sql_select);
            rs_select.next();
            String towhom=rs_select.getString("studentid");
            String fromwhom=rs_select.getString(("teacherid"));
            String content;
            if(ispass==1){
                content="您的周报已审核通过";
            }else{
                content="您的周报审核未通过,请按照教师指导进行改进";
            }
            String sql_cue="insert into cue(towhom,fromwhom,content) values (\""+towhom+"\",\""+fromwhom+"\",\""+content+"\")";
            Statement stmt_insert=connection.createStatement();
            stmt_insert.executeUpdate(sql_cue);
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }


    static String GetPapernameViaId(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select name from paper where paperid="+id;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("name");
        }else{
            return "findNothing";
        }
    }

   public static String GetStudentnameViaId(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select name from student where studentnumber="+id;
        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("name");
        }else{
            return "findNothing";
        }
    }

    public static String GetStudentnumberViaId(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select studentnumber from student where id="+id;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("studentnumber");
        }else{
            return "findNothing";
        }
    }

    public static String GetTeachernumberViaId(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select teachernumber from teacher where id="+id;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("teachernumber");
        }else{
            return "findNothing";
        }
    }


    public static String GetTeachernameViaId(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select name from teacher where teachernumber="+id;
        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("name");
        }else{
            return "findNothing";
        }
    }

    @RequestMapping("/GetPaperidAndTeacheridViaStudentid")
    @ResponseBody
    String GetPaperidAndTeacheridViaStudentid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String studentid=request.getParameter("studentid");

        String sql="select teacherid,paperid from paper where studentid="+studentid;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return "{\"success\":true,\"paperid\":\""+rs.getString("paperid")+"\",\"teacherid\":\""+rs.getString("teacherid")+"\"}";
        }else{
            return "{\"success\":false}";
        }

    }


    @RequestMapping("/GetPaperViaTeacherid")
    @ResponseBody
    String GetPaperViaTeacherid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");

        String sql="select name,studentid,paperid,ispass,studentid,ischosen,papercontent from paper where teacherid = "+teacherid;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String studentid = rs.getString("studentid");
            map.put("studentid",studentid);
            String name = GetPapernameViaId(paperid);
            map.put("papername",name);
            String ispass=String.valueOf(rs.getInt("ispass"));
            map.put("ispass",ispass);
            String ischosen=String.valueOf(rs.getInt("ischosen"));
            map.put("ischosen",ischosen);
            String papercontent=rs.getString("papercontent");
            map.put("papercontent",papercontent);
            String studentname = GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/insertintoPaper")
    @ResponseBody
    String insertintoPaper(@RequestBody Paper paper) throws SQLException, ClassNotFoundException {

        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement newstmt=connection.createStatement();
        String Name=paper.getName();
        String Teacherid=paper.getTeacherid();
        String Papercontent=paper.getPapercontent();

        String sql="insert into paper(name,teacherid,papercontent) values (\""+Name+"\",\""+Teacherid+"\",\""+Papercontent+"\")";
        System.out.println(sql);
        String setpaperid="UPDATE paper SET paperid = id where paperid = 2002";

        int rs=stmt.executeUpdate(sql);
        if (rs<=0){
            return "{\"success\":false,\"error\":\"insert fail\"}";
        }else{
            newstmt.executeUpdate(setpaperid);
            return "{\"success\":true,\"error\":\"there's no error\"}";
        }
    }

}
