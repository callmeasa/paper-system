package com.example.dataapi.database;

import java.sql.*;

public class connect {
    static final String JDBC_DRIVER="com.mysql.cj.jdbc.Driver";
    static final String DB_URL="jdbc:mysql://localhost:3306/test?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai";
    static final String USER = "root";
    static final String PASS = "lJl15975328@";

    public static Connection connection;

    public static void setConnection() throws ClassNotFoundException, SQLException {
        Class.forName(JDBC_DRIVER);
        connection=DriverManager.getConnection(DB_URL,USER,PASS);

    }
    public static void closeConnection() throws SQLException {
        connection.close();
    }
}
