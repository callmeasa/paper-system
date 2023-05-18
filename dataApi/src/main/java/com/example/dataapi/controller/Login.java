package com.example.dataapi.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.spy.memcached.MemcachedClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.dataapi.database.connect;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.*;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/Login")
public class Login {


    @RequestMapping("/findallUser")
    @ResponseBody
    String findallUser() throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select * from student";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String studentnumber=rs.getString("studentnumber");
            map.put("studentnumber",studentnumber);
            String name=rs.getString("name");
            map.put("name",name);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }
    @RequestMapping("/isLogin")
    @ResponseBody
        String isLogin(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String getstudentnumber=request.getParameter("account");
        String getpassword=request.getParameter("password");
        String sql="select studentnumber,password,name from student where studentnumber= "+getstudentnumber;

        ResultSet rs= stmt.executeQuery(sql);
        if(!(rs.next())){
            return "{ \"success\" : false , \"error\" : \"登录账号未找到！\" }";
        }else{
            String password=rs.getString("password");
            String name=rs.getString("name");
            if(password.equals(getpassword)){
                return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\"}";
            }else{
                return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
            }
        }

    }


    @RequestMapping("/isLogin_newVersion")
    @ResponseBody
    String isLogin_newVersion(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String getstudentnumber=request.getParameter("account");
        String getpassword=request.getParameter("password");
        String cata=Getcata(getstudentnumber);
        if(cata.equals("无")){
            return "{ \"success\" : false , \"error\" : \"登录账号未找到！\" }";
        }else{
            if(cata.equals("学生")){
                String sql="select studentnumber,password,name from student where studentnumber= "+getstudentnumber;

                ResultSet rs= stmt.executeQuery(sql);
                rs.next();
                String password=rs.getString("password");
                String name=rs.getString("name");
                if(password.equals(getpassword)){
                    return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                }else{
                    return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                }
            }else if(cata.equals("教师")){
                Statement stmt_teacher=connection.createStatement();
                String sql_teacher="select teachernumber,password,name from teacher where teachernumber = "+getstudentnumber;
                ResultSet rs= stmt_teacher.executeQuery(sql_teacher);
                rs.next();
                String password=rs.getString("password");
                String name=rs.getString("name");
                if(password.equals(getpassword)){
                    return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                }else{
                    return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                }
            }else if(cata.equals("admin管理人员")){
                Statement stmt_admin=connection.createStatement();
                String sql_admin="select adminnumber,password from admin where adminnumber = "+getstudentnumber;
                ResultSet rs= stmt_admin.executeQuery(sql_admin);
                rs.next();
                String password=rs.getString("password");
                if(password.equals(getpassword)){
                    return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"管理人员"+"\","+"\"cata\" : \""+cata+"\"}";
                }else{
                    return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                }
            }else{
                Statement stmt_ref=connection.createStatement();
                String sql_ref="select refnumber,password from ref where refnumber = "+getstudentnumber;
                ResultSet rs= stmt_ref.executeQuery(sql_ref);
                rs.next();
                String password=rs.getString("password");
                if(password.equals(getpassword)){
                    return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"答辩小组成员"+"\","+"\"cata\" : \""+cata+"\"}";
                }else{
                    return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                }
            }
        }


    }




    @RequestMapping("/isLogin_newVersion_Mem")
    @ResponseBody
    String isLogin_newVersion_Mem(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException, ExecutionException, InterruptedException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String getstudentnumber=request.getParameter("account");
        String getpassword=request.getParameter("password");
        String cata=Getcata(getstudentnumber);
        if(cata.equals("无")){
            return "{ \"success\" : false , \"error\" : \"登录账号未找到！\" }";
        }else{
            if(cata.equals("学生")){
                MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));

                if(mcc.get(getstudentnumber)!=null){
                    String password =  mcc.get(getstudentnumber).toString();
                    String sql="select name from student where studentnumber= "+getstudentnumber;
                    ResultSet rs= stmt.executeQuery(sql);
                    rs.next();
                    String name=rs.getString("name");
                    if(password.equals(getpassword)){
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }else{
                    String sql="select studentnumber,password,name from student where studentnumber= "+getstudentnumber;
                    ResultSet rs= stmt.executeQuery(sql);
                    rs.next();
                    String password=rs.getString("password");
                    String name=rs.getString("name");
                    if(password.equals(getpassword)){
                        Future fo=mcc.set(getstudentnumber,0,password);
                        fo.get();
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }
            }else if(cata.equals("教师")){
                MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));

                if(mcc.get(getstudentnumber)!=null){
                    String password=  mcc.get(getstudentnumber).toString();
                    String sql_teacher="select name from teacher where teachernumber = "+getstudentnumber;
                    Statement stmt_teacher=connection.createStatement();
                    ResultSet rs= stmt_teacher.executeQuery(sql_teacher);
                    rs.next();
                    String name=rs.getString("name");
                    if(password.equals(getpassword)){
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }else{
                    Statement stmt_teacher=connection.createStatement();
                    String sql_teacher="select teachernumber,password,name from teacher where teachernumber = "+getstudentnumber;
                    ResultSet rs= stmt_teacher.executeQuery(sql_teacher);
                    rs.next();
                    String password=rs.getString("password");
                    String name=rs.getString("name");
                    if(password.equals(getpassword)){
                        Future fo=mcc.set(getstudentnumber,0,password);
                        fo.get();
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+name+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }


            }else if(cata.equals("admin管理人员")){
                MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));
                System.out.println(mcc.get(getstudentnumber));
                if(mcc.get(getstudentnumber)!=null){
                    String password=  mcc.get(getstudentnumber).toString();
                    if(password.equals(getpassword)){
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"管理人员"+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }else{
                    Statement stmt_admin=connection.createStatement();
                    String sql_admin="select adminnumber,password from admin where adminnumber = "+getstudentnumber;
                    ResultSet rs= stmt_admin.executeQuery(sql_admin);
                    rs.next();
                    String password=rs.getString("password");
                    if(password.equals(getpassword)){
                        Future fo=mcc.set(getstudentnumber,0,password);
                        fo.get();
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"管理人员"+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }

            }else{
                MemcachedClient mcc = new MemcachedClient(new InetSocketAddress("127.0.0.1", 11211));
                if(mcc.get(getstudentnumber)!=null){
                    String password=  mcc.get(getstudentnumber).toString();
                    if(password.equals(getpassword)){
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"答辩小组成员"+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }else{
                    Statement stmt_ref=connection.createStatement();
                    String sql_ref="select refnumber,password from ref where refnumber = "+getstudentnumber;
                    ResultSet rs= stmt_ref.executeQuery(sql_ref);
                    rs.next();
                    String password=rs.getString("password");
                    if(password.equals(getpassword)){
                        Future fo=mcc.set(getstudentnumber,0,password);
                        fo.get();
                        mcc.shutdown();
                        return "{ \"success\" : true , \"error\" : \"there's no error\" ,\"name\" : \""+"答辩小组成员"+"\","+"\"cata\" : \""+cata+"\"}";
                    }else{
                        mcc.shutdown();
                        return "{ \"success\" : false , \"error\" : \"密码不正确，请输入正确密码\" }";
                    }
                }

            }
        }


    }

    //1：学生   2：教师  3：admin管理人员   4：ref答辩小组成员  5:无
    String Getcata(String number) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql_student = "select studentnumber from student where studentnumber = "+number;

        ResultSet rs= stmt.executeQuery(sql_student);
        if(rs.next()){
            return "学生";
        }else{
            String sql_teacher = "select teachernumber from teacher where teachernumber = "+number;
            Statement stmt_teacher=connection.createStatement();
            ResultSet rs_teacher = stmt_teacher.executeQuery(sql_teacher);
            if(rs_teacher.next()){
                return "教师";
            }else{
                String sql_admin = "select adminnumber from admin where adminnumber = "+number;
                Statement stmt_admin=connection.createStatement();
                ResultSet rs_admin = stmt_admin.executeQuery(sql_admin);
                if(rs_admin.next()){
                    return "admin管理人员";
                }else{
                    String sql_ref = "select refnumber from ref where refnumber = "+number;
                    Statement stmt_ref=connection.createStatement();
                    ResultSet rs_ref = stmt_ref.executeQuery(sql_ref);
                    if(rs_ref.next()){
                        return "ref答辩小组成员";
                    }else{
                        return "无"; //找不到账户
                    }
                }
            }
        }
    }
}
