import './Navbar.css';
import { useStates } from "../../States";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdLogout} from 'react-icons/md';

function Navbar() {
    const { setSearchvalue,getAllEstate,searchvalue } = useStates();
    
    useEffect(() => {
        getAllEstate();
        // eslint-disable-next-line
    },[searchvalue]);
    
    return (
        <>
            <div className='navbar-page'>

                <div className='navbar-div'>
                    <ul>
                        <li>
                        <img src='https://res.cloudinary.com/dnngdn8ev/image/upload/v1686055875/1_1_wer3qc.jpg' alt='' className='nav-logo'></img>
                        </li>
<li>
    <div className='navcontent'>NEW HOME,NEW BEGINNING</div>
</li>
                        <li>
                        <input className='nav-searchbar' type='text' placeholder='  Search Estate'
                        onChange={(e) => setSearchvalue(e.target.value)}
                        ></input>
                        </li>

                        <li>
                            <Link to='/AboutUs'><button className='abtusbtn'>About Us </button></Link></li> 
                         <li> <Link to='/home'> <button className='homebtn'>Home </button></Link>  
                        </li>
                        <li>
                        <Link to='/'> <button className='logoutbtn'><MdLogout /></button></Link>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    );
};
export default Navbar;