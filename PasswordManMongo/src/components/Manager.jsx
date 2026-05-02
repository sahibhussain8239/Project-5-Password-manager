import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isToggled, setIsToggled] = useState(false)

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        setIsToggled(prev => !prev)
    }

    const copyText = (text) => {
        toast('Copied to Clipbord!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // Edit Mode
            if (form.id) {
                // If any such id exists tn the db, delete it
                await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

                await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })

                setPasswordArray(passwordArray.map(p =>
                    p.id === form.id ? form : p
                ))
                // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
                // setform({ site: "", username: "", password: "" })
                toast('Password Edited and Saved!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                const newPassword = { ...form, id: uuidv4() }

                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword)
                })

                setPasswordArray([...passwordArray, newPassword])
            }

            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        }
        else {
            toast('Error: Password Not Saved!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }
            )

            toast('Password Deleted!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(p => p.id === id)
        setform(passwordToEdit)
    }



    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-125 w-125 -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(79,183,103,0.5)] opacity-50 blur-[80px]">
                </div>
            </div>

            <div className='md:mx-auto md:px-40 md:py-16 p-3 min-h-[85.6vh]'>
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Password
                    <span className='text-green-500'>Man/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-5 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full bg-white border w-full border-green-500 px-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full gap-5'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full bg-white border border-green-500 px-4 py-1' type="text" name='username' id='username' />
                        <div className='relative'>
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full bg-white border border-green-500 px-4 py-1' type={isToggled ? "text" : "password"} name='password' id='password' />
                            <span className='absolute right-2 cursor-pointer' onClick={showPassword}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover">
                                </lord-icon>
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-1 bg-green-500 hover:bg-green-400 rounded-full px-4 py-2 w-fit border border-green-900 font-bold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="hover">
                        </lord-icon>Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length !== 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center max-w-34 overflow-clip text-clip'>
                                        <div className='flex items-center justify-center gap-3'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-4 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <img src="copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{item.username}</span>
                                            <div className='size-4 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <img src="copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='size-4 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <img src="copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
