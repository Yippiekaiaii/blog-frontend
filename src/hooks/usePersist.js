
//Hook for storing if user has set to stay logged in beyond browser refresh or reload

import {useState, useEffect} from "react"


    const usePersist = () => {

        //create state variable persist and function set persist, if no persist exists then its default value is set to false
        const [persist,setPersist] = useState(JSON.parse(localStorage.getItem("persist"))||false)

        //Listen for persist changes and set the value of the local storage on change
        useEffect(() => {
            localStorage.setItem("persist",JSON.stringify(persist))
        },[persist])
        
        return [persist,setPersist]
    }

export default usePersist