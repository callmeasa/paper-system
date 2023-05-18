import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Box } from '@mui/system';
import Image from 'next/image';
import { Button, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, responsiveFontSizes, TableHead, Tooltip } from '@mui/material';
import React, { use, useEffect, useState } from 'react';
import { ElevatorSharp, ExpandLess, ExpandMore, FileDownload } from '@mui/icons-material';
import {data} from "./data";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Dialog,DialogContent,DialogActions, DialogContentText, TextField, DialogTitle} from '@mui/material';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { deepOrange, grey } from '@mui/material/colors';
import Input from '@mui/material';
import fileDownload from 'js-file-download';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { resolve } from 'styled-jsx/css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

function Dialog_Upheadblue({rows,prop}){

const handClose=()=>{
  fetch('http://localhost:8080/NormalBlock/DeleteCue_Viaid?id='+data.id).then(response=>response.json()).then(dataset=>{
  });
  prop.closeLoadingDialog();
};

 return <Dialog
      fullScreen
      open={prop.isloading}
      onClose={handClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              通知详情
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent style={{backgroundColor:'white'}}>
        <List sx={{
        width:'100%',
        bgcolor: 'ivory',
    }}>
        {
        rows.cue.map((row)=>(
          <ListItem>
            <ListItemText>
            来自{row.fromwhom}
            </ListItemText>
            <ListItemText>
            {row.content}
            </ListItemText>
          </ListItem>
        ))
        }
        </List>
      </DialogContent>
      </Dialog>
}

function Upheadblue({setpage}){

  const [isbusy,setisbusy]=useState(false);
  const [value,setvalue]=useState();
  const [isopen,setisopen]=useState(false);

  useEffect(()=>{
    fetch('http://localhost:8080/NormalBlock/GetCue_Viaid?id='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        setisbusy(true);
        setvalue(dataset);
      }else{
        setisbusy(false);
        setvalue(dataset);
      }
    }
      )
  },[isopen]);


  return <Box sx={{
    height:100,
    backgroundColor:'deepskyblue',
    boxShadow:1,
    margin:0,
    width:'100%'
}}
display='flex'
justifyContent='flex-end'
alignItems="center"
>
  <Image src="/favicon.ico"
height={100}
width={100} style={{
    marginLeft:20,  
}}
alt="cannot find"/>
    <p style={{
    fontSize:30,
    marginLeft:20,
}}>毕业设计系统</p>
<p
style={{
  marginTop:30,
  marginLeft:30,
  marginRight:1100, 
}}
>欢迎回来: {data.category} {data.name}</p>

<Tooltip title={
  <React.Fragment>
  <Typography color="inherit">id：{data.id}</Typography>
  <Typography color="inherit">姓名：{data.name}</Typography>
  <Typography color="inherit">身份：{data.category}</Typography>
</React.Fragment>
} >
<Image src='/user.svg'
width={40}
height={40}
style={{
  marginRight:10
}}
alt="cannot find" 
></Image>
</Tooltip>

<Button onClick={()=>{setisopen(true);}} style={{
  margin:30,
  justifySelf:'flex-end'
}}>
<Image src={isbusy==false?'/bell.svg':'/redbell.svg'} width={40} height={40} alt='cannot find'></Image>
</Button>


<Button onClick={()=>{setpage(0);}} sx={{
  justifySelf:'flex-end'
}}>
<Image src='/log-out.svg'
width={40}
height={40}
alt="cannot find" 
></Image>
</Button>

{isopen==true ? <Dialog_Upheadblue rows={value} prop={{
  isloading:isopen,
  closeLoadingDialog:()=>{setisopen(false)},
}}/> :<></>}


</Box>
}

function StudentList({setblock}){
  return  <List component='div' disablePadding sx={{bgcolor:'whitesmoke'}}>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(1)}>
      <ListItemText>学生选题</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(2)}>
    <ListItemText>查看任务书</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(3)}>
    <ListItemText>开题报告</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(4)}>
    <ListItemText>外文翻译</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(5)}>
    <ListItemText>周情况</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(6)}>
    <ListItemText>论文</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(7)}>
    <ListItemText>教师评价</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(8)}>
    <ListItemText>答辩信息</ListItemText>
    </ListItemButton>
  </List>
}
function MailList({setblock}){
 return  <List component='div' disablePadding sx={{bgcolor:'whitesmoke'}}>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(21)}>
      <ListItemText>写邮件</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(22)}>
    <ListItemText>收邮件</ListItemText>
    </ListItemButton>
  </List>
}
function RefList({setblock}){
  return  <List component='div' disablePadding sx={{bgcolor:'whitesmoke'}}>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(19)}>
      <ListItemText>教师开题审核</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(20)}>
    <ListItemText>学生分数评定</ListItemText>
    </ListItemButton>
  </List>
}
function TeacherList({setblock}){
  return  <List component='div' disablePadding sx={{bgcolor:'whitesmoke'}}>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(9)}>
      <ListItemText>我的主题</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(10)}>
    <ListItemText>选题管理</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(11)}>
    <ListItemText>教师交流</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(12)}>
    <ListItemText>任务书提交</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(13)}>
    <ListItemText>开题报告审核</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(14)}>
    <ListItemText>周报审核</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(15)}>
    <ListItemText>外文翻译审核</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(16)}>
    <ListItemText>论文批阅</ListItemText>
    </ListItemButton>
  </List>
}
function AdminList({setblock}){
  return  <List component='div' disablePadding sx={{bgcolor:'whitesmoke'}}>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(17)}>
      <ListItemText>人员管理</ListItemText>
    </ListItemButton>
    <ListItemButton sx={{ pl: 4 }} onClick={()=>setblock(18)}>
    <ListItemText>信息通知管理</ListItemText>
    </ListItemButton>
  </List>
}
function Studentsection({setblock}){
  const [open,setopen]=React.useState(false);
  const [tipopen,settipopen]=useState(false);
  const handleclick=()=>{
    if(data.category=="学生"){
      setopen(!open);
    }else{
      settipopen(true);
    }
  };

  const handleClose=()=>{
    settipopen(false);
  }

  return <List sx={{
    width:'100%',bgcolor:'deepskyblue'
  }}
  component='nav'
  >
    <ListItemButton onClick={handleclick}>
        <ListItemText primary='学生模块'></ListItemText>
        {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <StudentList setblock={setblock}/>
    </Collapse>
    <Snackbar open={tipopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
        您无权限访问该板块
        </Alert>
    </Snackbar>
  </List>

}
function Teachersection({setblock}){
  const [open,setopen]=React.useState(false);
  const [tipopen,settipopen]=useState(false);

  const handleclick=()=>{
    if(data.category=="教师"){
      setopen(!open);
    }else{
      settipopen(true);
    }
    
  };

  const handleClose=()=>{
    settipopen(false);
  }
  
  return <List sx={{
    width:'100%',bgcolor:'deepskyblue'
  }}
  component='nav'
  >
    <ListItemButton onClick={handleclick}>
        <ListItemText primary='教师模块'></ListItemText>
        {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <TeacherList setblock={setblock}/>
    </Collapse>
    <Snackbar open={tipopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          您无权限访问该板块
        </Alert>
    </Snackbar>
  </List>

}
function Mailsection({setblock}){
  const [open,setopen]=React.useState(false);
  const handleclick=()=>{
      setopen(!open);
  };
  return <List sx={{
    width:'100%',bgcolor:'deepskyblue'
  }}
  component='nav'
  >
    <ListItemButton onClick={handleclick}>
        <ListItemText primary='邮件模块'></ListItemText>
        {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <MailList setblock={setblock}/>
    </Collapse>
  </List>
}
function Adminsection({setblock}){
  const [open,setopen]=React.useState(false);
  const [tipopen,settipopen]=useState(false);
  const handleclick=()=>{
    if(data.category=="admin管理人员"){
        setopen(!open);
    }else{
      settipopen(true);
    }
  };
  const handleClose=()=>{
    settipopen(false);
  }
  return <List sx={{
    width:'100%',bgcolor:'deepskyblue'
  }}
  component='nav'
  >
    <ListItemButton onClick={handleclick}>
        <ListItemText primary='管理员模块'></ListItemText>
        {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <AdminList setblock={setblock}/>
    </Collapse>
    <Snackbar open={tipopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          您无权限访问该板块
        </Alert>
    </Snackbar>
  </List>
}
function Refsection({setblock}){
  const [open,setopen]=React.useState(false);
  const [tipopen,settipopen]=useState(false);
  const handleclick=()=>{
    if(data.category=="ref答辩小组成员"){
        setopen(!open);
    }else{
        settipopen(true);
    }
  };
  const handleClose=()=>{
    settipopen(false);
  }
  return <List sx={{
    width:'100%',bgcolor:'deepskyblue'
  }}
  component='nav'
  >
    <ListItemButton onClick={handleclick}>
        <ListItemText primary='审核人员模块'></ListItemText>
        {open ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <RefList setblock={setblock}/>
    </Collapse>
    <Snackbar open={tipopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          您无权限访问该板块
        </Alert>
    </Snackbar>
  </List>
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function PaperconfirmedDialog({prop}){
  return <div>
      <Dialog
      open={prop.isloading}
      onClose={prop.closeLoadingDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogContent>
          <DialogContentText>
          该主题已被申请
          </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={prop.closeLoadingDialog}>cancel</Button>
      </DialogActions>
      </Dialog>
  </div>
}

function PaperForStudentTable({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  function handleConfirmButton(row){
      fetch('http://localhost:8080/StudentBlock/insertintostudentconfirmpapermessage?paperid='+row.paperid+'&teacherid='+row.teacherid+'&studentid='+data.id).then(response=>response.json()).then(dataset=>{
        if(dataset.success==false){
            alert(dataset.error);
        }else{
            var body={"towhom":row.teacherid,"fromwhom":data.id,"content":"收到一条选题提醒，请及时处理"};
            fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            })
            alert("申请成功");
            prop.renovate();
        }
      })
  }

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <Tooltip title={row.papercontent}>
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.teacherid}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleConfirmButton(row); }}>申请</Button>
                </TableCell>
              </TableRow>
              </Tooltip>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );


}
//---------------------------------------------------------------学生板块--------------------------------------------------------------------------

//TopicPicking
function TopicPicking(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [isloading,setisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);

  var cmessage;
  
  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/FindAllNotChsoenPaper').then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/StudentBlock/FindAllNotChsoenPaper').then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    >
      <p>Tips:选择您的毕业设计题目</p>
      <br/>
    </Box>
  }else{
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:选择您的毕业设计题目</p>
    <div style={{
          width:'90%',
          marginTop:20,
      }}>
    <PaperForStudentTable rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <PaperconfirmedDialog prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
  </Box>
  }
  
}


//TaskandPlan
function TaskandPlan(){
  const [paper,setpaper]=useState();
  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/GetTaskplan?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      setpaper(dataset);
    });
  },[]);


  if(paper==null){
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='center'
  alignItems='flex-start'
  >
    <p>Tips:请仔细查看您的任务书</p>
  </Box>
  }else if(paper.success==true){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >

        <p>Tips:请仔细查看您的任务书</p>
        <p>课题名称:{paper.papername}</p>
        <p>教师 id:{paper.teacherid}</p>

        <Paper
      style={{
        width:'95%',
        minHeight:800,
        backgroundColor:'ivory'
      }}
      elevation={10}
      >
      <div dangerouslySetInnerHTML={{__html: paper.taskplan=="null"?"您的指导教师暂未提交任务书":paper.taskplan}} style={{
        padding:30
      }}></div>
      </Paper>
    </Box>
  }else if(paper.success==false){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    >
      <p style={{
        fontSize:30,
        marginTop:350
      }}>{paper.message}</p>
    </Box>
  }
  
}
//开题报告
function StartReport(){
  const [value,setvalue]=useState();
  const [startreportstate,setstartreportstate]=useState(5);

  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/GetStartreport?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      setvalue(dataset.startreport);
      setstartreportstate(dataset.startreportstate);
    });
  },[]);
  
  var body = {'startreport':value,'studentid':data.id};

  function handlesubmit(){
    fetch('http://localhost:8080/StudentBlock/SetStartreport',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        fetch('http://localhost:8080/NormalBlock/GetTeacheridViaStudentid?id='+data.id).then(response=>response.json()).then(dataset=>{
          if(dataset.success==true){
            var cuemessage={"towhom":dataset.teacherid,"fromwhom":data.id,"content":"学生已上传开题报告，请及时处理"};
            fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(cuemessage)
            })
          }
        })
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    })
  }

  if(value==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:查看或编辑开题报告，若要修改开题报告，则点击提交按钮</p>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value} style={{
        width:'90%',
        marginTop:50,
        alignSelf:'center',
        minHeight:400
      }}/>
    </Box>
  }else if(startreportstate!=5){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:查看或编辑开题报告，若要修改开题报告，则点击提交按钮</p>
      <p>当前状态:{startreportstate==-1?"未提交":startreportstate==0?"未审核":startreportstate==1?"已通过":"未通过"}</p>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value==null?"未上传开题报告":value} style={{
        width:'90%',
        marginTop:50,
        alignSelf:'center',
        minHeight:400
      }}/>
      <Button variant='contained' style={{
        marginTop:60
      }} onClick={handlesubmit}>提交</Button>
    </Box>
}else if(startreportstate==5){
  return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='center'
  alignItems='center'
  >
    <p style={{
      fontSize:30,
      marginTop:350
    }}>您还未选题成功，请等候教师通过申请</p>
  </Box>
}
}

