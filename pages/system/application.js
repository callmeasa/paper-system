import { useState } from "react";
import Loginpage from "./login";
import Main from "./main";
export default function application(){
    const [page,setpage]=useState(0);
    function setA(){
        setpage(0);
    }
    switch(page){
        case 0:
            return <><Loginpage setpage={setpage}></Loginpage></>
        case 1:
            return <><Main setpage={setpage}/></>
        case 2:
            return <>
            <button onClick={setA}></button>
            </>
    }
    
}