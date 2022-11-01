import { map } from "jquery";
import React, {useEffect,useState,useRef} from "react";
import styled from "styled-components";

const  Map = () =>{
    const [kakaoMap,setKakaoMap] = useState(null);
    const mapContainer = useRef(null);
    const { kakao } = window;
    const position = new kakao.maps.LatLng(36.3267062189531, 127.420924035969);
    const mapOptions = {
        center: position,
        level:3,
    }
    let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(36.3267062189531, 127.420924035969),
        clickable: true,
    })
    const mapInit = () =>{
        const map = new kakao.maps.Map(mapContainer.current,mapOptions);
        const zoomControl = new kakao.maps.ZoomControl()
        setKakaoMap(map);
        map.setZoomable(true);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
       
    }
    marker.setMap(kakaoMap)
    useEffect(()=>{
        mapInit();
    },[])
    return(
        <MapContainer id = "map" ref={mapContainer}/>
    )
}
export default Map;
const MapContainer = styled.div`
width:100%;
height:100vh;
`