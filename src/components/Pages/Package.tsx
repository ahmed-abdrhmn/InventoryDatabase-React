import { ReactNode } from "react";

const times = 8;

function Package(): ReactNode[]{
    return new Array(times).fill(<h1 key={Math.random()}>This is the Package Page</h1>)
}

export default Package;