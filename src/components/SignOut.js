import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'


// จริง ๆ ไม่ต้องใช้ก็ได้เว้ย เซ็ตเอาในปุ่มไปเลย จบ 
function Signout() {

    let [cookies, removeCookie] = useCookies(['token'])
    let navigate = useNavigate()

    useEffect(() => {
        removeCookie(' token') 
        navigate('/signin')
    },[])

    return (
        <div>
            <center>
                <h1>กำลังออกจากระบบ</h1>
            </center>
        </div>
    )
}
export default Signout