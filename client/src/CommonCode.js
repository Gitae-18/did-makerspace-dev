export const CommonHeader = {
  "Content-type": "application/json; charset=UTF-8"
}
export const PreUri = process.env.REACT_APP_API_URL;
//export const PreUri = 'http://52.79.61.172:4000/api/v1';
export const Method = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE'
}

export const AuthLevel = {
    user : 1,
    partner : 10,
    scheduler : 50,
    manager : 70,
    superAdmin : 90,
    system : 100
};

export const StatusCode = {
  'URD' : '대기',
  '_RD' : '확인',
  'RUN' : '진행중',
  'CXL' : '이용자 취소',
  'REJ' : '반려',
  'RES' : '응답',
  'DRP' : '이용자 종료',
  'EVA' : '산정평가',
  'END' : '종료',
}

export const ProgressCode = {
  'STEP_01' : '상담 신청',
  'STEP_02' : '서비스 신청',
  'STEP_03' : '서비스 진행',
  'STEP_04' : '서비스 완료',
}

export function ConvertRegNumber(str) {
  return str.replace(/([0-9]{3})([0-9]+)([0-9]{5})/,"$1-$2-$3");
}

export function ConvertDate(str) {
  return str.substr(0, 19).replace('T', ' ');
}

export function ConvertDate2(str) {
  return str.substr(0, 19).replace('T', '\n');
}

export function getFormatDate(date) {
  let year = date.getFullYear();              //yyyy
  let month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  let day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

export function ConvertPhoneNumber(str) {
  return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");

  // var number = obj.replace(/[^0-9]/g, "");
  // var tel = "";

  // // 서울이라는 변수를 선언
  // var seoul = 0;

  // // 서울 지역번호(02)가 들어가는 경우 1을 삽입
  // if (number.substring(0, 2).indexOf('02') == 0) {
  //   seoul = 1;
  // }

  // // 문자열을 자르는 기준에서 서울의 값을 뺄쌤(-)한다.
  // // 값이 1일경우 -1이 될것이고, 값이 0일경우 변화가 없다.
  // if (number.length < (seoul - 4)) {
  //   return number;
  // } else if (number.length < (seoul - 7)) {
  //   tel += number.substr(0, (seoul - 3));
  //   tel += "-";
  //   tel += number.substr(seoul - 3);
  // } else if (number.length < (seoul - 11)) {
  //   tel += number.substr(0, (seoul - 3));
  //   tel += "-";
  //   tel += number.substr((seoul - 3), 3);
  //   tel += "-";
  //   tel += number.substr(seoul - 6);
  // } else {
  //   tel += number.substr(0, (seoul - 3));
  //   tel += "-";
  //   tel += number.substr((seoul - 3), 4);
  //   tel += "-";
  //   tel += number.substr(seoul - 7);
  // }

  // return tel;
}

export function getRspMsg(code) {
  let msg;
  switch (code) {
    case 400: msg = '잘못 된 명령입니다.'; break;
    case 401: msg = '인증되지 않은 사용자 입니다.'; break;
    case 406: msg = '권한이 없습니다.'; break;
    case 404: msg = '페이지를 찾을 수 없습니다.';break;
    case 500: msg = '서버에 문제가 발생하였습니다.';break;
    default: msg = '알 수 없는 에러'; break;
  }

  return msg;
}

export const MaxFileCount = 5;
export const MB = 5;
export const LIMIT = MB * 1024 * 1024;
export const PageMax = 10;
export const pageNext = 9;
export const pagePrev = 1;
