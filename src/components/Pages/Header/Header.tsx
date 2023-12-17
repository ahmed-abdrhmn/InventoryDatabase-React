import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import { HeaderEntity, addHeader, deleteHeader, getHeaders, updateHeader } from "../../../query/headerService";
import { getBranches } from "../../../query/branchService";
import Button from 'react-bootstrap/Button';

import useDeleteModal from "./Modals/DeleteModal";
import useAddModal from "./Modals/AddModal";
import useUpdateModal from "./Modals/UpdateModal";

function Headers(): ReactNode[] | ReactNode{
    //React Query related hooks
    const headers = useQuery({queryKey: ['header'],queryFn: getHeaders})
    const branches = useQuery({queryKey:['branch'],queryFn: getBranches})
    
    const client = useQueryClient()
    const deleteHeaderMut = useMutation(
        {mutationFn: deleteHeader,
        onSuccess: () => client.invalidateQueries({queryKey: ['header']}) 
    })

    const addHeaderMut = useMutation(
        {mutationFn: addHeader,
        onSuccess: () => client.invalidateQueries({queryKey: ['header']}) 
    })

    const updateHeaderMut = useMutation(
        {mutationFn: updateHeader,
        onSuccess: () => client.invalidateQueries({queryKey: ['header']}) 
    })

    //Modals
    const DeleteModal = useDeleteModal();
    const AddModal = useAddModal();
    const UpdateModal = useUpdateModal();

    //Check react query states
    if (headers.isPending){
        return <h1> Fetching Data... </h1>
    }

    if (headers.isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{headers.error.message}</p>
        </>
    }

    //Callback functions for buttons
    async function deleteItem(id: number){
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            deleteHeaderMut.mutate(id);
        }
    }

    async function addItem(){
        let branchIds: number[] = []
        if (branches.isSuccess){
            branchIds = branches.data.map(x => x.branchId)
        }
        
        let value = await AddModal.Open({branches:branchIds}); //wait until the dialog closes
        if (value !== false){
            addHeaderMut.mutate(value);
        }
    }

    async function updateItem(id: number){
        console.log("update button clicked");
        let branchIds: number[] = []
        if (branches.isSuccess){
            branchIds = branches.data.map(x => x.branchId)
        }
        
        let value: any = await UpdateModal.Open(
            {
                branches:branchIds,
                currentData: headers?.data?.find(x => x.inventoryInHeaderId == id) //I don't think I need to check if headers.data is loaded right?
            }
        ); //wait until the dialog closes
        
        console.log("opened")
        if (value !== false){
            value.inventoryInHeaderId = id; //the update function expects that to be set
            updateHeaderMut.mutate(value);
        }
    }

    //The list of Cards
    const Cards = headers.data.map((i: HeaderEntity)=> (
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
                    <Button variant="primary" onClick={()=>updateItem(i.inventoryInHeaderId)}><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItem(i.inventoryInHeaderId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
                </div>
            </Card.Body>
        </Card>))

        //The List of Card + the Add button
        return <>
            {Cards}
            <Button className="add-button" onClick={()=>addItem()}><i className="bi bi-plus-lg"></i></Button> {/*Add Button*/}
            <DeleteModal.View />
            <AddModal.View />
            <UpdateModal.View />
        </>
}

export default Headers;