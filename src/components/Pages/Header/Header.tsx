import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import { HeaderEntity, deleteHeader, getHeaders } from "../../../query/headerService";
import Button from 'react-bootstrap/Button';
import useDeleteModal from "./Modals/DeleteModal";

function Headers(): ReactNode[] | ReactNode{
    //React Query related hooks
    const {isPending, isError, data, error} = useQuery({queryKey: ['header'],queryFn: getHeaders})
    const client = useQueryClient()
    const delHeaderMut = useMutation(
        {mutationFn: deleteHeader,
        onSuccess: () => client.invalidateQueries({queryKey: ['header']}) 
    })

    //Delete Modal
    const DeleteModal = useDeleteModal();

    //Check react query states
    if (isPending){
        return <h1> Fetching Data... </h1>
    }

    if (isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{error.message}</p>
        </>
    }

    async function deleteItem(id: number){
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            delHeaderMut.mutate(id);
        }
    }

    //The list of Cards
    const Cards = data.map((i: HeaderEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}} key={i.inventoryInHeaderId}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>HeaderId:</b> {i.inventoryInHeaderId}
                </Card.Title>
                <hr />
                <Card.Text as={'div'}>
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
                <hr />
                <div className="button-base">
                    <Button><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItem(i.inventoryInHeaderId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
                </div>
            </Card.Body>
        </Card>))

        //The List of Card + the Add button
        return <>
            {Cards}
            <Button className="add-button"><i className="bi bi-plus-lg"></i></Button>
            <DeleteModal.View />
        </>
}

export default Headers;