import React, {useEffect,useState,useRef} from "react";
import styled from "styled-components";

const { kakao } = window;

export default function Map() {
    const [kakaoMap,setKakaoMap] = useState(null);
   
    const options = {
        center: new kakao.maps.Map(36.3267062189531, 127.420924035969),
        level:3,
    };
    const container = useRef(null);
    const initMap = () =>{
      
        
        const map = new kakao.maps.Map(container.current, options);
        map.setZoomable(true);
        //const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
       // const zoomControl = new kakao.maps.ZoomControl()
        //map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
        //marker.setMap(kakaoMap);
    }
    /*let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(36.3267062189531, 127.420924035969),
        clickable: true,
      });*/
     
     
      /*const locationLoadSuccess = pos => {
        const currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude)
        map.panTo(currentPos)
        navigator.geolocation.getCurrentPosition(locationLoadSuccess)
     }
    */
    useEffect ( () =>{
      initMap();
    },[]);
    return(
        <MapContainer id="kakaomap" ref={container}  />
    )
}

const MapContainer = styled.div`
width:100%;
height:100vh;
`