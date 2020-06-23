import * as React from "react";
import "./style.css";
import MaintainPng from "./maintain.png";
import { Typography } from "@weconnect/tars-widgets" ;

export default function UnderConstruction() {
  return (
    <div className="under-construction-page">
      <Typography.Title type={"secondary"}>Coming Soon</Typography.Title>
      <img src={MaintainPng} />
    </div>  
  )
}