//Paper
function ReasonforPaper(){
  const [value,setvalue]=useState();
  useEffect(()=>{fetch('http://localhost:8080/StudentBlock/GetPaperReason?studentid='+data.id).then(response=>response.json()).then(dataset=>{
    if(dataset.success){
      setvalue(dataset.papercomment);
    }else{
      setvalue("未知错误");
    }
  });
},[]);

  return <> 
  <div dangerouslySetInnerHTML={{__html: value}} ></div>
  </>
 
    
}

function PaperUpload(){
  const [filevalue,setfilevalue]=useState();
  const [paperstate,setpaperstate]=useState(-1);
  const [success,setsuccess]=useState(true);

  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetPaperstate?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        setpaperstate(dataset.paperstate);
      }else{
        setsuccess(dataset.success);
      }
    });
  },[]);
  

  function upload(){
    var formData = new FormData();
    formData.append("file",filevalue);
    formData.append("id",data.id);
    formData.append("cata","paper");
    //console.log(formData.id);
      fetch('http://localhost:8080/StudentBlock/Upload',{
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json'
      // },
      body:formData
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        fetch('http://localhost:8080/NormalBlock/GetTeacheridViaStudentid?id='+data.id).then(response=>response.json()).then(dataset=>{
          var cuemessage={"towhom":dataset.teacherid,"fromwhom":data.id,"content":"学生已经上传论文，请及时下载！"};
          fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(cuemessage)
            })
        })
        alert("上传成功");
      }
    })
    
  }
  if(success==true){
       return <>
  <Box sx={{
    width:'100%',
    height:'100%'
  }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
  >
    <p>Tips:点击上传按钮上传文件</p>
    <p>当前状态：{paperstate==-1?"未提交":paperstate==0?"教师未审核":paperstate==1?"已通过":"未通过"}</p>
    {paperstate==1||paperstate==2 ? <p>教师评价：<ReasonforPaper/> </p>  : <></>}
    
    <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    >
          <input type="file" onChange={event=>setfilevalue(event.target.files[0])} style={{
            marginLeft:550,
            marginTop:30,
          }}></input>
          <Button style={{
            marginTop:30,
            padding:0,
            height:30,
            backgroundColor:'deepskyblue',
            color:'white'
          }} onClick={upload}>确认上传</Button>
    </Box>
  </Box>
  </>
  }else{
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    >
      <p style={{
        fontSize:30,
        marginTop:350
      }}>您还未选题成功，请等候教师通过申请</p>
    </Box>
  }
 
  }

//WeekReport 学生周报

var weekreport_id;
var Dialogstate;//判断学生通过查看还是修改按钮进入DialogForCreate

function TableForweekreport({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleCheckButton(row){
    // fetch('http://localhost:8080/StudentBlock/GetWeekReportContent?id='+row.id).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==false){
    //       prop.opendialog();
    //   }else{
    //       alert("Apply Success!");
    //       prop.renovate();
    //   }
    // })
    Dialogstate=0;
    weekreport_id=row.id;
    prop.opendialog();
}

function handleModifyButton(row){
  fetch('http://localhost:8080/TeacherBlock/GetPaperidAndTeacheridViaStudentid?studentid='+data.id).then(response=>response.json()).then(dataset=>{
        weekreport_paperid=dataset.paperid;
        weekreport_teacherid=dataset.teacherid;
        weekreport_id=row.id;
        Dialogstate=1;
        prop.openCreatedialog();
    })
}

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    论文id{" "+row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.topic}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.date}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.state==0?"未审核":row.state==1?"已通过":"未通过"}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleCheckButton(row); }}>查看</Button>
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );

}

function DialogForCreate({prop}){
  const [topic,settopic] = useState("Unknown");
  const [content,setcontent] = useState();


  const handletopic=event=>{
    settopic(event.target.value);
  }


  var body={'topic':topic,'content':content,'studentid':data.id,'paperid':weekreport_paperid,'teacherid':weekreport_teacherid} ;

  function handleSave(){
    if(Dialogstate==2){
    fetch('http://localhost:8080/StudentBlock/InsertIntoWeekReport',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        fetch('http://localhost:8080/NormalBlock/GetTeacheridViaStudentid?id='+data.id).then(response=>response.json()).then(dataset=>{
          var cuemessage={"towhom":dataset.teacherid,"fromwhom":data.id,"content":"收到来自学生的周报，请及时审核！"};
          fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(cuemessage)
            })
        })
        prop.closeLoadingDialog();
        prop.renovate();
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    });
  }else if(Dialogstate==1){
      fetch('http://localhost:8080/StudentBlock/SetWeekreportstateto0?id='+weekreport_id).then(response=>response.json()).then(dataset=>{
        if(dataset.success){
          prop.closeLoadingDialog();
          prop.renovate();
          alert("修改成功");
        }else{
          alert("未知错误");
        }
      });
  }
    

  }
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
          请编辑您的周报
        </Typography>
        <Button autoFocus color="inherit" onClick={handleSave}>
          save
        </Button>
      </Toolbar>
    </AppBar>

    <TextField
          id="outlined-textarea"
          label="周报标题"
          multiline
          onChange={handletopic}
          sx={{
            marginTop:3,
            marginLeft:3,
            marginRight:3
          }}
        />

  <DialogContent>
  <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setcontent} value={content}/>
  </DialogContent>
  </Dialog>
</div>
  
}

