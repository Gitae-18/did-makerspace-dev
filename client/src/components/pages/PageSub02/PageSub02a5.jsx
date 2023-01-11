import React,{useState,useEffect,useCallback,useMemo} from "react";
import TextExtraType1b from "../../contents/TextExtraType1b";
import ButtonType2 from "../../contents/ButtonType2";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {useDispatch,useSelector}  from "react-redux";
import { CommonHeader, Method, PreUri ,getRspMsg} from "../../../CommonCode";
import ModalSend from "./ModalSend";
export default function PageSub02a5() {
  const location = useLocation();
  const testtype = location.state.name;
  const { token } = useSelector(state => state.user);
  const printsrc = "/images/3DPRINTER_TEST.png"
  const flotersrc = "/images/A0Floter_TEST.png"
  const uvsrc = "/images/uvprinter_TEST.png"
  const xcutsrc = "/images/xcut_TEST.png"
  const type = String(testtype);
  const [answer,setAnswer] = useState([]);
  const printerAnswer = [2,1,3,5,5,4,1,1,4,1] 
  const printerAnswer2 =  [2,1,3,5,5,4,4,1,4,4] 
  const xcutAnswer = [3,4,4,2,1,3,5,1,4,1] 
  const xcutAnswer2 =  [3,4,4,2,2,3,5,1,4,4]
  const uvprinterAnswer = [3,1,2,1,4,3,4,4,5,1]
  const a0ploterAnswer = [5,2,2,3,5,3,3,1,1,1] 
  const a0ploterAnswer2 = [5,4,2,3,5,4,3,1,2,5]
  const [count,setCount] = useState(0);
  const [modalOpen,setModalOpen] = useState(false);
  const [passflag,setPassflag] = useState('');
  const [inputs,setInputs] = useState({
    name:'',
    attached:'',
  })
  const [input,setInput] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
    input9: '',
    input10: '',
  })

  const {name,attached} = inputs;
  const {input1,input2,input3,input4,input5,input6,input7,input8,input9,input10} = input;

  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })
  }

 
/*   const getPassflag= useCallback(async()=>{
    let requri = PreUri + '/'
  },[])  */
  let counter = 0 ;
 
  const CheckAnswer = useCallback(async() =>{
    if(testtype==="FDM : 3DWOX 1X"){
    for(let i = 1 ; i< printerAnswer.length ; i++){
      if(printerAnswer[i] === parseInt(answer[i]) || printerAnswer2[i] === parseInt(answer[i]))
      {
        setCount(count=>count + 1)
       counter++;
       console.log("정답 +1")
      }
    }
  }
  if(testtype==="A0플로터 : HP 디자인젯 Z6"){
    for(let i = 0 ; i< a0ploterAnswer.length ; i++){
      if(a0ploterAnswer[i] === parseInt(answer[i]) || a0ploterAnswer2[i] === parseInt(answer[i]))
      {
      setCount(count=>count + 1)
       counter++;
       console.log("정답 +1")
      }
   /*    else if(typeof(a0ploterAnswer[i])==="object"){
        const abc = Object.values(a0ploterAnswer[i])
        if(abc.includes(answer[i])){
          counter+=1;
          console.log("정답 + 1")
        }
      } */
    }
    
  }
  if(testtype==="X-cut"){
    for(let i = 0 ; i< xcutAnswer.length ; i++){
      if(xcutAnswer[i] === parseInt(answer[i]) || xcutAnswer2[i] === parseInt(answer[i]))
      {
        setCount(count=>count + 1)
       counter++;
       console.log("정답 +1")
      }
    }
  }
  if(testtype==="UV 프린터 : 329UV"){
    for(let i = 0 ; i< uvprinterAnswer.length ; i++){
      if(uvprinterAnswer[i] === parseInt(answer[i]))
      {
        setCount(count=>count + 1)
       counter++;
       console.log("정답 +1")
      }
    }
  }
  if(counter>5||count>5){
    setPassflag('Y');  
  }
  else{
    setPassflag('N');
  }
  console.log(passflag)
  },[answer])
  
  
  const onCloseModal = () =>{
    setModalOpen(false);
  }
  const onCheckModal = useCallback(async()=>{
    setModalOpen(true);
    setAnswer(Object.values(input));
    CheckAnswer(counter);
  },[input,count])
  
  /* const onSubmit = useCallback(async(e) =>{
    CommonHeader.authorization = token;
   
     
   
  },[token,passflag]) */

  const onSendResult = useCallback(async()=>{
    CommonHeader.authorization = token;
    let requri = PreUri + '/userequipmentestpass/testflag?passflag=' + passflag;
    const response = await fetch(requri,{
     method:Method.post,
     headers:CommonHeader,
     body:JSON.stringify({
       type:testtype,
       passflag:passflag
     })
    })
    if(!response.ok){
     return(alert(getRspMsg(response.status)))
   }
   setModalOpen(false);
  },[token,passflag])

  useEffect(()=>{
    CheckAnswer();
  },[CheckAnswer])
  return (
    <div id="pageSub02a5">
      <TextExtraType1b></TextExtraType1b>
      <div className="image_part">
        <div className="test_inner">온라인 시험</div>
    
        <img src={testtype.includes('A0플로터')? flotersrc:testtype.includes('FDM : 3DWOX')? printsrc:testtype.includes('UV 프린터 : 329UV')? uvsrc:testtype.includes('X-cut')? xcutsrc:null} alt="no image"/>
        <div className="testpage">
          <h2>{testtype}&nbsp;시험 답안지</h2>
          <table className="test_3d">
            <tbody>
              <tr>
              <td className="name"> <span>이름 :</span> </td>
              <td><input style={{"width":"155px"}} /></td>
              <td className="part"><span>소속 :</span> </td>
              <td><input /></td>
              </tr>
              <tr>
                <td>1. </td>
                <td><input type="text" name="input1" value={input1} onChange={onChangeInput}/></td>
                <td>2. </td>
                <td><input type="text" name="input2" value={input2} onChange={onChangeInput}/></td>
                <td>3. </td>
                <td><input type="text" name="input3" value={input3} onChange={onChangeInput}/></td>
                <td>4. </td>
                <td><input type="text" name="input4" value={input4} onChange={onChangeInput}/></td>
              </tr>
              <tr>
                <td>5. </td>
                <td><input type="text" name="input5" value={input5} onChange={onChangeInput}/></td>
                <td>6. </td>
                <td><input type="text" name="input6" value={input6} onChange={onChangeInput}/></td>
                <td>7. </td>
                <td><input type="text" name="input7" value={input7} onChange={onChangeInput}/></td>
                <td>8. </td>
                <td><input type="text" name="input8" value={input8} onChange={onChangeInput}/></td>
              </tr>
              <tr>
                <td>9. </td>
                <td><input type="text" name="input9" value={input9} onChange={onChangeInput}/></td>
                <td>10. </td>
                <td><input type="text" name="input10" value={input10} onChange={onChangeInput}/></td>

              </tr>
            </tbody>
          </table>

        </div>
        
        <StyledBtn onClick={onCheckModal}>제출하기</StyledBtn>
        {modalOpen&&<ModalSend onCloseModal={onCloseModal} onSendResult={onSendResult}/>}
        
      </div>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`