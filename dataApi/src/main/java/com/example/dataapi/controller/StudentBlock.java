package com.example.dataapi.controller;

import com.example.dataapi.*;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.dataapi.database.connect;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.*;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

@CrossOrigin(origins = {"http://localhost:3000","null"})
@Controller
@RequestMapping("/StudentBlock")
public class StudentBlock {
    @RequestMapping("/FindAllNotChsoenPaper")
    @ResponseBody
    String FindAllPaper() throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select name,teacherid,paperid,papercontent from paper where ischosen = 0 and ispass = 1";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String papername=rs.getString("name");
            map.put("papername",papername);
            String teacherid=rs.getString("teacherid");
            map.put("teacherid",teacherid);
            String paperid=rs.getString("paperid");
            map.put("paperid",paperid);
            String papercontent=rs.getString("papercontent");
            map.put("papercontent",papercontent);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }
    @RequestMapping("/insertintostudentconfirmpapermessage")
    @ResponseBody
    String insertintostudentconfirmpapermessage(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {

            connect.setConnection();
            Connection connection=connect.connection;
            Statement stmt=connection.createStatement();
            Statement newstmt=connection.createStatement();
            Statement stmt1=connection.createStatement();
            String paperid=request.getParameter("paperid");
            String teacherid=request.getParameter("teacherid");
            String studentid=request.getParameter("studentid");

            String sql="insert into studentconfirmpapermessage(paperid,teacherid,studentid) values ("+paperid+","+teacherid+","+studentid+")";
            String findsql="select * from studentconfirmpapermessage where paperid="+paperid;
            ResultSet rs=newstmt.executeQuery(findsql);
            String findsql_stu="select * from paper where studentid = "+studentid;
            ResultSet rs_findstu=stmt1.executeQuery(findsql_stu);
            if(rs_findstu.next()){
                return "{\"success\":false,\"error\":\"你已选中主题\"}";
            }
            if (rs.next()){
                return "{\"success\":false,\"error\":\"you have confirmed once,please renovate\"}";
            }else{
                stmt.executeUpdate(sql);
                return "{\"success\":true,\"error\":\"there's no error\"}";
            }
    }


    @RequestMapping("/GetTaskplan")
    @ResponseBody
    String GetTaskplan(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");
        String sql="select name,teacherid,paperid,taskplan from paper where studentid = "+studentid;

        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String papername=rs.getString("name");
            String teacherid=rs.getString("teacherid");
            String paperid=rs.getString("paperid");
            String taskplan=rs.getString("taskplan");
            taskplan=jsonObject.escape(taskplan);
            //System.out.println("{\"success\":true , \"papername\":\""+papername+"\",\"teacherid\" :\""+teacherid+"\",\"paperid\" :\""+paperid+"\",\"taskplan\": \""+taskplan+"\"}");
            return "{\"success\":true , \"papername\":\""+papername+"\",\"teacherid\":\""+teacherid+"\",\"paperid\" :\""+paperid+"\",\"taskplan\": \""+taskplan+"\"}";
        }else{
            return "{\"success\":false , \"message\" : \"您还未选题成功，请等候教师通过申请\"}";
        }
    }

    @RequestMapping("/SetStartreport")
    @ResponseBody
    String SetStartreport(@RequestBody StartReport Report) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        String startreport=Report.getStartreport();
        //System.out.println(startreport);
        String studentid=Report.getStudentid();
        //System.out.println(studentid);

        String sql="update paper set startreport = '"+startreport+"' where studentid = "+studentid;
        String sql1="update paper set startreportstate = 0 where studentid = "+studentid;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        int result1=stmt1.executeUpdate(sql1);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/GetStartreport")
    @ResponseBody
    String GetStartreport(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");
        //System.out.println(startreport);
        //System.out.println(studentid);

        String sql="select startreport, startreportstate from paper where studentid = "+studentid;

        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String startreport = rs.getString("startreport");
            int startreportstate = rs.getInt("startreportstate");
            startreport=jsonObject.escape(startreport);
            return "{\"success\":true,\"startreport\":\""+startreport+"\" , \"startreportstate\":\""+startreportstate+"\"}";
        }else{
            return "{\"success\":false,\"startreport\":\"未提交开题报告\", \"startreportstate\":\""+5+"\"}";
        }

    }
    @RequestMapping("/Upload")
    @ResponseBody
    String Upload(@ModelAttribute FileForPS file) throws IOException {
        MultipartFile filevalue=file.getFile();
        String filename=filevalue.getOriginalFilename();
        String ext=FilenameUtils.getExtension(filename);
        String id=file.getId();
        String cata=file.getCata();//种类：翻译或者论文
        System.out.println(id);
        System.out.println(cata);
        Path path= Paths.get("D:/",cata,id+"."+ext);
        Files.createDirectories(path.getParent());
        if(!Files.exists(path)){
            Files.createFile(path);
        }
        InputStream inputStream=filevalue.getInputStream();
        Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);
        if(cata.equals("paper")){
            try{
                Setpaperstatetounknown(id);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }else if(cata.equals("translation")){
            try{
                Settranslationstatetounknown(id);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return "{\"success\":true}";

    }

    int Setpaperstatetounknown(String studentid) throws SQLException, ClassNotFoundException {
        String sql="update paper set paperstate = 0 where studentid = "+studentid;
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int result= stmt.executeUpdate(sql);
        return result;
    }

    int Settranslationstatetounknown(String studentid) throws SQLException, ClassNotFoundException {
        String sql="update paper set translationstate = 0 where studentid = "+studentid;
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int result= stmt.executeUpdate(sql);
        return result;
    }


    @GetMapping("/Download")
    @ResponseBody
    public ResponseEntity<Resource> Download(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String cata=request.getParameter("cata");
        String studentid=request.getParameter("studentid");
        File folder =new File("D:/"+cata+"/");
        File[] listofFiles = folder.listFiles();


        for(File file : listofFiles){
            if(file.isFile())
            {
                String[] filename = file.getName().split("\\.(?=[^\\.]+$)");
                if(filename[0].equalsIgnoreCase(studentid)){
                    HttpHeaders header = new HttpHeaders();
                    header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getName()+"\"");
                    response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
                    header.set("filename",file.getName());
                    response.setHeader("Access-Control-Expose-Headers", "filename");
                    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                    return ResponseEntity.ok()
                            .headers(header)
                            .contentLength(file.length())
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .body(resource);
                }
            }
        }

        return null;

    }
@RequestMapping("/GetPaperReason")
@ResponseBody
    String GetPaperReason(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
    connect.setConnection();
    Connection connection=connect.connection;
    Statement stmt=connection.createStatement();
    String studentid=request.getParameter("studentid");


    String sql="select papercomment, paperstate from paper where studentid = "+studentid;

    //System.out.println(sql);
    ResultSet rs= stmt.executeQuery(sql);

    JSONObject jsonObject = new JSONObject();

    if(rs.next()){
        String papercomment = rs.getString("papercomment");
        int paperstate = rs.getInt("paperstate");
        papercomment=jsonObject.escape(papercomment);
        return "{\"success\":true,\"papercomment\":\""+papercomment+"\" , \"paperstate\":\""+paperstate+"\"}";
    }else{
        return "{\"success\":false}";
    }
    }

    @RequestMapping("/Getweekreport")
    @ResponseBody
    String Getweekreport(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");
        String sql="select topic,teacherid,paperid,cdate,id,state from weekreport where studentid = "+studentid;

        String sql_exist="select studentid from paper where studentid = "+studentid;
        Statement stmt_exist = connection.createStatement();
        ResultSet rs_exist = stmt_exist.executeQuery(sql_exist);
        if(rs_exist.next()){
            ResultSet rs= stmt.executeQuery(sql);
            List<Map<String,String>> list=new ArrayList<Map<String,String>>();
            while(rs.next()){
                Map<String,String> map = new HashMap<String,String>();
                String topic=rs.getString("topic");
                map.put("topic",topic);
                String teacherid=rs.getString("teacherid");
                map.put("teacherid",teacherid);
                String paperid=rs.getString("paperid");
                map.put("paperid",paperid);
                String papername=TeacherBlock.GetPapernameViaId(paperid);
                map.put("papername",papername);
                String id=String.valueOf(rs.getInt("id"));
                map.put("id",id);
                String state=String.valueOf(rs.getInt("state"));
                map.put("state",state);
                String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
                map.put("date",cdate);
                list.add(map);
            }
            Gson gson = new Gson();
            String finalResult= gson.toJson(list);
            return "{\"success\":true,\"weekreport\":"+finalResult+"}";

        }else{
            List<Map<String,String>> list=new ArrayList<Map<String,String>>();
            Gson gson = new Gson();
            String finalResult= gson.toJson(list);
            return "{\"success\":false,\"weekreport\":"+finalResult+"}";
        }
    }

    @RequestMapping("/Getweekreport_teacher")
    @ResponseBody
    String Getweekreport_teacher(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String teacherid=request.getParameter("teacherid");
        String sql="select topic,studentid,paperid,cdate,id,state from weekreport where teacherid = "+teacherid+" and state = 0";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String topic=rs.getString("topic");
            map.put("topic",topic);
            String studentid=rs.getString("studentid");
            map.put("studentid",studentid);
            String paperid=rs.getString("paperid");
            map.put("paperid",paperid);
            String papername=TeacherBlock.GetPapernameViaId(paperid);
            map.put("papername",papername);

            String id=String.valueOf(rs.getInt("id"));
            map.put("id",id);
            String studentname=TeacherBlock.GetStudentnameViaId(studentid);
            map.put("studentname",studentname);
            String state=String.valueOf(rs.getInt("state"));
            map.put("state",state);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }


    @RequestMapping("/GetWeekReportContent")
    @ResponseBody
    String GetWeekReportContent(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int id=Integer.parseInt(request.getParameter("id"));



        String sql="select content,comment from weekreport where id = "+id;

        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String content = rs.getString("content");
            content=jsonObject.escape(content);
            String comment = rs.getString("comment");
            comment=jsonObject.escape(comment);
            return "{\"success\":true,\"content\":\""+content+"\",\"comment\":\""+comment+"\"}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/InsertIntoWeekReport")
    @ResponseBody
    String InsertIntoWeekReport(@RequestBody WeekReport weekReport) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String topic= weekReport.getTopic();

        String paperid=weekReport.getPaperid();

        String studentid=weekReport.getStudentid();

        String teacherid=weekReport.getTeacherid();

        String content=weekReport.getContent();

        String sql="insert into weekreport (content,topic,studentid,paperid,teacherid) values (\""+content+"\",\""+topic+"\",\""+studentid+"\",\""+paperid+"\",\""+teacherid+"\")";

        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/SetWeekreportstateto0")
    @ResponseBody
    String SetWeekreportstateto0(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String id=request.getParameter("id");


        String sql="update weekreport set state = 0 where id = "+id;
        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/GetTeacherComment")
    @ResponseBody
    String GetTeacherComment(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String studentid=request.getParameter("studentid");

        String sql="select teachercomment from paper where studentid = "+studentid;

        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String teachercomment = rs.getString("teachercomment");
            return "{\"success\":true,\"teachercomment\":\""+teachercomment+"\"}";
        }else{
            return "{\"success\":false,\"teachercomment\":\"未提交教师评价\"}";
        }

    }

    @RequestMapping("/SetTeacherComment")
    @ResponseBody
    String SetTeacherComment(@RequestBody TeacherComment teacherComment) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        Statement stmt1=connection.createStatement();
        String teachercomment=teacherComment.getTeachercomment();
        //System.out.println(startreport);
        String studentid=teacherComment.getStudentid();
        //System.out.println(studentid);

        String sql="update paper set teachercomment = '"+teachercomment+"' where studentid = "+studentid;
//        String sql1="update paper set startreportstate = 0 where studentid = "+studentid;
        int result=stmt.executeUpdate(sql);
//        int result1=stmt1.executeUpdate(sql1);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }
//Post
    @RequestMapping("/GetPost")
    @ResponseBody
    String GetPost(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String sql="select teacherid,content,cdate,id,topic,click from post";

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String topic=rs.getString("topic");
            map.put("topic",topic);
            String teacherid=rs.getString("teacherid");
            map.put("teacherid",teacherid);
            String content=rs.getString("content");
            map.put("content",content);
            String id=String.valueOf(rs.getInt("id"));
            map.put("id",id);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            String teachername=TeacherBlock.GetTeachernameViaId(teacherid);
            map.put("teachername",teachername);
            String click=String.valueOf(rs.getInt("click"));
            map.put("click",click);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/InsertIntopost")
    @ResponseBody
    String InsertIntopost(@RequestBody Post post) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String topic= post.getTopic();

        String teacherid=post.getTeacherid();

        String content=post.getContent();

        String sql="insert into post (topic,content,teacherid) values (\""+topic+"\",\""+content+"\",\""+teacherid+"\")";

        System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

    @RequestMapping("/PostClickIncrease")
    @ResponseBody
    String PostClickIncrease(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        String id=request.getParameter("id");


        String sql="update post set click = click+1 where id = "+id;
        //System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }
    @RequestMapping("/GetPostViaId")
    @ResponseBody
    String GetPostViaId(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException{
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int id=Integer.parseInt(request.getParameter("id"));

        String sql="select topic,content,cdate from post where id = "+id;

        //System.out.println(sql);
        ResultSet rs= stmt.executeQuery(sql);

        JSONObject jsonObject = new JSONObject();

        if(rs.next()){
            String content = rs.getString("content");
            content=jsonObject.escape(content);
            String topic = rs.getString("topic");
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            return "{\"success\":true,\"content\":\""+content+"\",\"topic\":\""+topic+"\","+"\"date\":\""+cdate+"\"}";
        }else{
            return "{\"success\":false}";
        }
    }

    @RequestMapping("/GetComment")
    @ResponseBody
    String GetComment(HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();
        int postid=Integer.parseInt(request.getParameter("postid"));
        String sql="select id,teacherid,postid,content,cdate from comment where postid = "+postid;

        ResultSet rs= stmt.executeQuery(sql);
        List<Map<String,String>> list=new ArrayList<Map<String,String>>();
        while(rs.next()){
            Map<String,String> map = new HashMap<String,String>();
            String teacherid=rs.getString("teacherid");
            map.put("teacherid",teacherid);
            String content=rs.getString("content");
            map.put("content",content);
            String id=String.valueOf(rs.getInt("id"));
            map.put("id",id);
            String cdate= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rs.getTimestamp("cdate"));
            map.put("date",cdate);
            String teachername=TeacherBlock.GetTeachernameViaId(teacherid);
            map.put("teachername",teachername);
            list.add(map);
        }
        Gson gson = new Gson();
        String finalResult= gson.toJson(list);
        return finalResult;
    }

    @RequestMapping("/InsertIntocomment")
    @ResponseBody
    String InsertIntocomment(@RequestBody Comment comment) throws SQLException, ClassNotFoundException {
        connect.setConnection();
        Connection connection=connect.connection;
        Statement stmt=connection.createStatement();

        String teacherid= comment.getTeacherid();

        String content=comment.getContent();

        int postid=comment.getPostid();

        String sql="insert into comment (teacherid,postid,content) values (\""+teacherid+"\",\""+postid+"\",\""+content+"\")";

        //System.out.println(sql);
        int result=stmt.executeUpdate(sql);
        if(result>=0){
            return "{\"success\":true}";
        }else{
            return "{\"success\":false}";
        }

    }

}
