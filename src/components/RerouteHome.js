import React from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js'

const RerouteHome = () => {
    const navigate = useNavigate()
    React.useEffect(() => {
        navigate('/');
        Toastify({text: "Hmm... That page doesn't exist.", duration:2500 ,gravity: "top", position: "left", backgroundColor: "red"}).showToast();
    },[])

    return(<></>)
}

export default RerouteHome