function DialogForCheck({prop}){
  const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/StudentBlock/GetWeekReportContent?id='+weekreport_id).then(response=>response.json()).then(dataset=>{
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
              查看您的周报
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <p>周报详情:</p>
      <div dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.content}} ></div>
      <div>
      <p>教师评语：</p>
      <div dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.comment}}></div>
      </div>
      </DialogContent>
      </Dialog>
  </div>
}


var weekreport_paperid;
var weekreport_teacherid;

function WeekReport(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);
  
  const [createisloading,setcreateisloading]=useState(false);

  const [success,setsuccess]=useState(true);

  const closeLoadingDialog=()=>setisloading(false);
  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/Getweekreport?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      if(dataset.success){
        setpaperdata(dataset.weekreport);
      }else{
        setpaperdata(dataset.weekreport);
        setsuccess(false);
      }
      
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/StudentBlock/Getweekreport?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset.weekreport);
    });
  }


  function createWeekReport(){
    fetch('http://localhost:8080/TeacherBlock/GetPaperidAndTeacheridViaStudentid?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        weekreport_paperid=dataset.paperid;
        weekreport_teacherid=dataset.teacherid;
        Dialogstate=2;
        setcreateisloading(true);
      }else{
        alert("您还未选中题目");
      }
    })
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    >

      <p>Tips:添加您的周报(点击‘+’创建周报)</p>
      <IconButton
      edge="start"
      color='primary'
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <br/>
    </Box>
  }else if(success==true){
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:添加您的周报(点击‘+’创建周报)</p>
    <IconButton
      edge="start"
      color="primary"
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <div style={{
          width:'90%',
          marginTop:20,
      }}>
    <TableForweekreport rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      openCreatedialog:()=>{setcreateisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <DialogForCheck prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
    <DialogForCreate prop={{
      opendialog:()=>{setcreateisloading},
      renovate:renovate,
      isloading:createisloading,
      closeLoadingDialog:()=>{setcreateisloading(false)}
    }}/>
  </Box>
  }else if(success==false){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    >
      <p style={{
        fontSize:30,
        marginTop:350
      }}>您还未选题成功，请等候教师通过申请</p>
    </Box>
  }

}

//教师评价
function CommentToTeacher(){
  const [value,setvalue]=useState();
  const [success,setsuccess]=useState(true);

  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/GetTeacherComment?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        setvalue(dataset.teachercomment);
      }else{
        setsuccess(false);
        setvalue(dataset.teachercomment);
      }

    });
  },[]);
  
  var body = {'teachercomment':value,'studentid':data.id};

  function handlesubmit(){
    fetch('http://localhost:8080/StudentBlock/SetTeacherComment',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    })
  }

  if(value==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:查看或编辑教师评价，若要修改，则点击修改后提交按钮</p>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value=="null"?"未提交教师评价":value} style={{
        width:'90%',
        marginTop:50,
        alignSelf:'center',
        minHeight:400
      }}/>
    </Box>
  }else if(success==true){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:查看或编辑教师评价，若要修改，则点击修改后提交按钮</p>
      {/* <p>当前状态:{startreportstate==0?"未审核":startreportstate==1?"已通过":"未通过"}</p> */}
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value=="null"?"未提交教师评价":value} style={{
        width:'90%',
        marginTop:50,
        alignSelf:'center',
        minHeight:400
      }}/>
      <Button style={{
        backgroundColor:'deepskyblue',
        color:'white',
        marginTop:30
      }} onClick={handlesubmit}>提交</Button>
    </Box>
}else{
  return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='center'
  alignItems='center'
  >
    <p style={{
      fontSize:30,
      marginTop:350
    }}>您还未选题成功，请等候教师通过申请</p>
  </Box>
}
}

//ReportMessage展示审核小组对学生毕业设计的分数及评价
function ReportMessage(){
  const [value,setvalue]=useState(null);
  const [message,setmessage]=useState('');

  useEffect(()=>{
    fetch('http://localhost:8080/RefBlock/GetPapergradeViaStudentid?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        setvalue(dataset);
      }else{
        setvalue(dataset);
        setmessage("您还未选题");
      }
    })
  },[])
if(value==null){
  return <Box
  display='flex'
  flexDirection='column'
  justifyContent='flex-start'
  alignItems='center'
  sx={{
    width:'100%'
  }}
  >
    <p>Tips:查看答辩成绩</p>
  </Box>
}else{
  if(value.success==true){
    return <Box
  display='flex'
  flexDirection='column'
  justifyContent='flex-start'
  alignItems='center'
  sx={{
    width:'100%'
  }}
  >
    <p>Tips:查看答辩成绩</p>
  {value.papergradeset.map((card)=>(
    <Card sx={{ minWidth: 1500,alignSelf:'flex-start',marginLeft:10,marginTop:5,backgroundColor:'ivory',minHeight:200 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        答辩信息
      </Typography>
      <Typography variant="h5" component="div">
        成绩：{card.grade}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        评价
      </Typography>
      <Typography variant="body2">
        {card.gradecomment}
      </Typography>
    </CardContent>
  </Card>
  ))}
  </Box>
  }else{
    return <Box
    display='flex'
    flexDirection='column'
    justifyContent='flex-start'
    alignItems='center'
    sx={{
      width:'100%'
    }}
    >
      <p>Tips:查看答辩成绩</p>
      <Typography variant="h1" style={{marginTop:250}}>{message}</Typography>
    </Box>
  }
    
  }
}
  



//---------------------------------------------------------------教师板块--------------------------------------------------------------------------

//MyTopic 我的选题管理
function MyTopic(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [createisloading,setcreateisloading]=useState(false);

  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetPaperViaTeacherid?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/GetPaperViaTeacherid?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }


  function createWeekReport(){
    setcreateisloading(true);
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    >

      <p>Tips:创建您的您的主题(点击‘+’创建主题)</p>
      <IconButton
      edge="start"
      color='primary'
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <br/>
    </Box>
  }else{
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:创建您的您的主题(点击‘+’创建主题)</p>
    <IconButton
      edge="start"
      color="primary"
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <div style={{
          width:'90%',
          marginTop:20,
      }}>
    <TableForMyTopic rows={paperdata} prop={{
      openCreatedialog:()=>{setcreateisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <DialogForCreate_Mytopic prop={{
      opendialog:()=>{setcreateisloading},
      renovate:renovate,
      isloading:createisloading,
      closeLoadingDialog:()=>{setcreateisloading(false)}
    }}/>
  </Box>
  }
}
function TableForMyTopic({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <Tooltip title={row.papercontent}>
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.ispass==0?"未审核":row.ispass==1?"已通过":"未通过"}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.ischosen==0?"未处理":row.ischosen==1?'已选中学生  '+row.studentname : "未选中"}
                </TableCell>
              </TableRow>
              </Tooltip>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );
}
function DialogForCreate_Mytopic({prop}){
  const [topic,settopic]=useState('');
  const [content,setcontent]=useState('');

  const handleTopic=(event)=>{
    settopic(event.target.value);
  }

  const handleContent=(event)=>{
    setcontent(event.target.value);
  }
  var body={'name':topic,'papercontent':content,'teacherid':data.id};
  function handleSave(){
      fetch('http://localhost:8080/TeacherBlock/insertintoPaper',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
  
        body: JSON.stringify(body)
      }).then(response=>response.json()).then(dataset=>{
        if(dataset.success){
          alert("添加成功");
          prop.renovate();
          prop.closeLoadingDialog();
        }else{
          alert("未知错误");
        }
      })
  }
  return <Dialog open={prop.isloading} onClose={prop.closeLoadingDialog} scroll={'paper'}>
  <DialogTitle>填写毕业设计主题具体信息</DialogTitle>
  <DialogContent>
    <DialogContentText>
      为创建毕业设计题目，需要填写毕业设计题目以及毕业设计涉及到的内容
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Title"
      fullWidth
      variant="standard"
      onChange={handleTopic}
    />
    <TextField
          id="outlined-multiline-static"
          label="在此填写具体信息~~~"
          multiline
          minRows={5}
          onChange={handleContent}
          sx={{
            width:'100%',
            marginTop:5
          }}
        />

  </DialogContent>
  <DialogActions>
    <Button onClick={prop.closeLoadingDialog}>Cancel</Button>
    <Button onClick={handleSave}>Subscribe</Button>
  </DialogActions>
</Dialog>
}


  //PaperManager
function PaperManagerTable({rows,prop} ){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleConfirmButton(row){
      fetch('http://localhost:8080/TeacherBlock/studentconfirmpapermessageSet_isconfirmTo1?paperid='+row.paperid+'&studentid='+row.studentid).then(response=>response.json()).then(dataset=>{
        if(dataset.success==true){
          var body={"towhom":row.studentid,"fromwhom":data.id,"content":"您已成功选题！"};
          fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            })
            alert("成功接收该学生为您的毕业课题负责人");
            data.ischosen_paper="YES";
            prop.renovate();
        }else{
            alert("未知错误");
        }
      })
  }

function handleRejectButton(row){
  fetch('http://localhost:8080/TeacherBlock/studentconfirmpapermessageSetReject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
     if(dataset.success==true){
      var body={"towhom":row.studentid,"fromwhom":data.id,"content":"您的选题申请已被教师拒绝！"};
          fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            })
      prop.opendialog();
      prop.renovate();
     }else{
      alert("未知错误");
     }
  })

}

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleConfirmButton(row); }}>确认</Button>
                    <Button onClick={() => { handleRejectButton(row); }}>驳回</Button>
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );


}

