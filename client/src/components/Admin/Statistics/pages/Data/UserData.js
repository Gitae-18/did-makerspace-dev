import React,{useState,useEffect,state} from 'react';
import axios from "axios";
export default function UserData(){
    
    const [data,setData] = useState(null);
     const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    let option = {
        method:"GET",
        headers:{
            "content-type" : "application/json",
        },     
    }
    const  getData = async() =>{
    try{
      setError(null);
      setData(null);
      setLoading(true);
    const res = await axios.get('http://localhost:3002/api/v1/stastics',option)
    setData(res.data)

    }catch(e){
        setError(e);
    }
    setLoading(false);

    };
    useEffect(()=>{
        getData();
    },[]);
    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

	// 아직 users가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
    if (!data) return null;
    const dataList = data.filter(word=>(word.user_no<10));
    return(<table>
        <colgroup>
            <col width="33%"></col>
            <col width="33%"></col>
            <col width="34%"></col>
        </colgroup>
        <thead>
            <tr>
                <th>이름</th>
                <th>이메일<div class="filter2"><span className='filterimg'></span></div></th>
                <th>비고</th>
            </tr>
        </thead>
        <tbody>
           
                   
                    {dataList.map((item) => (
                    <tr key= {item.user_no}>
                   <td>{item.name}</td>
                   <td>{item.email}</td> 
                   <td>{item.address}</td>
                </tr>
                     ))}
                
        </tbody>
    </table>)
}
