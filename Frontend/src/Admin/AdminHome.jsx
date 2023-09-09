import '../Pages/Home/Home.css';
import { useStates } from '../States';
import { useEffect } from 'react';
import { motion } from "framer-motion";
import { RiFileEditFill } from "react-icons/ri"
import AddEstate from './AddEstate';
import EditEstate from './EditEstate';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Tooltip } from '@mui/material';

function AdminHome() {
    const { getAllEstate,estate,deletefromDB,addest,setaddest,editest,seteditest,seteditEstate } = useStates();

    useEffect(() => {
        // eslint-disable-next-line
    },[]);

    const geteditdata = (estate) => {
        fetch(`http://localhost:1028/estate/getbyid/${estate.estateId}`)
        .then((res) => res.json())
        .then((result) => {
            seteditEstate(result);
            console.log(result);
        });
    };
  
    return (
        <>
         <motion.div className="estate-page">
            
            <button  className='addpage-linkbtn' onClick={() => setaddest(true)}>
              <span className='addpage-link'>Add Estate</span>
             {addest && <AddEstate show={setaddest}/>}
            </button>
             {editest && <EditEstate show={seteditest}/>}
             
           {estate.map((estate,i) => {
            return(
                <>
                <motion.div layout key={i} className="admin-div">

                <Tooltip title="Edit"  placement="right" arrow>
                    <button className='edit-btn' 
                    onClick={()=> {
                        seteditest(true)
                        geteditdata(estate)
                    }}>
                        <RiFileEditFill/></button>
                </Tooltip>
                
                <Tooltip title="delete"  placement="bottom" arrow>
                    <button className='delete-btn' onClick={() =>{deletefromDB(estate.estateId)}}
                    ><RiDeleteBinLine/></button>
                </Tooltip>

                    <img className='estate-img' src={estate.estateUrl} alt=""></img>
                    <span className='estate-name'><b>{estate.estateName}</b></span>
                    <span className='estate-rate'><b>{estate.estateRate} Lakhs</b></span>
                    <button className='estate-location'>{estate.estateLocation}</button>
                </motion.div>
                </>
            )
        })}
        </motion.div>
        </>
    );
};
export default AdminHome;