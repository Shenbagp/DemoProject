import React from "react";
import "./Card.css"

interface Props {
     children:any
     
}

const Card:React.FC<Props> = (props:Props) =>(<div className="card__container card">{props.children}</div>)

export default Card ; 

