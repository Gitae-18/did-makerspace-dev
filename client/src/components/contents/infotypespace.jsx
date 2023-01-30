import React,{useCallback,useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router";
import { PreUri,CommonHeader,Method} from "../../CommonCode";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function InfoTypeSpace() {
  const location = useLocation();
  const history = useNavigate();
  const [info,setInfo] = useState([]);
  const no = location.state.no;

  let src,src2;
  let introduce;
  const getspaceInfo = useCallback(async()=>{
    let requri = PreUri + '/space/' + no + '/detail';
    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setInfo(json);
  },[no])
  useEffect(()=>{
    getspaceInfo();
  },[getspaceInfo])
  const onBackpage = () =>{
    history(-1);
  }
    console.log(info)
  const Desc1 = () => {
    return <p className="subtitle">{info.space_info}</p>;
  };
  const DescImage = () => {
    switch(info.space_name)
    {
      case "네트워킹라운지":
        src = "/images/Network1.jpg";
        src2 = "/images/Network2.jpg";
        introduce = "전문랩 이용자 네트워킹 공간";
      break;
      case "메이커 협업 창작 공간" :
        src = "/images/Makerspace1.jpg";
        src2= "/images/Makerspace2.jpg";
        introduce = "전문랩 회원들이 자유롭게 활동 할 수 있는 메이킹 공간";
        break;
       case "목공작업 Section":
        src = "/images/Mokgong1.jpg";
        src2= "/images/Mokgong2.jpg";
        introduce = "메이커 그리고 창업 기업을 위한 목자재 가공 작업 및 구조, 세부 설계 지원,단순 반복 작업 목공에서 4차 산업형 목공을 위한 디자인과 CNC 활용 교육 지원"
        break;
        case "물품보관실":
        src = "/images/moolpoom.jpg";
        src2= "/images/Noimg.png";
        break;
        case "3D프린팅Section1":
        src = "/images/printer1.jpg";
        src2= "/images/Noimg.jpg";
        introduce =`- 분말 형태의 재료를 이용하여 제품을 조형하느 선택적 레이저 소결(SLS : Selective Laser Sintering)방식의 3D프린터실(후처리를 위한 샌드블라스터 장비 운영)\n- 기능성 원형제작, 디자인 검증, 소량 생산 및 교체 파트용 최종 사용 제품 제작 지원\n- 메이커 및 창업기업의 시험 시제품 및 상용 시제품 제작 지원`
        break;
        case "3D프린팅Section2":
        src = "/images/printer2.jpg";
        src2= "/images/Noimg.png";
        introduce =`- 액상의 광경화성 수지를 이용하여 물체를 조형하는 SLA(Stereo Lithography Apparatus)방식의 3D프린터실(세척과 경화를 위한 후가공실 운영`+ "\n" +
        `- 기능성 원형제작, 디자인 검증, 마스터 패턴, 금형 쾌속 툴링, 쥬얼리 공예 제작 지원`+"\n"  +
        `- 메이커 및 창업기업의 시험 시제품 및 상용 시제품 제작 지원`
        break;
      case "미디어 연구실":
        src = "/images/Media1.jpg";
        src2= "/images/Noimg.png";
        introduce ="영상 편집 및 다양한 디자인 툴 활용공간";
        break;
      case "모션캡처 스튜디오":
        src = "/images/Motion1.jpg";
        src2= "/images/Noimg.png";
        introduce ="기업들의 홍보영상 제작 지원 및 모션캡처 스튜디오";
        break;
      case "임베디드 HW/SW Section":
        src = "/images/Imbeded1.jpg";
        src2= "/images/Imbeded2.jpg";
        introduce ="전자회로 HW/SW 제작공간 ";
        break;
      case "후가공 도색부스":
        src = "/images/dosaek.jpg";
        src2= "/images/Noimg.png";
        introduce = `- 3D프린터로 출력한 출력물을 후처리 하는 공간
        - 프린팅한 출력물을 이용자가 원하는 색상으로 도색하는 공간`
        break;
      case "CNC&레이저가공 Section":
        src = "/images/cncrazor.jpg";
        src2= "/images/Noimg.png"; 
        introduce=`- 컴퓨터 제어에 의한 CNC, 밀링, 레이저 커팅 등의 정밀 작업 지원\n
        - 아크릴, 종이, MDF, 금속 등의 가공 지원`
        break;
      default:
        break;
    }
    return (
      <div className="images_wrap">
        <div className="images">
        <div className="image_part1"><img className="img1" src={src} alt="no-image"/></div>
        <div className="image_part2"><img className="img2" src={src2} alt="no-image"/></div>
        </div>
      </div>
    );
  };
  const Desc2 = () => {
    return (
      <dl className="dl_wrap">
        <dt>상세 설명</dt>
        <dd>
          <dl>
            <dt style={{"width":"200px"}}>{info.space_name}</dt>
            <dd style={{"whiteSpace":"pre-wrap"}}>{introduce}</dd>
          </dl>
        </dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <Desc1></Desc1>
        <DescImage></DescImage>
        <Desc2></Desc2>
      </div>
    );
  };
  return (
    <div className="info_type1">
      <div className="info_inner_wrap">
        <TitleType1 title={info.space_name}></TitleType1>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록" onClick={onBackpage}></ButtonType1>
      </div>
    </div>
  );
}
