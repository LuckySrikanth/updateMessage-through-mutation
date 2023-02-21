import { useState } from "react"
import ParticularIdApp from "./ParticularIdApp"
import "./App.css"



const AllMessage = props => {
    const {msgList} = props
    const [CurrentState, setCurrentState] = useState(false)


    return (
        <div className="two-cards">
        <div className="one-card">
            <p><b>Id :</b> {msgList.id}</p>
            <p><b>Subject : </b> {msgList.subject}</p>
            <p><b>Body: </b>{msgList.body}</p>
            <div>
                <button type="button" className="button-37"
                onClick={() => setCurrentState(prevState => !prevState)}
                      >View More
                </button>
            </div>
        </div>
         <div className="two-card">
         {
             CurrentState && <ParticularIdApp messageId = {msgList.id} setCurrentState = {setCurrentState}/>
         }
     </div>
     </div>
    )

}

export default AllMessage