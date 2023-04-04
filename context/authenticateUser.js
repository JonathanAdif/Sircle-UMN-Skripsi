import { useEffect } from 'react'
import { authentication } from '@/lib/firebase';

// metod fungsi untuk mengetahui apakah user sedang login (authenticated) atau tidak 

const AuthStateChangeProvider = () => {
  const InitiateAuthStateChange = () => {
    authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is authenticated')
        console.log(user)
      } else {
        console.log('User is not authenticated')
      }
    })
  }

  useEffect(() => {
    InitiateAuthStateChange()
  }, [])

  return <></>
  
}

export default AuthStateChangeProvider

