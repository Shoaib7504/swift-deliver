import { use } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const authinfo = use(AuthContext);
  return authinfo;
}

export default useAuth