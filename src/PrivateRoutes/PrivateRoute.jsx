import React from 'react'
import useAuth from '../hooks/UseAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function PrivateRoute({children}) {
    const {user,loading} = useAuth()
    const navigate = useNavigate()
    if(loading)
    {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
    }
    if(user)
    {
        toast.success("Welcome to your dashboard")
        return children
    }
    toast.error("You are not authorized to access this page")
    navigate('/login')
    return null;
}