function RejectDialog({prop}){
  return <div>
      <Dialog
      open={prop.isloading}
      onClose={prop.closeLoadingDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogContent>
          <DialogContentText>
          您已成功拒绝该学生申请
          </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={prop.closeLoadingDialog}>确定</Button>
      </DialogActions>
      </Dialog>
  </div>
}

function PaperManager(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [isloading,setisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);


  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/FindMessageTobeConduct?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/FindMessageTobeConduct?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师可以选择接受或者拒绝学生的毕业课题申请</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师可以选择接受或者拒绝学生的毕业课题申请</p>
    <div style={{
          width:'90%',
          marginTop:20,
      }}>
    <PaperManagerTable rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <RejectDialog prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
  </Box>
}

  //TaskandPlanUpload
  const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

var Taskplan_paperid="";

function UploadDialog({prop}){
  const [value,setvalue]=useState();

  var body = {'taskplanvalue':value,'paperid':Taskplan_paperid};
  function handleSave(){
    fetch('http://localhost:8080/TeacherBlock/SetTaskplan',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    })
  }

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
              请编辑您的任务书
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value}/>
      </DialogContent>
      </Dialog>
  </div>
}

function AllChosenPaperTable({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleConfirmButton(row){
      Taskplan_paperid=row.paperid;
      prop.opendialog();
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.istaskplamupload=="yes"?"已提交":"未提交"} <Button onClick={() => { handleConfirmButton(row); }}>提交或修改任务书</Button>
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}
  

function TaskandPlanUpload(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [isloading,setisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);



  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetAllchosenPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/GetAllchosenPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师在此提交任务书</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师在此提交任务书</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <AllChosenPaperTable rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <UploadDialog prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
  
    }}/>
  </Box>
}

//StartReportCheck
var StartReport_studentid="";

function ForStartreportDialog({prop}){
  const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/TeacherBlock/GetStartreportForTeacher?studentid='+StartReport_studentid).then(response=>response.json()).then(dataset=>{
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
              开题报告审核
            </Typography>
            <Button autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <div dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.startreport}} ></div>
      </DialogContent>
      </Dialog>
  </div>
}

function TableForStartReportCheck({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleConfirmButton(row){
    StartReport_studentid=row.studentid;
    prop.opendialog();
  }
  function handlepass(row){
    fetch('http://localhost:8080/TeacherBlock/Setstartreportstatetopass?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        var cuemessage={"towhom":row.studentid,"fromwhom":data.id,"content":"您的开题报告已被审核通过！"};
        fetch('http://localhost:8080/NormalBlock/Insert_cue',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuemessage)
        })
        alert("成功通过");
      }else{
        alert("未知错误");
      }
    })
  }

  function handleunpass(row){
    fetch('http://localhost:8080/TeacherBlock/Setstartreportstatetoreject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        var cuemessage={"towhom":row.studentid,"fromwhom":data.id,"content":"您的开题报告审核未通过！请及时修改再次提交"};
        fetch('http://localhost:8080/NormalBlock/Insert_cue',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuemessage)
        })
        alert("成功驳回");
      }else{
        alert("未知错误");
      }
    })
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid} {row.studentname}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleConfirmButton(row); }}>查看详细信息</Button>
                    <Button onClick={() => { handlepass(row); }}>通过</Button>
                    <Button onClick={() => { handleunpass(row); }}>驳回</Button>
                </TableCell>
            
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}

function StartReportCheck(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [isloading,setisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);

  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetStartReportUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      //console.log(dataset);
      setpaperdata(dataset);
    });
  },[]); 

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/GetStartReportUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }
  
  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%' 
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师在此板块审核学生的开题报告</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师在此板块审核学生的开题报告</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForStartReportCheck rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
      
    
    <ForStartreportDialog prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
  </Box>
}


//Translation  for student
function Translation(){
  const [filevalue,setfilevalue]=useState();
  const [translationstate,settranslationstate]=useState(-1);
  const [success,setsuccess]=useState(true);
  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetTranslationstate?studentid='+data.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        settranslationstate(dataset.translationstate);
      }else{
        setsuccess(false);
      }
    });
  },[]);
  

  function upload(){
    var formData = new FormData();
    formData.append("file",filevalue);
    formData.append("id",data.id);
    formData.append("cata","translation");
    //console.log(formData.id);
    fetch('http://localhost:8080/StudentBlock/Upload',{
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json'
      // },
      body:formData
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        fetch('http://localhost:8080/NormalBlock/GetTeacheridViaStudentid?id='+data.id).then(response=>response.json()).then(dataset=>{
          if(dataset.success==true){
            var cuemessage={"towhom":dataset.teacherid,"fromwhom":data.id,"content":"收到来自学生的外文翻译，请及时处理！"};
            fetch('http://localhost:8080/NormalBlock/Insert_cue',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(cuemessage)
            })
          }
        })
        alert("上传成功");
      }
    })
  }
  if(success==true){
    return <>
  <Box sx={{
    width:'100%',
    height:'100%'
  }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
  >
    <p>Tips:点击上传按钮上传文件</p>
    <p>当前状态：{translationstate==-1?"未提交":translationstate==0?"教师未审核":translationstate==1?"已通过":"未通过"}</p>
    <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    >
          <input type="file" onChange={event=>setfilevalue(event.target.files[0])} style={{
            marginLeft:550,
            marginTop:30,
          }}></input>
          <Button style={{
            marginTop:30,
            padding:0,
            height:30,
            backgroundColor:'deepskyblue',
            color:'white'
          }} onClick={upload}>确认上传</Button>
    </Box>
  </Box>
  </>
  }else{
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    >
      <p style={{
        fontSize:30,
        marginTop:350
      }}>您还未选题成功，请等候教师通过申请</p>
    </Box>
  }
  
}

//TranslationCheck
function TableForTranslationCheck({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  function handleDownloadButton(row){

    axios.get('http://localhost:8080/StudentBlock/Download?cata=translation&studentid='+row.studentid,{ responseType: 'arraybuffer' }).then(response=>{
      console.log(response.headers.get("filename"));
      if(response.headers.get("Content-Length")!=0){
        fileDownload(response.data,response.headers.get("filename"));
      }else{
        alert("学生未上传！");
      }
      
    });

    
  }

  function handlepass(row){
    fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetopass?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        var cuemessage={"towhom":row.studentid,"fromwhom":data.id,"content":"您的外文翻译已被审核通过！"};
        fetch('http://localhost:8080/NormalBlock/Insert_cue',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuemessage)
        })
        alert("成功通过");
      }else{
        alert("未知错误");
      }
    })
  }

  function handleunpass(row){
    fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetoreject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        var cuemessage={"towhom":row.studentid,"fromwhom":data.id,"content":"您的外文翻译审核未通过！请及时修改，重新提交"};
        fetch('http://localhost:8080/NormalBlock/Insert_cue',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuemessage)
        })
        alert("成功驳回");
      }else{
        alert("未知错误");
      }
    })
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid} {row.studentname}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleDownloadButton(row); }}>下载文件</Button>
                    <Button onClick={() => { handlepass(row); }}>通过</Button>
                    <Button onClick={() => { handleunpass(row); }}>驳回</Button>
                </TableCell>
            
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}

function TranslationCheck(){
  const [paperdata,setpaperdata]=useState(null);
  


  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetTranslationUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      //console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/GetTranslationUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师在此板块下载学生的外文翻译并审核</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师在此板块下载学生的外文翻译并审核</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForTranslationCheck rows={paperdata} prop={{
      renovate:renovate
    }}/>
    </div>
  </Box>
}

//论文批阅

var Paper_paperid;

function PaperComment(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);
 
  const closeLoadingDialog=()=>setisloading(false);


  useEffect(()=>{
    fetch('http://localhost:8080/TeacherBlock/GetUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/TeacherBlock/GetUncheckPaper?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }


  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师在此板块下载学生的论文并审核</p>
    </Box>
  }else{
    return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师在此板块下载学生的论文并审核</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForPaperComment rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <DialogForReason prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
      renovate:renovate
    }}/>
  </Box>
  }
}

function DialogForReason({prop}){
  const [value,setvalue]=useState();

  var body = {'reasonvalue':value,'paperid':Paper_paperid,'ispass':ispass};
  function handleSave(){
    fetch('http://localhost:8080/TeacherBlock/SetPaperComment',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        prop.renovate();
        prop.closeLoadingDialog();
        alert("提交成功！");
      }else{
        alert("未知错误");
      }
    });
  }


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
              请编辑您的理由
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
            <Button autoFocus color="inherit" onClick={prop.closeLoadingDialog}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value}/>
      </DialogContent>
      </Dialog>
  </div>
}
var ispass;

function TableForPaperComment({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  function handleDownloadButton(row){

    axios.get('http://localhost:8080/StudentBlock/Download?cata=paper&studentid='+row.studentid,{ responseType: 'arraybuffer' }).then(response=>{
      console.log(response.headers.get("filename"));
      if(response.headers.get("Content-Length")!=0){
        fileDownload(response.data,response.headers.get("filename"));
      }else{
        alert("学生未上传！");
      }
      
    });
    
  }

  function handlepass(row){
      Paper_paperid=row.paperid;
      ispass=1;
      prop.opendialog();
    // fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetopass?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==true){
    //     alert("成功通过");
    //   }else{
    //     alert("未知错误");
    //   }
    // })
  }

  function handleunpass(row){
    Paper_paperid=row.paperid;
    ispass=2;  
    prop.opendialog();
    // fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetoreject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==true){
    //     alert("成功驳回");
    //   }else{
    //     alert("未知错误");
    //   }
    // })
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid} {row.studentname}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleDownloadButton(row); }}>下载文件</Button>
                    <Button onClick={() => { handlepass(row); }}>通过</Button>
                    <Button onClick={() => { handleunpass(row); }}>驳回</Button>
                </TableCell>
            
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}


