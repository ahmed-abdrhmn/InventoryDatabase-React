import { ReactNode } from "react";

const times = 8;

function Item(): ReactNode[]{
    return new Array(times).fill(<h1 key={Math.random()}>This is the Item Page</h1>)
}

export default Item;