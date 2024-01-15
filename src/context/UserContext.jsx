import React, { createContext, useState } from 'react'

export const UserContext=createContext()
export const UserProvider = (props) => {
    const [userData, setuserData] = useState({
        user: undefined,
        token:undefined
 });

  return (
      <UserContext.Provider value={[userData,setuserData]}>
          {props.children}
    </UserContext.Provider>
  )
}

export default UserContext;
