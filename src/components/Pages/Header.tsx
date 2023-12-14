import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import { Header, getHeaders } from "../../query/header";

function Headers(): ReactNode[] | ReactNode{
    const {isPending, isError, data, error} = useQuery({queryKey: ['inventory'],queryFn: getHeaders})

    if (isPending){
        return <h1> Fetching Data... </h1>
    }

    if (isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{error.message}</p>
        </>
    }

    //The Card
    return data.map((i: Header)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}}>
            <Card.Body>
                <Card.Title>
                    <b>HeaderId:</b> {i.inventoryInHeaderId}
                </Card.Title>
                <Card.Text>
                    <p><b>Branch:</b></p>
                    <div>
                        <p><b>BranchId:</b> {i.branch.branchId}</p>
                        <p><b>Name:</b> {i.branch.name}</p>
                    </div>
                    <p><b>DocDate:</b> {i.docDate}</p>
                    <p><b>Reference:</b> {i.reference}</p>
                    <p><b>TotalValue:</b> {i.totalValue}</p>
                    <p><b>Remarks:</b> {i.remarks}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
}

export default Headers;