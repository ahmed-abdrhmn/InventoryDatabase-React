import { ReactNode } from "react";

const times = 8;

function Branch(): ReactNode[]{
    return new Array(times).fill(<h1>This is the Branch Page</h1>)
}

export default Branch;