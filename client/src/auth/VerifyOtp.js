
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GetToken,StoreToken } from './Token'
import { setUserToken,setUserId,setUserName } from '../features/AuthSlice';
import { useVerifyOTPMutation } from './AuthApi'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import '../Css/auth.css';


const VerifyOtp = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [enteredOtp,SetenteredOtp] = useState('')
    const [verifyOtp,respondData] = useVerifyOTPMutation()
    const [logMsg,setlogMsg] = useState('')
    const [server_error,setServer_error] = useState('')


    const HandleOTPsubmit = async(e)=>{
      e.preventDefault()
      const data ={
        email:location.state.email,
        otp:enteredOtp
      }
      const res = await verifyOtp(data)
      if (res.error){
        setServer_error(res.error.data.data)
        console.log(res.error.data)
      }
      if (res.data){
        console.log(res.data)
        StoreToken(res.data.token)
        let { access_token } = GetToken()
        dispatch(setUserToken({access_token:access_token}))
        dispatch(setUserId(res.data.userId))
        dispatch(setUserName(res.data.userName))
        setlogMsg(res.data)
      }
    }


  return (
    <div>
      <form  onSubmit={HandleOTPsubmit}>
			<div className="form_otp">

      <div className="otp-info">
					<label ><h4>OTP</h4></label>
				</div>

				<div className="otp-info">
					<input type="text" id="otp" onChange={e=>SetenteredOtp(e.target.value)} value={enteredOtp} />
				</div>

        <div>
            {server_error ? <div className='errors'>* {server_error}
            <div><Link to='/login'><p>*** login </p></Link></div></div> : null}
            { logMsg ? <div>* {logMsg.data}</div> : null}
        </div>

				<div className="otp-info">
					<input type="submit" value="send otp" className ="submit_btn"/>
				</div>
			</div>
		</form>
    </div>
  )
}

export default VerifyOtp