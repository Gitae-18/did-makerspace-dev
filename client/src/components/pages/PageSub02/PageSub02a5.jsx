import React,{useState,useEffect,useCallback,useMemo} from "react";
import TextExtraType1b from "../../contents/TextExtraType1b";
import ButtonType2 from "../../contents/ButtonType2";
import { useLocation,useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useDispatch,useSelector}  from "react-redux";
import { CommonHeader, Method, PreUri ,getRspMsg} from "../../../CommonCode";
import ModalSend from "./ModalSend";
export default function PageSub02a5() {
  const location = useLocation();
  const history = useNavigate();
  const testtype = location.state.name;
  const { token } = useSelector(state => state.user);
  const printsrc = "/images/3DPRINTER_TEST.png"
  const flotersrc = "/images/A0Floter_TEST.png"
  const uvsrc = "/images/uvprinter_TEST.png"
  const xcutsrc = "/images/xcut_TEST.png"
  const type = String(testtype);
  const [questions,setQuestions] = useState([]);
  const [answer,setAnswer] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [testAnswer,setTestAnswer] = useState([]);
  let [count,setCount] = useState(0);
  const [modalOpen,setModalOpen] = useState(false);
  const [testfile,setTestFile] = useState([]);
  const [passflag,setPassflag] = useState('');
  const [totalScore,setTotalScore] = useState(0);
  const [inputs,setInputs] = useState({
    name:'',
    attached:'',
  })
  const [input,setInput] = useState([])

/*   const {name,attached} = inputs;
  const {input1,input2,input3,input4,input5,input6,input7,input8,input9,input10} = input; */
  let array = Object.values(input);
  let countup = 0;
  let score = 0 ;
  let incorrect;
  let pass ;
  const correctAnswer = testfile.map(ele=>ele.answer);
  const answerlist = Object.values(input);
  const onChangeInput = useCallback( async(e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })
    setAnswers(Object.values(input))
   

  },[input]);

  const handleSubmit = (e) =>{
    e.preventDefault();

    
    
    //const isCorrect = answers.every((answer,index)=>answer === correctAnswer[index]);
    
    //return countup, score;
 // }
  }
  const getExam = useCallback(async()=>{
    let examtype; 
    if(testtype.includes("FDM"))
    {
      examtype=2;
    }
    else if(testtype.includes("A0"))
    {
      examtype=1;
    }
    else if(testtype.includes('UV'))
    {
      examtype=3;
    }
    else if(testtype.includes('cut'))
    {
      examtype=4;
    }
    let requri ;
    requri= PreUri + '/exam/examlist?examtype=' + examtype;
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    const json = await response.json();
    setTestFile(json);


    let ansuri;
    ansuri = PreUri + '/exam/bogilist?examtype=' + examtype;
    const res = await fetch(ansuri,{
      method:Method.get,
      headers:CommonHeader,
    })
    const data = await res.json();
    setTestAnswer(data);
  },[testfile,testAnswer])
 
/*   const getPassflag= useCallback(async()=>{
    let requri = PreUri + '/'
  },[])  */

  const onCloseModal = useCallback(async() =>{
    CommonHeader.authorization = token;
    if(passflag==="Y")
    {
    let requri = PreUri + '/userequipmentestpass/testflag?passflag=' + passflag;
    const response = await fetch(requri,{
     method:Method.post,
     headers:CommonHeader,
     body:JSON.stringify({
       type:testtype,
       passflag:passflag,
     })
    })
    if(!response.ok){
     return(alert(getRspMsg(response.status)))
   }
    }
    setModalOpen(false);
  },[token,passflag])
  const onCheckModal = useCallback(async()=>{
    setModalOpen(true);
  },[input])
  
  /* const onSubmit = useCallback(async(e) =>{
    CommonHeader.authorization = token;
   
     
   
  },[token,passflag]) */
  const checkAnswer = useCallback(async() =>{
    for(let i = 0; i<answerlist.length;i++)
    {
  /*     const isCorrect = answerlist.every((answer,index)=>answer === correctAnswer[index]);
      if(isCorrect)
      {
        countup+=1;
        score+=10;
        console.log("정답");
        console.log(countup);
      } */
        if(answerlist[i]===correctAnswer[i])
        {
        countup+=1;
        score+=10;
        console.log("정답");
      }else{
        incorrect+=1;
      }
      
    }
    setTotalScore(score);
    if(countup>=6)
    {
      setPassflag("Y");
      
    }
    else {
      setPassflag("N");
    }
  },[input]);

  const onSendResult = useCallback(async()=>{
    CommonHeader.authorization = token;
    if(passflag==="Y")
    {
    let requri = PreUri + '/userequipmentestpass/testflag?passflag=' + passflag;
    const response = await fetch(requri,{
     method:Method.post,
     headers:CommonHeader,
     body:JSON.stringify({
       type:testtype,
       passflag:passflag,
     })
    })
    if(!response.ok){
     return(alert(getRspMsg(response.status)))
   }
   }
   setModalOpen(false);
   history('/eqreservation/equip');
  },[token,passflag])


  useEffect(()=>{
    getExam();
    checkAnswer();
  },[checkAnswer])
  return (
    <div id="pageSub02a5">
      <TextExtraType1b></TextExtraType1b>
      <div className="image_part">
        <div className="test_inner">온라인 시험</div>
        <h1 style={{"fontSize":"18px","textAlign":"center","marginBottom":"30px"}}> {testtype}</h1>
        {/* <img src={testtype.includes('A0플로터')? flotersrc:testtype.includes('FDM : 3DWOX')? printsrc:testtype.includes('UV 프린터 : 329UV')? uvsrc:testtype.includes('X-cut')? xcutsrc:null} alt="no image"/> */}
        <ExamWrapper>
        <form style={{"padding":"10px 20px"}} onSubmit={handleSubmit}>
          {testfile.map((item,index)=>
          <Quest key={index}>
           Q{index+1}.{item.question_title}
           {item.pic_src!==null?<QuestImg src={item.pic_src} alt="no"/>:<></>}

            {testAnswer.map((answer,index2)=>
              <>
            {answer.question_no%10===item.question_no%10 ? <InnerQuest key={index2}><InnerInput key={answer.question_no} type="radio" name={"bogi"+index%10} value={answer.content} onChange={onChangeInput}></InnerInput>
              <InnerTitle>{answer.content}</InnerTitle></InnerQuest>:<></>}
            </>
            )}
         
          </Quest>
           )}
              <StyledBtn type="submit" onClick={onCheckModal}>제출하기</StyledBtn>
        {modalOpen&&<ModalSend onCloseModal={onCloseModal} onSendResult={onSendResult} score={totalScore} flag={passflag}/>}
        </form>
        </ExamWrapper>
      {/*   <div className="testpage">
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

        </div> */}
        
     
        
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
position:relative;
left:150px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`
const ExamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
  border: 1px solid #000
`;
const InnerTitle = styled.label`
 font-size:12px;
 line-height:10px;
 width:auto;
 line-height:40px;
 display:inline-block;
`
const Quest = styled.h2`
 font-weight:500;
 font-size:16px;
`
const InnerQuest = styled.div`
 position:relative;
 width:auto;
 height:auto;
 padding-top:15px;
 margin-bottom:20px;
`
const InnerInput = styled.input`
position:relative;
top:2px;
width:10px;
height:10px;
margin-left:5px;
`
const QuestImg = styled.img`
width:200px;
height:700px;
position:relative;
padding-top:30px;
`