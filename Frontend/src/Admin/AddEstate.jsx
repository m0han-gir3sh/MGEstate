import './AddEstate.css'
import { TextField } from '@mui/material'
import { useStates } from '../States';
import { AiOutlineRollback} from 'react-icons/ai';


const AddEstate = ({ show }) => {

  const { setEstname, setEstrate, setEsturl, SendtoestDB, setEstlocation } = useStates();
  return (
    <>
      <div className='add-page'>
        <div className='add-box'>

          <div className='add-div'>
            <span className='add-text'><b>NEW ESTATE</b></span>
            
          </div>

          <form onSubmit={() => show(false)}>
            <div className='canceladdest-div'>
              <button className='canceladdest-btn'><b><AiOutlineRollback/></b></button>
            </div>
            
          </form>
          
          <form onSubmit={SendtoestDB}>

            <div className='estname-div'>
              <TextField className='estname-in' label="Estate Name" variant="standard" required
                onChange={(e) => setEstname(e.target.value)} />
            </div>

            <div className='estrate-div'>
              <TextField className='estrate-in' type='number' label="Estate Price" variant="standard" required
                onChange={(e) => setEstrate(e.target.value)} />
            </div>

            <div className='esturl-div'>
              <TextField className='esturl-in' label="Estate URL" variant="standard" required
                onChange={(e) => setEsturl(e.target.value)} />
            </div>

            <div className='estlocation-div'>
            <TextField className='estlocation-in' label="Estate Location" variant="standard" required
                onChange={(e) => setEstlocation(e.target.value)} />
            


            </div>

            <div className='addest-div'>
              <button className='addest-btn' onClick={() => show(false)}>ADD NEW ESTATE</button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};
export default AddEstate;
