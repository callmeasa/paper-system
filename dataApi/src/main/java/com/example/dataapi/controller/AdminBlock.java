package com.example.dataapi.controller;

import com.example.dataapi.Crew;
import com.example.dataapi.Message;
import com.example.dataapi.WeekReport;
import com.example.dataapi.database.connect;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.spy.memcached.MemcachedClient;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.swing.*;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import static com.example.dataapi.controller.TeacherBlock.GetStudentnumberViaId;
import static com.example.dataapi.controller.TeacherBlock.GetTeachernameViaId;

@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/AdminBlock")
public class AdminBlock {
    @RequestMapping("/GetCrewMessage")
    @ResponseBody
    String GetCrewMessage(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        int show=Integer.parseInt(request.getParameter("show"));
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        if(show==0){
            String sqlforstudent="select * from student";
            String sqlforteacher="select * from teacher";
            ResultSet rs_student=stmt.executeQuery(sqlforstudent);
            ResultSet rs_teacher=stmt1.executeQuery(sqlforteacher);

            while(rs_student.next()){
                Map<String,String> map = new HashMap<String,String>();
                String id=String.valueOf(rs_student.getInt("id"));
                map.put("id",id);
                String name=rs_student.getString("name");
                map.put("name",name);
                String number=rs_student.getString("studentnumber");
                map.put("number",number);
                String password=rs_student.getString("password");
                map.put("password",password);
                map.put("cata","0");
                list.add(map);
            }
            while(rs_teacher.next()){
                Map<String,String> map = new HashMap<String,String>();
                String id=String.valueOf(rs_teacher.getInt("id"));
                map.put("id",id);
                String name=rs_teacher.getString("name");
                map.put("name",name);
                String number=rs_teacher.getString("teachernumber");
                map.put("number",number);
                String password=rs_teacher.getString("password");
                map.put("password",password);
                map.put("cata","1");
                list.add(map);
            }
        }else if(show==1){
            String sqlforstudent="select * from student";
            ResultSet rs_student=stmt.executeQuery(sqlforstudent);

            while(rs_student.next()){
                Map<String,String> map = new HashMap<String,String>();
                String id=String.valueOf(rs_student.getInt("id"));
                map.put("id",id);
                String name=rs_student.getString("name");
                map.put("name",name);
                String number=rs_student.getString("studentnumber");
                map.put("number",number);
                String password=rs_student.getString("password");
                map.put("password",password);
                map.put("cata","0");
                list.add(map);
            }

        }else if(show==2){
            String sqlforteacher="select * from teacher";
            ResultSet rs_teacher=stmt1.executeQuery(sqlforteacher);

            while(rs_teacher.next()){
                Map<String,String> map = new HashMap<String,String>();
                String id=String.valueOf(rs_teacher.getInt("id"));
                map.put("id",id);
                String name=rs_teacher.getString("name");
                map.put("name",name);
                String number=rs_teacher.getString("teachernumber");
                map.put("number",number);
                String password=rs_teacher.getString("password");
                map.put("password",password);
                map.put("cata","1");
                list.add(map);
            }
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetCrewMessageVianumber")
    @ResponseBody
    String GetCrewMessageVianumber(HttpServletRequest request, HttpServletResponse response)throws SQLException, ClassNotFoundException{
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        String number=request.getParameter("number");
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        String sql_student="select * from student where studentnumber = "+number;
        String sql_teacher="select * from teacher where teachernumber = "+number;
        System.out.println(sql_student);
        System.out.println(sql_teacher);
        ResultSet rs_student=stmt.executeQuery(sql_student);
        ResultSet rs_teacher=stmt1.executeQuery(sql_teacher);
        while(rs_student.next()){
            Map<String,String> map = new HashMap<String,String>();
            String id=String.valueOf(rs_student.getInt("id"));
            map.put("id",id);
            String name=rs_student.getString("name");
            map.put("name",name);
            String Number=rs_student.getString("studentnumber");
            map.put("number",Number);
            String password=rs_student.getString("password");
            map.put("password",password);
            map.put("cata","0");
            list.add(map);
        }
        while(rs_teacher.next()){
            Map<String,String> map = new HashMap<String,String>();
            String id=String.valueOf(rs_teacher.getInt("id"));
            map.put("id",id);
            String name=rs_teacher.getString("name");
            map.put("name",name);
            String Number=rs_teacher.getString("teachernumber");
            map.put("number",Number);
            String password=rs_teacher.getString("password");
            map.put("password",password);
            map.put("cata","1");
            list.add(map);
        }

        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetNameAndPassword")
    @ResponseBody
    String GetNameAndPassword(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int cata=Integer.parseInt(request.getParameter("cata"));
        String id=request.getParameter("id");
        String name;
        String password;

        if(cata==0){
            String sql="select name,password from student where id = "+id;
            ResultSet rs=stmt.executeQuery(sql);
            if(rs.next()){
                name=rs.getString("name");
                password=rs.getString("password");
                return "{\"success\":true,\"name\":\""+name+"\",\"password\":\""+password+"\"}";
            }else{
                return "{\"success\":false}";
            }
        }else{
            String sql="select name,password from teacher where id = "+id;
            ResultSet rs=stmt.executeQuery(sql);
            if(rs.next()){
                name=rs.getString("name");
                password=rs.getString("password");
                return "{\"success\":true,\"name\":\""+name+"\",\"password\":\""+password+"\"}";
            }else{
                return "{\"success\":false}";
            }
        }
    }
    @RequestMapping("/UpdateCrewMessage")
    @ResponseBody
    String UpdateCrewMessage(@RequestBody Crew crew) throws SQLException, ClassNotFoundException, IOException, ExecutionException, InterruptedException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String name=crew.getName();
        String password=crew.getPassword();
        String id= crew.getNumber();
        int cata=crew.getCata();
        if(cata==0){
            MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));
            String sql="update student set name = '"+name+"',password = '"+password+"' where id = "+id;
            String number=GetStudentnumberViaId(id);
            int rs= stmt.executeUpdate(sql);
            if(rs>0){
                if(mcc.get(number)!=null){
                Future fo=mcc.set(number,0,password);
                fo.get();
                }
                mcc.shutdown();
                return "{\"success\":true}";
            }else{
                return "{\"success\":false}";
            }
        }else{
            MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));
            String sql="update teacher set name = '"+name+"',password = '"+password+"' where id = "+id;
            String number=GetTeachernameViaId(id);
            int rs= stmt.executeUpdate(sql);
            if(rs>0){
                if(mcc.get(number)!=null){
                    Future fo=mcc.set(number,0,password);
                    fo.get();
                }
                mcc.shutdown();
                return "{\"success\":true}";
            }else{
                return "{\"success\":false}";
            }
        }
    }
    @RequestMapping("/DeleteCrew")
    @ResponseBody
    String DeleteCrew(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int cata= Integer.parseInt(request.getParameter("cata"));
        String id=request.getParameter("id");
        String table = cata==0?"student":"teacher";
        String sql="delete from "+table+" where id = "+id;
        int rs=stmt.executeUpdate(sql);
        if(rs>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/InsertCrewMessage")
    @ResponseBody
    String InsertCrewMessage(@RequestBody Crew crew) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String name=crew.getName();
        String password=crew.getPassword();
        int cata=crew.getCata();
        String number=crew.getNumber();
        String table = cata==0?"student":"teacher";
        String sql="insert into "+table+"(name,"+table+"number,password) values('"+name+"',"+number+","+password+")";
        int rs=stmt.executeUpdate(sql);
        if(rs>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/GetMessage")
    @ResponseBody
    String GetMessage(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select id,topic,cdate from message";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String topic=rs.getString("topic");
            map.put("topic",topic);
            String id=String.valueOf(rs.getInt("id"));
            map.put("id",id);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/GetMessageContentViaId")
    @ResponseBody
    String GetMessageContentViaId(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int id=Integer.parseInt(request.getParameter("id"));
        String sql="select topic,cdate,content from message where id = "+id;

        ResultSet rs= stmt.executeQuery(sql);
        JSONObject jsonObject = new JSONObject();
        if(rs.next()){
            String topic = rs.getString("topic");
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            String content=rs.getString("content");
            content=jsonObject.escape(content);

            return "{\"success\":true,\"content\":\""+content+"\",\"topic\":\""+topic+"\",\"date\":\""+cdate+"\"}";
        }else{
            return "{\"success\":false}";
        }
    }
    @RequestMapping("/InsertIntoMessage")
    @ResponseBody
    String InsertIntoMessage(@RequestBody Message message) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String topic= message.getTopic();
        JSONObject jsonObject = new JSONObject();
        String content=message.getContent();
        content=jsonObject.escape(content);

        String sql="insert into message (content,topic) values (\""+content+"\",\""+topic+"\")";

        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/MessageClickIncrease")
    @ResponseBody
    String MessageClickIncrease(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String id=request.getParameter("id");


        String sql="update message set click = click+1 where id = "+id;
        //System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/DeleteMessage")
    @ResponseBody
    String DeleteMessage(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String id=request.getParameter("id");
        String sql="delete from message where id = "+id;
        int rs=stmt.executeUpdate(sql);
        if(rs>0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/GetMessage_Login")
    @ResponseBody
    String GetMessage_Login(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select id,topic,cdate from message order by click limit 5";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String topic=rs.getString("topic");
            map.put("topic",topic);
            String id=String.valueOf(rs.getInt("id"));
            map.put("id",id);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

}
