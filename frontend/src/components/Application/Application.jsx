import React,{useState,useContext} from 'react'
import { Context } from '../../main'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Application = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [coverletter, setCoverLetter] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [resume,setResume] = useState("null")

    const {isAuthorized,user} = useContext(Context);

    const navigateTo = useNavigate();

    //function to handle file input changes
    const handlefileChange = (e) =>{
        const resume = e.target.files(e);
        setResume(resume);
    };

    const {id} = useParams();
    const handleApplication = async(e) =>{
        e.preventdefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverletter);
        formData.append("jobId", id);

        try {
            const {data} = await axios.post("https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/application/post",formData,{ //changes await to nothing
                withCredentials:true,
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            setName("")
            setEmail("")
            setCoverLetter("")
            setPhone("")
            setAddress("")
            setResume("")
    
            toast.success(data.message);
            navigateTo("/job/getall")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    
    
    if(!isAuthorized || (user && user.role === "Employer")){
        navigateTo("");
    }

   
}

    return (
        <>
<section className='application'>
<div className="container">
    <h3>Application form</h3>
    <form onSubmit={handleApplication}>
        <input type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type='text' placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='number' placeholder='Your Phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <input type='text' placeholder='Your Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
        <textarea value={coverletter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder='Cover Letter'/>
            <div>
                <label style={{textAlign: "start",display:"block",fontSize:"20px"}}>Select Resume</label>
                <input type="file" accept='.jpg .png .webp' onChange={handlefileChange} style={{width: "100%"}}/>
            </div>
            <button type='submit'> Send Application </button>
    </form>
</div>
</section>
        </>
    )
}

export default Application