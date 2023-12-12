import { ReactNode } from "react";

const times = 8;

function Headers(): ReactNode[]{
    return new Array(times).fill(<h1>This is the Headers Page</h1>)
}

export default Headers;