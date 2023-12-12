import { ReactNode } from "react";

const times = 8;

function Inventory(): ReactNode[]{
    return new Array(times).fill(<h1>This is the Inventory Page</h1>)
}

export default Inventory;