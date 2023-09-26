import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import  blog1 from "../images/blog1.jpg";
import  blog2 from "../images/blog2.jpg";
import  blog3 from "../images/blog3.jpg";

export default function LogOut() {
  return (
   
    <MDBCarousel showControls className="w-75 mx-auto">
      <MDBCarouselItem 
        className="w-100  d-block" style={{width:"500px",height:'75vh'}}
        itemId={1}
        src={blog1}
        alt="..."
      />
      <MDBCarouselItem
        className="w-100  d-block " style={{width:"500px",height:'75vh'}}
        itemId={2}
        src={blog2}
        alt="..."
      />
      <MDBCarouselItem
        className="w-100  d-block " style={{width:"500px",height:'75vh'}}
        itemId={3}
        src={blog3}
        alt="..."
      />
    </MDBCarousel>
    
  );
}
