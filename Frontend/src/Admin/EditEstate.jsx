import './EditEstate.css'
import { TextField} from '@mui/material'
import { useStates } from '../States';
import { AiOutlineRollback } from 'react-icons/ai'
import axios from '../axios';
import { useEffect, useState } from 'react';

const EditEstate = ({ show }) => {
    const { getAllEstate,editestate } = useStates();

    const [estid, setEstid] = useState("");
    const [estname, setEstname] = useState("");
    const [estrate, setEstrate] = useState("");
    const [esturl, setEsturl] = useState("");
    const [estlocation, setEstlocation] = useState("");

    useEffect(() => {
      setEstid(editestate?.estateId)
      setEstname(editestate?.estateName)
      setEstrate(editestate?.estateRate)
      setEsturl(editestate?.estateUrl)
      setEstlocation(editestate?.estateLocation)
    }, [editestate]);

    const editfromDB = () => {
      const esteditDetails = {
        estateName:estname,
        estateRate:estrate,
        estateUrl:esturl,
        estateLocation:estlocation
      }
      axios.put(`/estate/edit/${estid}`,esteditDetails)
      .then((response)=>{
        console.log(response);
        getAllEstate();
      });
  };

  
  return (
    <>
     <div className='edit-page'>
          <div className='edit-box'>

            <div className='edit-div'>
              <span className='edit-text'><b>EDIT ESTATE</b></span>
            </div>

            <form onSubmit={()=> show(false)}>
            <div className='canceleditest-div'>
              <button  className='canceleditest-btn'><b><AiOutlineRollback/></b></button>
            </div>
            </form>

            <form onSubmit={()=> show(false)}>
            <div className='editestname-div'>
            <TextField className='editestname-in' label="Estate Name" variant="filled" value={estname}
              onChange={(e) => setEstname(e.target.value)}/>
            </div>

            <div className='editestrate-div'>
            <TextField className='editestrate-in' label="Estate Rate" type='number' variant="filled" value={estrate}
              onChange={(e) => setEstrate(e.target.value)}/>
            </div>

            <div className='editesturl-div'>
            <TextField className='editesturl-in'  label="Estate URL" variant="filled" value={esturl}
              onChange={(e) => setEsturl(e.target.value)}/>
            </div>

            <div className='estlocation-div'>
            <TextField className='estlocation-in' label="Estate Location" variant="filled" value={estlocation}
                onChange={(e) => setEstlocation(e.target.value)} />
                </div>

            <div className='editest-div'>
              <button className='editest-btn' onClick={editfromDB}>Update Estate</button>
            </div>
            </form>
           </div> 
        </div>
    </>
  );
};
export default EditEstate; 
