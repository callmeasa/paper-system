package com.example.dataapi.controller;
import com.example.dataapi.Comment;
import com.example.dataapi.Mail;
import com.example.dataapi.Paper;
import com.example.dataapi.Papergrade;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.dataapi.database.connect;
import java.sql.*;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/RefBlock")
public class RefBlock {
    @RequestMapping("/GetAll_ispass_0_Frompaper")
    @ResponseBody
    String GetAll_ispass_0_Frompaper() throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String sql="select * from paper where ispass = 0";
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String teacherid = rs.getString("teacherid");
            map.put("teacherid",teacherid);
            String name = rs.getString("name");
            map.put("papername",name);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/Set_ispass_1_paper")
    @ResponseBody
    String Set_ispass_1_paper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");

        String sql="update paper set ispass = 1 where paperid = "+paperid;

        int result=stmt.executeUpdate(sql);
        if(result>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/Set_ispass_2_paper")
    @ResponseBody
    String Set_ispass_2_paper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String paperid=request.getParameter("paperid");

        String sql="update paper set ispass = 2 where paperid = "+paperid;

        int result=stmt.executeUpdate(sql);
        if(result>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/GetAll_state_0_Frompaper")
    @ResponseBody
    String GetAll_state_0_Frompaper(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String refnumber=request.getParameter("refnumber");

        String sql="select p.*,g.state from paper p left join papergrade g on p.paperid = g.paperid where g.state=0 and g.refnumber = "+refnumber;
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String paperid = rs.getString("paperid");
            map.put("paperid",paperid);
            String teacherid = rs.getString("teacherid");
            map.put("teacherid",teacherid);
            String studentid = rs.getString("studentid");
            map.put("studentid",teacherid);
            String studentname=TeacherBlock.GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            String name = rs.getString("name");
            map.put("papername",name);
            String papercontent=rs.getString("papercontent");
            map.put("papercontent",papercontent);
            String teachercomment = rs.getString("teachercomment");
            map.put("teachercomment",teachercomment);
            String state = String.valueOf(rs.getInt("state"));
            map.put("state",state);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetPapercomment")
    @ResponseBody
    String GetPapercomment(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String paperid=request.getParameter("paperid");

        String sql="select papercomment from paper where paperid="+paperid;

        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return "{\"success\":true,\"papercomment\":\""+rs.getString("papercomment")+"\"}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/Updatepapergrade")
    @ResponseBody
    String Updatepapergrade(@RequestBody Papergrade papergrade ) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String paperid= papergrade.getPaperid();

        String grade=papergrade.getGrade();

        String gradecomment=papergrade.getGradecomment();

        String refnumber=papergrade.getRefnumber();

        String sql="update papergrade set grade = '"+grade+"',gradecomment = '"+gradecomment+"' ,state=1 where paperid = '"+paperid+"'and refnumber = '"+refnumber+"'";

        //System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/GetPapergradeViaStudentid")
    @ResponseBody
    String GetPapergradeViaStudentid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");
        String paperid=GetPaperidViaStudentid(studentid);
        System.out.println(paperid);
        if(paperid.equals("findNothing")){

            return "{\"success\":false}";
        }
        String sql="select grade,gradecomment from papergrade where paperid = '"+paperid+"' and state=1";
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String grade=rs.getString("grade");
            map.put("grade",grade);
            String gradecomment=rs.getString("gradecomment");
            map.put("gradecomment",gradecomment);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return "{\"success\":true,\"papergradeset\":"+finalResult+"}";
    }

    @RequestMapping("/insertintomail")
    @ResponseBody
    String insertintomail(@RequestBody Mail a) throws SQLException, ClassNotFoundException {

        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement newstmt=connection.createStatement();
        String from=a.getFrom();
        String to=a.getTo();
        String content=a.getContent();
        String topic = a.getTopic();

        String sql="insert into mail(`from`,`to`,topic,content) values('"+from+"','"+to+"','"+topic+"','"+content+"')";
        System.out.println(sql);

        int rs=stmt.executeUpdate(sql);
        if (rs<=0){
            return "{\"success\":false,\"error\":\"insert fail\"}";
        }else{
            return "{\"success\":true,\"error\":\"there's no error\"}";
        }
    }

    @RequestMapping("/GetMailViaid")
    @ResponseBody
    String GetMailViaid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String id=request.getParameter("id");

        String sql="select `from`,topic,state,cdate,id from mail where `to` = '"+id+"'";
        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String from=rs.getString("from");
            map.put("from",from);
            String topic=rs.getString("topic");
            map.put("topic",topic);
            String mailid=String.valueOf(rs.getInt("id"));
            map.put("mailid",mailid);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            String state=String.valueOf(rs.getInt("state"));
            map.put("state",state);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }
    @RequestMapping("/GetMailContent")
    @ResponseBody
    String GetMailContent(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        String mailid=request.getParameter("mailid");

        String sql="select content,topic,cdate from mail where id = "+mailid;


        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String updatestate="update mail set state=1 where id= "+mailid;
            stmt1.executeUpdate(updatestate);
            String content = rs.getString("content");
            content=jsonObject.escape(content);

            return "{\"success\":true,\"content\":\""+content+"\"}";
        }else{
            return "{\"success\":false,\"content\":\"未知错误\"}";
        }

    }

    public static String GetPaperidViaStudentid(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select paperid from paper where studentid="+id;
        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);
        if(rs.next()){
            return rs.getString("paperid");
        }else{
            return "findNothing";
        }
    }

}