//WeekReportCheck
var Weekreport_id;

function DialogForSee({prop}){
  const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/StudentBlock/GetWeekReportContent?id='+see_Weekreportid).then(response=>response.json()).then(dataset=>{
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
              周报详情
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <div dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.content}} ></div>
      </DialogContent>
      </Dialog>
  </div>
}

function WeekReportCheck(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);

  const [isloading_forsee,setisloading_forsee]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);


  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/Getweekreport_teacher?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/StudentBlock/Getweekreport_teacher?teacherid='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }


  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:教师在此板块下对学生周报进行审核</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:教师在此板块下载学生的论文并审核</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForWeekReportCheck rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      openforseedialog:()=>{setisloading_forsee(true)},
      renovate:renovate
    }}/>
    </div>
    <DialogForReason_WeekReport prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
      renovate:renovate
    }}/>

    <DialogForSee prop={{
      isloading:isloading_forsee,
      closeLoadingDialog:()=>{setisloading_forsee(false)},
    }}/>
  </Box>
}

var ispass_Weekreport;
var see_Weekreportid;
function TableForWeekReportCheck({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handlecheck(row){
    see_Weekreportid=row.id;
    prop.openforseedialog();
  }

  function handlepass(row){
      Weekreport_id=row.id;
      ispass_Weekreport=1;
      prop.opendialog();
  }

  function handleunpass(row){
    Weekreport_id=row.id;
    ispass_Weekreport=2;  
    prop.opendialog();
    // fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetoreject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==true){
    //     alert("成功驳回");
    //   }else{
    //     alert("未知错误");
    //   }
    // })
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    论文id{" "+row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid} {row.studentname}
                </TableCell>
                <TableCell style={{width:160}} align="right"> 
                    <Button onClick={() => {handlecheck(row);}}>查看周报详情</Button>
                    <Button onClick={() => { handlepass(row); }}>通过</Button>
                    <Button onClick={() => { handleunpass(row); }}>驳回</Button>
                </TableCell>
            
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}
function DialogForReason_WeekReport({prop}){
  const [value,setvalue]=useState();

  var body = {'reasonvalue':value,'weekreportid':Weekreport_id,'ispass_Weekreport':ispass_Weekreport};
  function handleSave(){
    fetch('http://localhost:8080/TeacherBlock/SetWeekreportComment',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        prop.renovate();
        prop.closeLoadingDialog();
        alert("提交成功！");
      }else{
        alert("未知错误");
      }
    });
  }


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
              请编辑您的理由
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
            <Button autoFocus color="inherit" onClick={prop.closeLoadingDialog}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setvalue} value={value}/>
      </DialogContent>
      </Dialog>
  </div>
}


//TeacherForum
var postid_forcheck;//点击后赋值，根据此值弹出对应帖子内容

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function DialogForCreatePost({prop}){
  const [topic,settopic] = useState("Unknown");
  const [content,setcontent] = useState();


  const handletopic=event=>{
    settopic(event.target.value);
  }


  var body={'topic':topic,'content':content,'teacherid':data.id} ;

  function handleSave(){
    fetch('http://localhost:8080/StudentBlock/InsertIntopost',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        prop.closeLoadingDialog();
        prop.renovate();
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    });
  }
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
          请编辑您的话题
        </Typography>
        <Button autoFocus color="inherit" onClick={handleSave}>
          save
        </Button>
      </Toolbar>
    </AppBar>

    <TextField
          id="outlined-textarea"
          label="话题标题"
          multiline
          onChange={handletopic}
          sx={{
            marginTop:3,
            marginLeft:3,
            marginRight:3
          }}
        />

  <DialogContent>
  <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setcontent} value={content}/>
  </DialogContent>
  </Dialog>
</div>
}

function ShareComment({prop}){
  const [value,setvalue]=useState('');
  const [open,setopen]=useState(false);
  const [message,setmessage]=useState();
  const [color,setcolor]=useState("warning");

  const handlevaluechange=event=>{
    setvalue(event.target.value);
  }

  const handleClose=()=>{
      setopen(false);
  }

  var body={'teacherid':data.id,'postid':postid_forcheck,'content':value};
  function handleclick(){
    if(value!=''){
      fetch('http://localhost:8080/StudentBlock/InsertIntocomment',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        setcolor("success");
        setmessage("发表成功！");
        prop.renovate();
        setopen(true);
        setvalue('');
      }else{
        alert("未知错误");
      }
    })
    }else{
      setcolor("warning");
      setmessage("评论不能为空!");
      setopen(true);
    }
    
  }
  return <Box
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    flexDirection='column'
    sx={{
      marginTop:10
    }}
  >
    <TextField
          id="outlined-multiline-static"
          label="评论~~~~~"
          multiline
          minRows={4}
          onChange={handlevaluechange}
          sx={{
            width:800
          }}
          value={value}
        />
      <Button variant="contained" onClick={handleclick} sx={{
        alignSelf:'center',
        color:'white',
        marginTop:2
      }}>发表</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  </Box>
}
function DialogForCheckPost({prop}){
  const [value,setvalue]=useState();
  const [comment,setcomment]=useState(null);
  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/StudentBlock/GetPostViaId?id='+postid_forcheck).then(response=>response.json()).then(dataset=>{
      setvalue(dataset);
    });
    fetch('http://localhost:8080/StudentBlock/GetComment?postid='+postid_forcheck).then(response=>response.json()).then(data=>{
      setcomment(data);
    });
    }
  },[prop.isloading]);


  function renovate(){
    fetch('http://localhost:8080/StudentBlock/GetComment?postid='+postid_forcheck).then(response=>response.json()).then(data=>{
      setcomment(data);
    });
  }


  if(comment!=null){
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
              帖子详细信息
            </Typography>
          </Toolbar>
        </AppBar>
      <DialogContent>
      <Box
      display='flex'
      justifyContent='center'
      alignItems="center"
      flexDirection='column'
      >
        <p>{value==null?"":value.topic}</p>
        <p>{value==null?"":value.date}</p>
        <div style={{alignSelf:'flex-start'
        }} dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.content}} ></div>
        <div style={{
          marginTop:200,
          width:'100%',
          
        }}>
              <p>评论：</p>
              
              <TableForComment  rows={comment} />
              
        </div>
        
        <ShareComment prop={{
          renovate:renovate
        }}/>
        
        
      </Box>

      
      </DialogContent>
      </Dialog>
  </div>
  }else{
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
            帖子详细信息
          </Typography>
        </Toolbar>
      </AppBar>
    <DialogContent>
    
    <Box
    display='flex'
    justifyContent='center'
    alignItems="center"
    flexDirection='column'
    >
      <p>{value==null?"":value.topic}</p>
      <p>{value==null?"":value.date}</p>
      <div style={{alignSelf:'flex-start'
      }} dangerouslySetInnerHTML={{__html: value==null?"<p>null<p/>":value.content}} ></div>
    </Box>
    </DialogContent>
    </Dialog>
</div>
  }
  
}
function TableForPost({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleCheckButton(row){
    fetch('http://localhost:8080/StudentBlock/PostClickIncrease?id='+row.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        postid_forcheck=row.id;
        prop.opendialog();
      }else{
        alert("未知错误");
      }
    })
  }

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{Width:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <Button sx={{width:'100%'}} onClick={()=>{handleCheckButton(row);}}>
                <TableCell component="th" scope="row" style={{width:'60%'}}>
                    {row.topic}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.teachername}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.date}
                </TableCell>
                <TableCell style={{width:'10%'}} align="right">
                    {row.click}
                </TableCell>
                </Button>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );
}
function TableForComment({rows}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{Width:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:'60%'}}>
                    {row.content}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.teacherid}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.teachername}
                </TableCell>
                <TableCell style={{width:'10%'}} align="right">
                    {row.date}
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );
}
function TeacherForum(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);
  
  const [createisloading,setcreateisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);
  useEffect(()=>{
    fetch('http://localhost:8080/StudentBlock/GetPost').then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/StudentBlock/GetPost').then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  function createWeekReport(){
    setcreateisloading(true);
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    >

      <p>Tips:创建您的话题(点击‘+’创建话题)</p>
      <IconButton
      edge="start"
      color='primary'
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <br/>
    </Box>
  }else{
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:创建您的话题(点击‘+’创建话题)</p>
    <IconButton
      edge="start"
      color="primary"
      onClick={createWeekReport}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForPost rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      openCreatedialog:()=>{setcreateisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <DialogForCheckPost prop={{
      isloading:isloading,
      opendialog:()=>{setisloading(true)},
      closeLoadingDialog:closeLoadingDialog,
    }}/>
    <DialogForCreatePost prop={{
      renovate:renovate,
      isloading:createisloading,
      closeLoadingDialog:()=>{setcreateisloading(false)}
    }}/>
  </Box>
  }

}

//---------------------------------------------------------------Admin板块--------------------------------------------------------------------------
//CrewManager

var Modify_Id;
var cata_crew;
function DialogForModify_Crew({prop}){
  const [name,setname]=useState('');
  const [password,setpassword]=useState('');


  useEffect(()=>{
    if(prop.isloading){
    fetch('http://localhost:8080/AdminBlock/GetNameAndPassword?cata='+cata_crew+"&id="+Modify_Id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        setname(dataset.name);
        setpassword(dataset.password);
        console.log(dataset);
      }else{
        alert("未知错误");
      }
    })}
  },[prop.isloading])


  const handleName=(event)=>{
    setname(event.target.value);
  }

  const handlePassword=(event)=>{
    setpassword(event.target.value);
  }
