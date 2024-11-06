import React, { useState } from 'react'
import characterOne from '../images/ch1.png'
import backgroundImage from '../images/bg.jpg'
import { auth, db } from '../firebase';
import { setDoc, doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import {motion} from 'framer-motion'

function StudentRegistration() {
    const [searchEmail, setSearchEmail] = useState(""); 
    const [FirstName, setFName] = useState("");
    const [LastName, setLName] = useState("");
    const [MiddleName, setMName] = useState("NA");
    const [Gender, setGender] = useState("Male");
    const [DateBirth, setDateBirth] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [Password, setPassword] = useState("");
    const [GFName, setGFName] = useState("");
    const [GLName, setGLName] = useState("");
    const [GMName, setGMName] = useState("NA");
    const [GPhone, setGPhone] = useState("");
    const [GEmail, setGEmail] = useState("");
    const [GLandline, setGLandline] = useState("NA")
    const [telephone, setTelephone] = useState('');
    const [password, setPasswords] = useState('')
    const [status] = useState("student");
    const [Gtelephone, setTelephone2] = useState('');
    const [userFound, setUserFound] = useState(false); 
    const [userId, setUserId] = useState("");


    const handleTelephoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        setTelephone(value);
        setPhone(value); 
    };

    const handleTelephoneChange2 = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        setTelephone2(value);
        setGPhone(value); 
    };


    const studentRegister = async (e) => {
        e.preventDefault();
        try {
            if (userFound) { 
                if (password !== Password) {
                    toast.error("The passwords do not match.", { position: "top-center", autoClose: 5000 });
                    return; 
                }
    
                const userDocRef = doc(db, "users", userId);
                await updateDoc(userDocRef, {
                    firstName: FirstName,
                    lastName: LastName,
                    middleName: MiddleName,
                    gender: Gender,
                    dateOfBirth: DateBirth,
                    email: Email,
                    phone: Phone,
                    address: Address,
                    password: Password,
                    role: status,
                    emergencyContact: {
                        guardianFirstName: GFName,
                        guardianLastName: GLName,
                        guardianMiddleName: GMName,
                        guardianPhone: GPhone,
                        guardianEmail: GEmail,
                        guardianLandline: GLandline
                    }
                });
                toast.success("User information updated successfully!", { position: "top-center", autoClose: 5000 });
                setUserFound(false); 
            } else {
                if (password !== Password) {
                    toast.error("The passwords do not match.", { position: "top-center", autoClose: 5000 });
                    return;
                } else {
                    const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
                    const user = userCredential.user;
                    await setDoc(doc(db, "users", user.uid), {
                        firstName: FirstName,
                        lastName: LastName,
                        middleName: MiddleName,
                        gender: Gender,
                        dateOfBirth: DateBirth,
                        email: Email,
                        phone: Phone,
                        address: Address,
                        password: Password,
                        role: status,
                        emergencyContact: {
                            guardianFirstName: GFName,
                            guardianLastName: GLName,
                            guardianMiddleName: GMName,
                            guardianPhone: GPhone,
                            guardianEmail: GEmail,
                            guardianLandline: GLandline
                        }
                    });
                    toast.success("Successfully registered!", { position: "top-center", autoClose: 5000 });
                }
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center", autoClose: 5000 });
            console.error("Error", error);
        }
    };


    const appStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',


    };

    const handleSearch = async () => {
        try {
            const q = query(collection(db, "users"), where("email", "==", searchEmail));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                if (userData.role === "student") {
                    setUserId(userDoc.id);
                    setFName(userData.firstName || "");
                    setLName(userData.lastName || "");
                    setMName(userData.middleName || "NA");
                    setGender(userData.gender || "Male");
                    setDateBirth(userData.dateOfBirth || "");
                    setEmail(userData.email || "");
                    setPhone(userData.phone || "");
                    setAddress(userData.address || "");
                    setGFName(userData.emergencyContact?.guardianFirstName || "");
                    setGLName(userData.emergencyContact?.guardianLastName || "");
                    setGMName(userData.emergencyContact?.guardianMiddleName || "NA");
                    setGPhone(userData.emergencyContact?.guardianPhone || "");
                    setGEmail(userData.emergencyContact?.guardianEmail || "");
                    setGLandline(userData.emergencyContact?.guardianLandline || "NA");
    
                    setUserFound(true);
                } else {
                    setUserFound(false);
                    toast.error("No user found!", { position: "top-center", autoClose: 3000 });
                }
            } else {
                setUserFound(false);
                toast.error("No user found!", { position: "top-center", autoClose: 3000 });
            }
        } catch (error) {
            console.error("Error searching user:", error);
            toast.error("Error searching user!", { position: "top-center", autoClose: 3000 });
        }
    };
    


    return (
        <motion.div className='w-full '
            initial={{ opacity: 0, x: 100 }}  
            animate={{ opacity: 1, x: 0 }}   
            transition={{ duratiom: 0.2 }} 
        >
            <div className=' flex w-full overflow-hidden rounded-lg' style={appStyle}>
                <div className='flex p-6  bg-[#00712d9c] w-full'>


                    <div className='flex w-[20%]'>
                        <div className='w-full mr-6'>
                            <div className='w-full  mt-10'>
                                <div className='flex mr-6 justify-center content-center items-center w-full'>
                                    <img className='rounded-full drop-shadow-lg border-solid border-[#2db162]  border-4' src={characterOne} alt='avatar' />

                                </div>
                            </div>
                            <div className='w-full flex content-center items-center justify-center mt-5 text-center drop-shadow-lg '>
                                <input id='fileInput' className='text-xl flex text-center ' style={{display: "none"}} type='file' accept='image/*' />
                                
                                <label
                                className="text-black cursor-pointer text-xl"
                                htmlFor='fileInput'>
                                Uploade file
                                </label>
                            </div>

                        </div>
                    </div>

                    <form onSubmit={studentRegister} className='flex w-[80%]'>
                        <div className='bg-[#ffffffe8] py-5 px-10 rounded-lg w-full'>
                            <div className='flex justify-between'>
                                <div>Student Registration</div>
                                <div className=''>
                                    <input className='px-5 text-2xl bg-gray-300 rounded-l-xl' type='search' value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
                                    <button className='text-2xl px-3 ' type='button' onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                            <div className='mt-2 flex gap-5'>
                                <div className='w-full'>
                                    <div className='ml- flex text-2xl'>First name<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={FirstName} required onChange={(e) => setFName(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='flex ml-4 text-2xl'>Last name<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={LastName} required onChange={(e) => setLName(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl' >Middle name</div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={MiddleName} onChange={(e) => setMName(e.target.value)} type='text' />
                                </div>
                            </div>
                            <div className='mt-2 flex gap-5'>

                                <div className='w-full'>
                                    <div className='ml- text-2xl flex'>Gender<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <select
                                        onChange={(e) => setGender(e.target.value)}
                                        id="gender"
                                        name="gender"
                                        className="w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-[6px]"
                                        required
                                        value={Gender}
                                    >
                                        <option value="" disabled>Select a gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className='w-full'>
                                    <div className='ml-4 flex text-2xl'>Date of birth<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={DateBirth} required onChange={(e) => setDateBirth(e.target.value)} type='date' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl flex'>Email<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' required value={Email} onChange={(e) => setEmail(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl flex'>Phone no.<h1 className='text-red-600 ml-1'>*</h1></div>

                                    <input 
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        value={Phone}
                                        onChange={handleTelephoneChange}
                                        className="w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1"
                                        
                                        maxLength={11}
                                        placeholder="Enter 11-digit phone number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mt-2 flex gap-5'>
                                <div className='w-full'>
                                    <div className=' text-2xl flex'>Address<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <textarea className='w-full max-h-[140px] bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1 ' value={Address} required onChange={(e) => setAddress(e.target.value)} type='' />
                                </div>
                            </div>
                            <div className='mt-2 flex gap-5'>
                                <div className='w-full'>
                                    <div className=' text-2xl flex'>Password<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' onChange={(e) => setPasswords(e.target.value)} type='password' />
                                </div>

                                <div className='w-full'>
                                    <div className='ml-4 flex text-2xl'>Confirm Password<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' minLength={6} required onChange={(e) => setPassword(e.target.value)} type='password' />
                                </div>
                            </div>
                            <div className='mt-4 text-2xl'> Emergency Contact Information</div>
                            <div className='mt-2 flex gap-5'>
                                <div className='w-full'>
                                    <div className=' text-2xl flex'>Guardian's first name<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' required value={GFName} onChange={(e) => setGFName(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl flex'>Guardian's last name<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input required className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={GLName} onChange={(e) => setGLName(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl'>Guardian's middle name</div>
                                    <input  className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' value={GMName} onChange={(e) => setGMName(e.target.value)} type='text' />
                                </div>
                            </div>
                            <div className='mt-2 flex gap-5'>
                                <div className='w-full'>
                                    <div className=' text-2xl flex' required>Guardian's phone no.<h1 className='text-red-600 ml-1'>*</h1></div>
                                    

                                    <input
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        value={GPhone}  
                                        onChange={handleTelephoneChange2}
                                        className="w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1"
                                        maxLength={11}
                                        placeholder="Enter 11-digit phone number"
                                        required
                                    />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 flex text-2xl'>Guardian's email<h1 className='text-red-600 ml-1'>*</h1></div>
                                    <input value={GEmail} className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' required onChange={(e) => setGEmail(e.target.value)} type='text' />
                                </div>
                                <div className='w-full'>
                                    <div className='ml-4 text-2xl'>Landline</div>
                                    <input value={GLandline} className='w-full bg-gray-300 rounded-xl px-4 focus:outline-none text-xl py-1' onChange={(e) => setGLandline(e.target.value)} type='text' />
                                </div>
                            </div>
                            <div className='mt-5 flex justify-end'>
                                <button type="submit" className={`text-xl hover:scale-105 transition-all font-extralight  px-6 rounded-lg text-white py-2 ${userFound ? "bg-blue-700" : "bg-green-700"}`}>
                                    {userFound ? "Update" : "Register"}
                                </button>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </motion.div>
    )
}

export default StudentRegistration