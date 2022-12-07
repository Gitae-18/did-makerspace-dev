import React from "react";
import TextExtraType1b from "../../contents/TextExtraType1b";
import ButtonType2 from "../../contents/ButtonType2";
import { useLocation } from "react-router-dom";
export default function PageSub02a5() {
  const location = useLocation();
  const testtype = location.state.name;
  const printsrc = "/images/3DPRINTER_TEST.png"
  const flotersrc = "/images/A0Floter_TEST.png"
  const uvsrc = "/images/uvprinter_TEST.png"
  const xcutsrc = "/images/xcut_TEST.png"
  return (
    <div id="pageSub02a5">
      <TextExtraType1b></TextExtraType1b>
      <div className="image_part">
        <div className="test_inner">온라인 시험</div>
    
        <img src={testtype.includes('A0플로터')?flotersrc:testtype.includes('FDM : 3DWOX')?printsrc:testtype.includes('UV 프린터 : 329UV')?uvsrc:testtype.includes('X-cut')?xcutsrc:null} alt="no image"/>
        <div className="testpage">
          <h2>FDM 3D프린터 답안지</h2>
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
                <td><input/></td>
                <td>2. </td>
                <td><input/></td>
                <td>3. </td>
                <td><input/></td>
                <td>4. </td>
                <td><input/></td>
              </tr>
              <tr>
                <td>5. </td>
                <td><input/></td>
                <td>6. </td>
                <td><input/></td>
                <td>7. </td>
                <td><input/></td>
                <td>8. </td>
                <td><input/></td>
              </tr>
              <tr>
                <td>9. </td>
                <td><input/></td>
                <td>10. </td>
                <td><input/></td>

              </tr>
            </tbody>
          </table>

        </div>
        <ButtonType2 btnName="제출하기"></ButtonType2>
      </div>
    </div>
  );
}