var body={'name':name,'password':password,'cata':cata_crew,'number':Modify_Id};
  function handleSave(){
    fetch('http://localhost:8080/AdminBlock/UpdateCrewMessage',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        alert("修改成功");
        prop.renovate();
        prop.closeLoadingDialog();
      }else{
        alert("未知错误");
      }
    })
  }
  return <Dialog open={prop.isloading} onClose={prop.closeLoadingDialog} scroll={'paper'}>
  <DialogTitle>修改信息</DialogTitle>
  <DialogContent>
    <DialogContentText>
      可以修改教师或者学生的名字，密码等信息
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      placeholder={name}
      label="name"
      fullWidth
      variant="standard"
      onChange={handleName}
    />
    <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          placeholder={password}
          fullWidth
          variant="standard"
          onChange={handlePassword}
          style={{
            marginTop:20
          }}
        />

  </DialogContent>
  <DialogActions>
    <Button onClick={prop.closeLoadingDialog}>Cancel</Button>
    <Button onClick={handleSave}>Subscribe</Button>
  </DialogActions>
</Dialog>
}
function DialogForCreate_Crew({prop}){
  const [name,setname]=useState('');
  const [password,setpassword]=useState('');
  const [number,setnumber]=useState('');
  const [show,setshow]=useState(0);

  const handleNumber=(event)=>{
    setnumber(event.target.value);
  }
    
  const handleName=(event)=>{
    setname(event.target.value);
  }

  const handleShow=(event)=>{
    setshow(event.target.value);
  }

  const handlePassword=(event)=>{
    setpassword(event.target.value);
  }
var body={'number':number,'name':name,'password':password,'cata':show};
  function handleSave(){
    fetch('http://localhost:8080/AdminBlock/InsertCrewMessage',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        alert("添加成功");
        prop.renovate();
        prop.closeLoadingDialog();
      }else{
        alert("未知错误");
      }
    })
  }
  return <Dialog open={prop.isloading} onClose={prop.closeLoadingDialog} scroll={'paper'}>
  <DialogTitle>创建成员</DialogTitle>
  <DialogContent>
    <DialogContentText>
      在此输入姓名，学号，密码创建成员
    </DialogContentText>
    <Box sx={{ minWidth: 150,alignSelf:'flex-start',marginTop:5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">选择创建成员类别</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={show}
          label="类别"
          onChange={handleShow}
        >
          <MenuItem value={0}>学生</MenuItem>
          <MenuItem value={1}>教师</MenuItem>
        </Select>
      </FormControl>  
  </Box>

    <TextField
      autoFocus
      margin="dense"
      id="name"
      placeholder={name}
      label="name"
      fullWidth
      variant="standard"
      onChange={handleName}
      style={{
        marginTop:20
      }}
    />
    <TextField
      autoFocus
      margin="dense"
      id="number"
      placeholder={number}
      label="number"
      fullWidth
      variant="standard"
      onChange={handleNumber}
      style={{
        marginTop:20
      }}
    />
    <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          placeholder={password}
          fullWidth
          variant="standard"
          onChange={handlePassword}
          style={{
            marginTop:20
          }}
        />


  </DialogContent>
  <DialogActions>
    <Button onClick={prop.closeLoadingDialog}>Cancel</Button>
    <Button onClick={handleSave}>Subscribe</Button>
  </DialogActions>
</Dialog>
}
function TableForCrewManager({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleMessageChange(row){
      Modify_Id=row.id;
      cata_crew=row.cata;
      prop.opendialog();
  }

function handleDelete(row){
  fetch('http://localhost:8080/AdminBlock/DeleteCrew?cata='+cata_crew+"&id="+row.id).then(response=>response.json()).then(dataset=>{
    if(dataset.success){
      prop.renovate();
      alert("删除成功");
    }else{
      alert("未知错误");

    }
  })

}

  return (
    <TableContainer component={Paper} elevation={20} style={{marginTop:30,marginLeft:0,marginRight:40}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableHead style={{backgroundColor:'deepskyblue'}} >
            <TableRow>
            <TableCell component="th" scope="row" style={{width:160}}>
            <p style={{color:'white'}}>学号</p>
            </TableCell>
            <TableCell style={{width:320}} align="right">
                    <p style={{color:'white'}}>姓名</p>
            </TableCell>
            <TableCell style={{width:160}} align="right">
             <p style={{marginRight:80,color:'white'}}>操作</p>
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.number}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    <b style={{marginRight:10}}>{row.cata=="0"?"学生":"教师"}</b>
                    {row.name}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button style={{
                      marginRight:15
                    }} variant='contained' onClick={() => { handleMessageChange(row); }}>修改信息</Button>
                    <Button variant='contained' onClick={() => { handleDelete(row); }}>删除</Button>
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}
function CrewManager(){
  const [show,setshow]=useState(0);
  const [search,setsearch]=useState();
  const [crew,setcrew]=useState(null);
  const [isloading,setisloading]=useState(false);
  const [createisloading,setcreateisloading]=useState(false);

  useEffect(()=>{
    fetch('http://localhost:8080/AdminBlock/GetCrewMessage?show='+show).then(response=>response.json()).then(dataset=>{
      setcrew(dataset);
    });
  },[show]);

function renovate(){
  fetch('http://localhost:8080/AdminBlock/GetCrewMessage?show='+show).then(response=>response.json()).then(dataset=>{
    setcrew(dataset);
  });
}
  const handleChange=(event)=>{
    setshow(event.target.value);
  }

  function handleSearch(){
    fetch('http://localhost:8080/AdminBlock/GetCrewMessageVianumber?number='+search).then(response=>response.json()).then(dataset=>{
      setcrew(dataset);
    });
  }
  function createCrew(){
    setcreateisloading(true);
  }

if(crew==null){
  return <Box
  display='flex'
  flexDirection='column'
  justifyContent='flex-start'
  alignItems='center'
  sx={{
    width:'100%'
  }}
  >
<p sx={{
  marginTop:2,
  marginBottom:2

}}>Tips:在此查看人员信息(点击‘+’创建成员)</p>
  <Box
display='flex'
justifyContent='flex-start'
alignItems='flex-start'
sx={{
  width:'100%'
}}
>
  <Box sx={{ minWidth: 150,alignSelf:'flex-start',marginLeft:4,marginTop:10 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">人员显示</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={show}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>所有人员</MenuItem>
          <MenuItem value={1}>学生</MenuItem>
          <MenuItem value={2}>教师</MenuItem>
        </Select>
      </FormControl>  
  </Box> 
  <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,marginTop:10,marginLeft:4}}
      elevation={10}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search~~~"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event)=>{setsearch(event.target.value);}}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  </Box>
  <DialogForCreate_Crew prop={{
    closeLoadingDialog:()=>{setisloading(false);},
    renovate:renovate,
    isloading:createisloading
  }}/>
</Box>
}else{
   return <Box
  display='flex'
  flexDirection='column'
  justifyContent='flex-start'
  alignItems='center'
  sx={{
    width:'100%'
  }}
  >
<p sx={{
  marginTop:2,
  marginBottom:2

}}>Tips:在此查看人员信息(点击‘+’创建成员)</p>
<IconButton
      edge="start"
      color='primary'
      onClick={createCrew}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
  <Box
display='flex'
justifyContent='flex-start'
alignItems='flex-start'
sx={{
  width:'100%'
}}
>
  <Box sx={{ minWidth: 150,alignSelf:'flex-start',marginLeft:4,marginTop:10 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">人员显示</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={show}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>所有人员</MenuItem>
          <MenuItem value={1}>学生</MenuItem>
          <MenuItem value={2}>教师</MenuItem>
        </Select>
      </FormControl>  
  </Box> 
  <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,marginTop:10,marginLeft:4}}
      elevation={10}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search~~~"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event)=>{setsearch(event.target.value);}}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  </Box>
  <div style={{
          width:'95%',
          marginTop:20,
      }}>
  <TableForCrewManager rows={crew} prop={{
    renovate:renovate,
    opendialog:()=>{setisloading(true);}
  }}/>
  </div>
  <DialogForModify_Crew prop={{
    closeLoadingDialog:()=>{setisloading(false);},
    renovate:renovate,
    isloading:isloading,
    opendialog:()=>{setisloading(true)}
  }}/>
  <DialogForCreate_Crew prop={{
    closeLoadingDialog:()=>{setcreateisloading(false);},
    renovate:renovate,
    isloading:createisloading,
  }}/>
</Box>

}
}


//InfoManager

var Message_Id;

function TableForInfo({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleCheckButton(row){
    Message_Id=row.id;
    fetch('http://localhost:8080/AdminBlock/MessageClickIncrease?id='+row.id);
    prop.opendialog();
}

  function handleDelete(row){
    fetch('http://localhost:8080/AdminBlock/DeleteMessage?id='+row.id).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        prop.closeLoadingDialog();
        prop.renovate();
        alert("删除成功");
      }else{
        alert("未知错误");
      }
    })
  }

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody sx={{width:'100%'}}>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
               <Button onClick={() => { handleCheckButton(row); }} style={{width:'100%'}}> 
              <TableRow key={row.paperid} style={{width:'100%'}}>
               
                <TableCell style={{width:1200}} align="left">
                    {row.topic}
                </TableCell> 
                
                <TableCell style={{width:200}} align="right">
                    {row.date}
                </TableCell>
               
                <TableCell style={{width:150}} align="right">
                    <Button variant='contained' onClick={()=>{handleDelete(row);}}>
                      删除
                    </Button>
                </TableCell>
                
              </TableRow>
              </Button>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>

  );
}
function DialogForCreate_Info({prop}){
  const [topic,settopic] = useState("Unknown");
  const [content,setcontent] = useState();


  const handletopic=event=>{
    settopic(event.target.value);
  }


  var body={'topic':topic,'content':content,'studentid':data.id,'paperid':weekreport_paperid,'teacherid':weekreport_teacherid} ;

  function handleSave(){
    fetch('http://localhost:8080/AdminBlock/InsertIntoMessage',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then(response=>response.json()).then(dataset=>{
      if(dataset.success==true){
        prop.closeLoadingDialog();
        prop.renovate();
        alert("上传成功！");
      }else{
        alert("未知错误");
      }
    });
  }

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
          创建信息公告
        </Typography>
        <Button autoFocus color="inherit" onClick={handleSave}>
          save
        </Button>
      </Toolbar>
    </AppBar>

    <TextField
          id="outlined-textarea"
          label="公告标题"
          multiline
          onChange={handletopic}
          sx={{
            marginTop:3,
            marginLeft:3,
            marginRight:3
          }}
        />

  <DialogContent>
  <QuillNoSSRWrapper placeholder='在此编辑' modules={modules} formats={formats} theme="snow" onChange={setcontent} value={content}/>
  </DialogContent>
  </Dialog>
</div>
}
function DialogForSee_Info({prop}){
  const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/AdminBlock/GetMessageContentViaId?id='+Message_Id).then(response=>response.json()).then(dataset=>{
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
function InfoManager(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);
  
  const [createisloading,setcreateisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);

  useEffect(()=>{
    fetch('http://localhost:8080/AdminBlock/GetMessage').then(response=>response.json()).then(dataset=>{
      //Paperdata=dataset;
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/AdminBlock/GetMessage').then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }


  function createMessage(){
    setcreateisloading(true);
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='center'
    alignItems='flex-start'
    >

<p>Tips:管理人员添加公告(点击查看详细内容，点击删除及‘+’进行公告管理)</p>
      <IconButton
      edge="start"
      color='primary'
      onClick={createMessage}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <br/>
    </Box>
  }else{
    return <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:管理人员添加公告(点击查看详细内容，点击删除及‘+’进行公告管理)</p>
    <IconButton
      edge="start"
      color="primary"
      onClick={createMessage}
      aria-label="close"
      sx={{
        alignSelf:'flex-start',
        marginLeft:2
        }}
      >
        <AddCircleIcon />
      </IconButton>
      
      <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForInfo rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      openCreatedialog:()=>{setcreateisloading(true)},
      renovate:renovate,
      closeLoadingDialog:closeLoadingDialog
    }}
    />
    </div>
    <DialogForSee_Info prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
    <DialogForCreate_Info prop={{
      opendialog:()=>{setcreateisloading},
      renovate:renovate,
      isloading:createisloading,
      closeLoadingDialog:()=>{setcreateisloading(false)}
    }}/>
  </Box>
  }

}






//---------------------------------------------------------------Ref板块--------------------------------------------------------------------------
function TableForRef({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleConfirmButton(row){
      fetch('http://localhost:8080/RefBlock/Set_ispass_1_paper?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
        if(dataset.success==true){
            alert("已通过该教师申请的课题");
            prop.renovate();
        }else{
            alert("未知错误");
        }
      })
  }

function handleRejectButton(row){
  fetch('http://localhost:8080/RefBlock/Set_ispass_2_paper?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
     if(dataset.success==true){
      prop.opendialog();
      prop.renovate();
     }else{
      alert("未知错误");
     }
  })

}

  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:320}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    <Button onClick={() => { handleConfirmButton(row); }}>确认</Button>
                    <Button onClick={() => { handleRejectButton(row); }}>驳回</Button>
                </TableCell>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}

function RejecttTeacherDialog({prop}){
  return <div>
      <Dialog
      open={prop.isloading}
      onClose={prop.closeLoadingDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogContent>
          <DialogContentText>
          您已成功拒绝教师课题申请
          </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={prop.closeLoadingDialog}>确定</Button>
      </DialogActions>
      </Dialog>
  </div>
}

function PaperCheckForTeacher(){
  const [paperdata,setpaperdata]=useState(null);
  
  const [isloading,setisloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);

  useEffect(()=>{
    fetch('http://localhost:8080/RefBlock/GetAll_ispass_0_Frompaper').then(response=>response.json()).then(dataset=>{
      console.log(dataset);
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/RefBlock/GetAll_ispass_0_Frompaper').then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }

  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:审核人员可以选择通过或驳回教师提交的课题</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
    <p>Tips:审核人员可以选择通过或驳回教师提交的课题</p>
    <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForRef rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate
    }}/>
    </div>
    <RejecttTeacherDialog prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
  </Box>

}


//GradeCheck


var Ref_paperid;

function TableForGrade({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  function handleDownloadButton(row){

    axios.get('http://localhost:8080/StudentBlock/Download?cata=paper&studentid='+row.studentid,{ responseType: 'arraybuffer' }).then(response=>{
      console.log(response.headers.get("filename"));
      if(response.headers.get("Content-Length")!=0){
        fileDownload(response.data,response.headers.get("filename"));
      }else{
        alert("学生未上传！");
      }
      
    });
    
  }

  function handlecheck(row){
      Ref_paperid=row.paperid;
      prop.opendialog();
    // fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetopass?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==true){
    //     alert("成功通过");
    //   }else{
    //     alert("未知错误");
    //   }
    // })
  }

  function handlerate(row){
    Ref_paperid=row.paperid;
    prop.openratedialog();
    // fetch('http://localhost:8080/TeacherBlock/SetTranslationstatetoreject?paperid='+row.paperid).then(response=>response.json()).then(dataset=>{
    //   if(dataset.success==true){
    //     alert("成功驳回");
    //   }else{
    //     alert("未知错误");
    //   }
    // })
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{minWidth:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <Tooltip title={row.papercontent}>
              <TableRow key={row.paperid}>
                <TableCell component="th" scope="row" style={{width:160}}>
                    {row.paperid}
                </TableCell>
                <TableCell style={{width:300}} align="right">
                    {row.papername}
                </TableCell>
                <TableCell style={{width:160}} align="right">
                    {row.studentid} {row.studentname}
                </TableCell>
                <TableCell style={{width:180}} align="right">
                    <Button variant='contained' onClick={() => { handleDownloadButton(row); }}>下载文件</Button>
                    <Button variant='contained' style={{marginLeft:4,marginRight:4}} onClick={() => { handlecheck(row); }}>查看指导教师评语</Button>
                    <Button variant='contained' onClick={() => { handlerate(row); }}>评分</Button>
                </TableCell>
              </TableRow>
              </Tooltip>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}
function DialogForGrade_Check({prop}){
  const [teachercomment,SetTeacherComment]=useState('');

  useEffect(()=>{
    if(prop.isloading){
    fetch('http://localhost:8080/RefBlock/GetPapercomment?paperid='+Ref_paperid).then(response=>response.json()).then(dataset=>{
      if(dataset.success){
        SetTeacherComment(dataset.papercomment)
      }else{
        alert("未知错误");
      }
    })}
  },[prop.isloading])

  return <Dialog open={prop.isloading} onClose={prop.closeLoadingDialog} scroll={'paper'}>
  <DialogTitle>教师评语</DialogTitle>
  <DialogContent>
    <DialogContentText>
      以下是指导教师对学生论文评价，可以作为审核小组成员评分参考
  </DialogContentText>
    <Box
    sx={{
      minWidth:150,
      minHeight:200
    }}
    >
    <div dangerouslySetInnerHTML={{__html: teachercomment=="null"?"":teachercomment}} ></div>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={prop.closeLoadingDialog}>退出</Button>
  </DialogActions>
</Dialog>
}
function DialogForGrade_Rate({prop}){
  const [grade,setgrade]=useState('');
  const [content,setcontent]=useState('');

  const handleGrade=(event)=>{
    setgrade(event.target.value);
  }

  const handleContent=(event)=>{
    setcontent(event.target.value);
  }
  var body={'refnumber':data.id,'grade':grade,'gradecomment':content,'paperid':Ref_paperid};
  function handleSave(){
      fetch('http://localhost:8080/RefBlock/Updatepapergrade',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
  
        body: JSON.stringify(body)
      }).then(response=>response.json()).then(dataset=>{
        if(dataset.success){
          alert("评分成功");
          prop.renovate();
          prop.closeLoadingDialog();
        }else{
          alert("未知错误");
        }
      })
  }
  return <>
  <Dialog open={prop.isloading} onClose={prop.closeLoadingDialog} scroll={'paper'}>
  <DialogTitle>对学生毕业设计进行评分，给出评语</DialogTitle>
  <DialogContent>
    <DialogContentText>
      填写分数以及评语
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="分数"
      fullWidth
      variant="standard"
      onChange={handleGrade}
    />
    <TextField
          id="outlined-multiline-static"
          label="在此填写评价~~~"
          multiline
          minRows={5}
          onChange={handleContent}
          sx={{
            width:'100%',
            marginTop:5
          }}
        />

  </DialogContent>
  <DialogActions>
    <Button onClick={prop.closeLoadingDialog}>Cancel</Button>
    <Button onClick={handleSave}>Subscribe</Button>
  </DialogActions>
</Dialog>
</>
}
function GradeCheck(){
  const [paperdata,setpaperdata]=useState(null);

  const [isloading,setisloading]=useState(false);

  const [israteloading,setisrateloading]=useState(false);

  const closeLoadingDialog=()=>setisloading(false);

  const closeRateDialog=()=>{setisrateloading(false)};


  useEffect(()=>{
    fetch('http://localhost:8080/RefBlock/GetAll_state_0_Frompaper?refnumber='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  },[]);

  function renovate(){
    fetch('http://localhost:8080/RefBlock/GetAll_state_0_Frompaper?refnumber='+data.id).then(response=>response.json()).then(dataset=>{
      setpaperdata(dataset);
    });
  }


  if(paperdata==null){
    return <Box sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:答辩小组成员在此板块查看学生论文并打分评价</p>
    </Box>
  }
  return  <Box sx={{
    width:'100%',
    height:'100%'
  }}
  display='flex'
  justifyContent='flex-start'
  alignItems='center'
  flexDirection='column'
  >
      <p>Tips:答辩小组成员在此板块查看学生论文并打分评价</p>
      <div style={{
          width:'95%',
          marginTop:20,
      }}>
    <TableForGrade rows={paperdata} prop={{
      opendialog:()=>{setisloading(true)},
      renovate:renovate,
      openratedialog:()=>{setisrateloading(true)}
    }}/>
    </div>
    <DialogForGrade_Check prop={{
      isloading:isloading,
      closeLoadingDialog:closeLoadingDialog,
    }}/>
    <DialogForGrade_Rate prop={{
      isloading:israteloading,
      renovate:renovate,
      closeLoadingDialog:closeRateDialog,
    }}/>
  </Box>
}


//---------------------------------------------------------------mail板块--------------------------------------------------------------------------
//WriteEmail
function WriteEmail(){
  const [sentto,setSento]=useState('');
  const [topic,setTopic]=useState('');
  const [content,setContent]=useState('');
  const [open,setopen]=useState(false);
  const [color,setcolor]=useState('success');
  const [message,setmessage]=useState('');
  const handlTochange=(event)=>{
    setSento(event.target.value);
  }

  const handlTopicchange=(event)=>{
    setTopic(event.target.value);
  }

  const handleClose=()=>{
    setopen(false);
}
var body={"from":data.id,"topic":topic,"to":sentto,"content":content};
  function handleSend(){
    if(sentto==''||topic==''||content=='<p><br></p>'||content==''){
      setcolor('warning');
      setmessage('收件人、主题、内容不能为空');
      setopen(true);
    }else{
      fetch('http://localhost:8080/RefBlock/insertintomail',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response=>response.json()).then(dataset=>{
        if(dataset.success==true){
          setcolor('success');
          setmessage('发送成功!')
          setopen(true);
        }else{
          alert("未知错误");
        }
      })
    }
  }
  return <Box
  display='flex'
  flexDirection='column'
  justifyContent='flex-start'
  alignItems='center'
  sx={{
    width:'100%'
  }}
  >
<p>Tips:根据学号或者教工号发送邮件</p>
        <TextField  sx={{ minWidth: 250,alignSelf:'flex-start',marginLeft:5 ,marginTop:10}} margin="none" size="small" label="学号或者教工号" id="account"  helperText="number" InputProps={{
            startAdornment:(
                <InputAdornment position="start">
                    <AccountCircle />
                </InputAdornment>
            )
        }}
        onChange={handlTochange}
        ></TextField>

        <TextField id="standard-basic" label="输入主题" variant="standard" sx={{alignSelf:'flex-start',marginLeft:5,minWidth:500}} onChange={handlTopicchange}/>

        <QuillNoSSRWrapper placeholder='在此编辑message具体内容' modules={modules} formats={formats} theme="snow" onChange={setContent} value={content} style={{
        width:'90%',
        marginTop:50,
        alignSelf:'flex-start',
        marginLeft:42,
        minHeight:400
      }}/>
      <Button variant='contained' onClick={handleSend} style={{
        marginTop:60
      }}>发送</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  </Box>
}


//GetEmail
var Email_id;
function TableForEmail({rows,prop}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  function handleClick(row){
    Email_id=row.mailid;
    prop.opendialog();
  }
  return (
    <TableContainer component={Paper} style={{backgroundColor:'ivory'}}>
        <Table sx={{Width:500}} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage>0
            ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :rows
            ).map((row)=>(
              <TableRow key={row.mailid}>
                <Button sx={{width:'100%'}} onClick={()=>{handleClick(row);}}>
                <TableCell component="th" scope="row" style={{width:'60%'}}>
                    {row.topic}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.from}
                </TableCell>
                <TableCell style={{width:'15%'}} align="right">
                    {row.date}
                </TableCell>
                <TableCell style={{width:'10%'}} align="right">
                    {row.state=="0"?"未阅":"已阅"}
                </TableCell>
                </Button>
              </TableRow>
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </TableContainer>
  );
}
function DialogForCheck_Email({prop}){
  const [value,setvalue]=useState();

  useEffect(()=>{
    if(prop.isloading){
      fetch('http://localhost:8080/RefBlock/GetMailContent?mailid='+Email_id).then(response=>response.json()).then(dataset=>{
      setvalue(dataset);
      prop.renovate();
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
              邮件详情
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
function GetEmail(){
  const[mail,setmail]=useState(null);
  const [open,setopen]=useState(false);
  useEffect(()=>{
    fetch('http://localhost:8080/RefBlock/GetMailViaid?id='+data.id).then(response=>response.json()).then(dataset=>{
      setmail(dataset);
    })
  },[])

  function renovate(){
    fetch('http://localhost:8080/RefBlock/GetMailViaid?id='+data.id).then(response=>response.json()).then(dataset=>{
      setmail(dataset);
    })
  }
  if(mail==null){
    return <Box
    sx={{
      width:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:点击查收信息</p>
    </Box>
  }else{
    return <Box
    sx={{
      width:'100%',
      height:'100%'
    }}
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    >
      <p>Tips:点击查收信息</p>
      <div style={{
          width:'90%',
          marginTop:20,
      }}>
      <TableForEmail rows={mail} prop={{
      opendialog:()=>{setopen(true)},
      renovate:renovate,
    }}/>
    
    </div>
    <DialogForCheck_Email prop={{
      isloading:open,
      closeLoadingDialog:()=>{setopen(false);},
      renovate:renovate
    }}/>
    </Box>
  }
}





//---------------------------------------------------------------Main板块--------------------------------------------------------------------------

function Navigation({setblock}){
  return <div style={{
    width:250,
    backgroundColor:'deepskyblue',
    height:'100%',
    margin:0
  }}>
        <Studentsection  setblock={setblock}/>
        <Teachersection setblock={setblock}/>
        <Adminsection setblock={setblock}/>
        <Refsection setblock={setblock}/>
        <Mailsection setblock={setblock}/>
  </div>
}

export default function Main({setpage}) {
  const [blocknumber,setblocknumber]=useState();

  useEffect(()=>{
    if(data.category=='教师'){
      setblocknumber(9);
    }else if(data.category=='admin管理人员'){
      setblocknumber(17);
    }else if(data.category=='ref答辩小组成员'){
      setblocknumber(19);
    }else if(data.category=='学生'){
      setblocknumber(1);
    }
  },[])
  var Paperdata=[];
  function getpaperdata(){
    fetch('http://localhost:8080/StudentBlock/FindAllNotChsoenPaper').then(response=>response.json()).then(dataset=>{
      Paperdata=dataset;
    })
    return Paperdata;
  }

  function KindsofBlocks(){
    switch (blocknumber){
      case 1:
        return <><TopicPicking/></>;
      case 2:
        return <><TaskandPlan/></>;
      case 3:
        return <><StartReport/></>;
      case 4:
        return <><Translation/></>;
      case 5:
        return <><WeekReport/></>;
      case 6:
        return <><PaperUpload/></>;
      case 7:
        return <><CommentToTeacher/></>;
      case 8:
        return <><ReportMessage/></>;
      case 9:
        return <MyTopic/>;
      case 10:
        return <PaperManager/>;
      case 11:
        return <TeacherForum/>;
      case 12:
        return <TaskandPlanUpload/>;
      case 13:
        return <StartReportCheck/>;
      case 14:
        return <WeekReportCheck/>;
      case 15:
        return <TranslationCheck/>;
      case 16:
        return <PaperComment/>;
      case 17:
        return <CrewManager/>;
      case 18:
        return <InfoManager/>;
      case 19:
        return <PaperCheckForTeacher/>;
      case 20:
        return <GradeCheck/>;
      case 21:
        return <WriteEmail/>;
      case 22:
        return <GetEmail/>;
    }
  }
    return <>
        <Head>
          <title>Main Page</title>
        </Head>
        <Upheadblue setpage={setpage}/>
        <Box sx={{
          width:'100%',
          height:'100%'
        }}
        display='flex'
        justifyContent='flex-start'
        >
          <Navigation setblock={setblocknumber}/>
          <KindsofBlocks/>
        </Box>
      </>
        
  }