import React from 'react';
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className='w-full h-[10vh] bg-slate-200/60 fixed flex justify-between items-center px-5 py-2 box-border text-slate-600 z-50'>
            <div className="text-3xl font-medium cursive">
                Todo List
            </div>
            <div className="">
                <NavLink to='/'>Home</NavLink>
            </div>
        </div>
    )
}
