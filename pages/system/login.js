import  Button  from "@mui/material/Button";
import Input from "@mui/material/Input";
import Head from "next/head";
import { DialogContentText, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "../../styles/kindsof.module.css"
import { CenterFocusStrong, Height, InsertChartOutlinedTwoTone } from "@mui/icons-material";
import Image from 'next/image';
import { blue } from "@mui/material/colors";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {data} from "./data";
import {Dialog,DialogContent,DialogActions} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';



function LoadingDialog({prop}){

    return <div>
        <Dialog
        open={prop.isloading}
        onClose={prop.closeLoadingDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogContent>
            <DialogContentText>
                {prop.errormessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={prop.closeLoadingDialog}>cancel</Button>
        </DialogActions>
        </Dialog>
    </div>
}
function Logininteraction({setpage}){
    const [account,setAccount]=useState('');

    const [password,setPassword]=useState('');

    const [logindata,setlogindata]=useState(null);

    const [isloading,setisloading]=useState(false);

    const handleAccountchange=event=>{
        setAccount(event.target.value);
    }

    const handlePasswordchange=event=>{
        setPassword(event.target.value);
    }

    const openLoadingDialog=()=>{
        setisloading(true);
    }

    const closeLoadingDialog=()=>{
        setisloading(false);
    }

    function Login(){
        //console.log(account);
        //console.log(userid);

            fetch('http://localhost:8080/Login/isLogin_newVersion_Mem?account='+account+'&password='+password).then(response=>response.json()).then((dataset)=>{
            setlogindata(data);
            if(dataset.success==true){
                data.id=account;
                
                data.category=dataset.cata;
                data.name=dataset.name;
                
                setpage(1);
            }else{
                data.errormessage=dataset.error;
                console.log(data.errormessage);
                openLoadingDialog();
            }
            
        });



    };

    const Forget=()=>{
        console.log("forget");
    };


    return <Box sx={{
        width:400,
        height:400,
        border:2,
        }}
        display='flex'
        flexDirection='column'
        alignItems="center"
        justifyContent="center"
        style={{
            marginRight:50,
            marginTop:60,
        }}
        >
        <Box 
        sx={{
            width:400,
            height:185,
            backgroundColor:'deepskyblue',
            margin:0,
        }}
        display='flex'
        alignItems="center"
        justifyContent="center"
        >
            <Image
        src="/favicon.ico"
        height={100}
        width={100}
        alt="name"></Image>
        </Box>
        <br/>
        <TextField  sx={{ width: 250 }} margin="none" size="small" label="Required" id="account"  helperText="Account" InputProps={{
            startAdornment:(
                <InputAdornment position="start">
                    <AccountCircle />
                </InputAdornment>
            )
        }}
        onChange={handleAccountchange}
        ></TextField>

        <TextField sx={{ width: 250}} margin="none" size="small" type="password" label="Password" id="password" helperText="Password" onChange={handlePasswordchange}></TextField>
        <Button style={{width:20,color:"white",backgroundColor:"deepskyblue"}} onClick={Login}>Login</Button>
        <Button style={{fontSize:4,width:200,color:"red"}} onClick={Forget}>Forget your password?</Button>

        <LoadingDialog prop={{
            isloading:isloading,
            closeLoadingDialog:closeLoadingDialog,
            errormessage:data.errormessage
        }}/>
        

        
    </Box>
}



//message
var Message_Id_Login;
function MessageList({rows,prop}){
    const handleClick=(row)=>{
        Message_Id_Login=row.id;
        prop.opendialog();
    };
    return <List sx={{
        width:'100%',
        bgcolor: 'background.paper',
    }}>
        {
            rows.map((row)=>(
                <ListItem
                secondaryAction={
                    <ListItemText>
                            {row.date}
                    </ListItemText>
                }
                >
                    <ListItemButton onClick={()=>{handleClick(row);}}>
                        <ListItemText>
                            {row.topic}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            ))
        }
    </List>
}

function Dialog_message({prop}){
    const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/AdminBlock/GetMessageContentViaId?id='+Message_Id_Login).then(response=>response.json()).then(dataset=>{
      setvalue(dataset);
    });
    }
  },[prop.isloading]);
  return <div>
      <Dialog
      fullScreen
      open={prop.isloading}
      onClose={prop.closeLoadingDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={prop.closeLoadingDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              公告详情
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent style={{backgroundColor:'ivory'}}>
        <Box
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
        >
      <Typography variant="h4" gutterBottom>
        {value==null?"Waiting~~~":value.topic}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {value==null?"Waiting~~~":value.date}
      </Typography>
      <Paper
      style={{
        minWidth:1800,
        minHeight:800,
      }}
      elevation={10}
      >
      <div dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.content}} style={{margin:50}}></div>
      </Paper>
      </Box>
      </DialogContent>
      </Dialog>
      </div>
}
function Newmessage(){
    const [message,setmessage]=useState(null);
    const [open,setopen]=useState(false);
    useEffect(()=>{
        fetch('http://localhost:8080/AdminBlock/GetMessage_Login').then(response=>response.json()).then(dataset=>{
            setmessage(dataset);
        })
    },[]);
    if(message==null){
        return <Box style={{
        backgroundColor:'white',
        width:660,
        height:400,
        padding:20,
    }}
    display='flex'
    justifyContent='flex-start'
    alignContent='flex-start'
    >
    </Box>
    }else{
        return <Box style={{
            backgroundColor:'white',
            width:660,
            height:400,
            padding:20,
        }}
        display='flex'
        justifyContent='flex-start'
        alignContent='flex-start'
        >
        <div style={{
            width:'100%'
        }}>
        <MessageList rows={message} prop={{
            open:open,
            opendialog:()=>{setopen(true);},
            closedialog:()=>{setopen(false);}
        }}/>
        </div>
        <Dialog_message prop={{
        isloading:open,
        closeLoadingDialog:()=>{setopen(false);}
        }}/>
        </Box>
    }
    
}

function Notice(){
    return <>
    <Box style={{
        width:700,
        height:500,
        marginRight:500,
        marginTop:60,
    }}
    display='flex'
    justifyContent='flex-start'
    alignContent='center'
    flexDirection='column'
    >
        <Box style={{
            height:100,
            backgroundColor:'deepskyblue',
        }}
        display='flex'
        justifyContent='center'
        alignContent='center'
        >
            <p style={{
                fontSize:40,
            }}>最新通告</p>
        </Box>
        <Newmessage/>
    </Box>
    </>
    
}

export default function Loginpage({setpage}){
    return <>
    <Head>
        <title>paper-system</title>
        <link ref='icon' href="/favicon.ico"/>
        {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
    </Head>
    <Box sx={{
        height:150,
        backgroundColor:'deepskyblue',
        boxShadow:1,
        margin:0,
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems="center"
    ><Image src="/favicon.ico"
    height={100}
    width={100} style={{
        marginLeft:20,  
    }}
    alt="cannot find"/>
        <p style={{
        fontSize:40,
        marginLeft:20,

    }}>Paper-System</p></Box>
    <Box sx={{width:1900,height:791}}
    display="flex"
    alignItems="flax-start"
    justifyContent="flex-end"
    style={{
        backgroundImage: 'url(/background-1.jpg)',
        backgroundSize:2200,
        margin:0,
    }}
    >
        <Notice/>

        <Logininteraction setpage={setpage}/>  

        

        
    </Box>
        
    
    </>
}
