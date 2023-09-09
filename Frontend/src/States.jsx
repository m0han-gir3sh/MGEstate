import { createContext, useContext, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "./axios";


const Context = createContext();
export const States = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw, setConfirmpw] = useState("");
    const [pwerror, setPwerror] = useState("");

    const [estate,setEstate] = useState([]);
    const [editestate,seteditEstate] = useState();
    const [ addest,setaddest ] = useState(false);
    const [ editest,seteditest ] = useState(false);
    
    const [ searchvalue,setSearchvalue ] = useState("");

    const [estname,setEstname] = useState("");
    const [estrate,setEstrate] = useState("");
    const [esturl,setEsturl] = useState("");
    const [estlocation,setEstlocation] = useState("default");

    var navigate = useNavigate();


    const passMatch = (e) => {
        e.preventDefault()
        setPwerror("");
        if(!(password===confirmpw)){
            setPwerror("[Your passwords do not match]")}
        else if(password===confirmpw)
        {
          signUp();
        }
    };


     const getAllEstate = () => {
      if(searchvalue==="")
      {
      fetch('http://localhost:1028/estate/getall')
        .then((res) => res.json())
        .then((result) => {
        setEstate(result);
          console.log(result);
        });
      }
      else
      {
        fetch(`http://localhost:1028/estate/getbyname/${searchvalue}`)
        .then((res) => res.json())
        .then((result) => {
        setEstate(result);
          console.log(result);
          if(result.length==='0')
          {
            
          }
        });
      }
       };


    const logincheck = (e) => {
      e.preventDefault()
        signIn()
    };


    const deletefromDB = (id) => {
      swal({
        title: "Conformation",
        text: "Are you sure you want to delete this estate ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => 
      {
        if(willDelete){
          axios.delete('/estate/delete',  { params: { estateId:id } }).then((response)=>{
            console.log(response);
            getAllEstate()
          });
        }
      });
    };


    const SendtoDB = (uid,type) => {
    const userDetails = {
      uid : uid,
      signupUsername: username,
      signupMail: email,
      signupPassword: password,
    };
    axios.post('/signup/create', userDetails).then((response)=>{
      console.log(response);
    });
  };



    const SendtoestDB = (e) => { 
    const estDetails = {
      estateName:estname,
      estateRate:estrate,
      estateUrl:esturl,
      estateLocation:estlocation
    };
    axios.post('/estate/add', estDetails).then((response)=>{
      console.log(response);
      if(response.data==="Estate exists already")
      {
        e.preventDefault();
        swal("This Estate exists already")
      }
      else
      {
      getAllEstate();
      }
    });
  };

    const SendtoDB2 = (username,email,uid,type) => {
    const userDetails = {
      uid : uid,
      signupUsername: username,
      signupMail: email,
      signupPassword: password,
      signupType: type,
    };
    axios.post('/signup/create', userDetails).then((response)=>{
      console.log(response);
    });
  };

  const googleLogin = async () => 
  {
    setPassword("")
    try {
      await auth.signInWithPopup(provider);
      setUser(await auth.currentUser);
    } catch (err) {
      console.log(err);
    }
    console.log(user);
    SendtoDB2(user.displayName,user.email,user.uid,"google");
    navigate("/home")
  };



    const signIn = (e) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => 
        {
          console.log(userCredential.user);
          if(email==="727821tucs128@skct.edu.in")
          navigate("/admin/home")
          else
          navigate("/home");
        })
        .catch((error) => {
          if(error.code==="auth/wrong-password")
          alert("The password is incorrect. Please enter the correct password");
          else if(error.code === "auth/user-not-found")
          {
            swal({
              title: "User Record not found",
              text: "Do you wish to create a new account ?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if(willDelete){
                setEmail("");
                setPassword("");
                navigate("/signup")
              }
            });
          }
          console.log(error);
        });
    };


  const signUp = (e) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => 
        {
          console.log(userCredential.user.uid);
          SendtoDB(userCredential.user.uid,"mail");
          navigate("/home");
        })
        .catch((error) => {
          if(error.code === "auth/email-already-in-use")
          alert("The email address is already in use by another account")
          else if(error.code==="auth/weak-password")
          swal("Weak Password Detected","Password must be atleast 6 characters")
          else if(error.code === "auth/invalid-email")
          alert("The Email is invalid ! Please enter a valid Email ID")
          console.log(error);
        });   
    };


    return(
        <Context.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            confirmpw,
            setConfirmpw,
            signIn,
            signUp,
            passMatch,
            pwerror,
            setPwerror,
            username,
            setUsername,
            logincheck,
            SendtoDB,
            googleLogin,
            estate,
            setEstate,
            getAllEstate,
            deletefromDB,
            setEstname,
            setEstrate,
            setEsturl,
            SendtoestDB,
            setEstlocation,
            addest,
            setaddest,
            seteditest,
            editest,
            editestate,
            seteditEstate,
            setSearchvalue,
            searchvalue
        }}
        >{children}
        </Context.Provider>
    );
};
export const useStates = () => useContext(Context);