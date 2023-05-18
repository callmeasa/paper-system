package com.example.dataapi.controller;

import com.example.dataapi.Cue;
import com.example.dataapi.database.connect;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/NormalBlock")
public class NormalBlock {
    @RequestMapping("/GetCue_Viaid")
    @ResponseBody
    String GetCue_Viaid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        String id=request.getParameter("id");
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select * from cue where towhom = "+id;
        ResultSet rs = stmt.executeQuery(sql);
        if(rs.next()){
            List<Map<String,String>> list=new ArrayList<Map<String,String>>();

            do{
                Map<String,String> map = new HashMap<String,String>();
                String fromwhom = rs.getString("fromwhom");
                map.put("fromwhom",fromwhom);
                String content = rs.getString("content");
                map.put("content",content);
                list.add(map);
            }while (rs.next());
            Gson gson = new Gson();
            String finalResult= gson.toJson(list);
            return "{\"success\":true,\"cue\":"+finalResult+"}";
        }else{
            List<Map<String,String>> list=new ArrayList<Map<String,String>>();
            Gson gson = new Gson();
            String finalResult= gson.toJson(list);
            return "{\"success\":false,\"cue\":"+finalResult+"}";
        }
    }


    @RequestMapping("/DeleteCue_Viaid")
    @ResponseBody
    String DeleteCue_Viaid(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String id=request.getParameter("id");

        String sql="delete from cue where towhom = "+id;
        int rs=stmt.executeUpdate(sql);
        if(rs>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/Insert_cue")
    @ResponseBody
    String Insert_cue(@RequestBody Cue cue) throws SQLException, ClassNotFoundException {
        String towhom = cue.getTowhom();
        String fromwhom = cue.getFromwhom();
        String content = cue.getContent();
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String sql="insert into cue(towhom,fromwhom,content) values (\""+towhom+"\",\""+fromwhom+"\",\""+content+"\")";

        int rs=stmt.executeUpdate(sql);
        if(rs>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/GetTeacheridViaStudentid")
    @ResponseBody
    String GetTeacheridViaStudentid(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String sql="select teacherid from paper where studentid = "+id;

        ResultSet rs= stmt.executeQuery(sql);

        if(rs.next()){
            String teacherid = rs.getString("teacherid");

            return "{\"success\":true,\"teacherid\":\""+teacherid+"\"}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/GetStudentidViaTeachertid")
    @ResponseBody
    String GetStudentidViaTeachertid(String id) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String sql="select studentid from paper where teacherid = "+id;

        ResultSet rs= stmt.executeQuery(sql);

        if(rs.next()){
            String studentid = rs.getString("studentid");

            return "{\"success\":true,\"studentid\":\""+studentid+"\"}";
        }else{
            return "{\"success\":false}";
        }
    }
}
