import Quote from "../components/quote"
import { SignupAuth } from "../components/SignupAuth"


function Signup(){

    return(
        <div className="grid grid-cols-2">
            <Quote/>
            <SignupAuth/>
        </div>
    )
}

export default Signup