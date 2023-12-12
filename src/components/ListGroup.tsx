import { useState } from "react";

interface ListGroupProp {
    title: string;
    list: string[];
    onClick: (item: string) => void;
};

function ListGroup({title,list,onClick}: ListGroupProp){
    const [active, setActive] = useState(-1);

    return <>
        <h1>{title}</h1>
        <ul className="list-group">
            {list.map(
                    (item, index)=>
                        <li onClick={ ()=>{
                            setActive(index);
                            onClick(item)}
                        } key={index} className={"list-group-item" + (active === index ? " active" : "")}>
                            {item}
                        </li>
                )
            }
        </ul>
    </>
}

export default ListGroup;