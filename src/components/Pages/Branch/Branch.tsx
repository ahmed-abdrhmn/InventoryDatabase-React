import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';

import { getBranches, addBranch, deleteBranch, updateBranch, BranchEntity } from "../../../query/branchService";

import useDeleteModal from "./Modals/DeleteModal";
import useAddModal from "./Modals/AddModal";
import useUpdateModal from "./Modals/UpdateModal";

function Branch(): ReactNode[] | ReactNode{
    //React Query related hooks
    const branches = useQuery({queryKey:['branch'],queryFn: getBranches})
    
    const client = useQueryClient()
    const deleteBranchMut = useMutation(
        {mutationFn: deleteBranch,
        onSuccess: () => client.invalidateQueries({queryKey: ['branch']}) 
    })

    const addBranchMut = useMutation(
        {mutationFn: addBranch,
        onSuccess: () => client.invalidateQueries({queryKey: ['branch']}) 
    })

    const updateBranchMut = useMutation(
        {mutationFn: updateBranch,
        onSuccess: () => client.invalidateQueries({queryKey: ['branch']}) 
    })

    //Modals
    const DeleteModal = useDeleteModal();
    const AddModal = useAddModal();
    const UpdateModal = useUpdateModal();

    //Check react query states
    if (branches.isPending){
        return <h1> Fetching Data... </h1>
    }

    if (branches.isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{branches.error.message}</p>
        </>
    }

    //Callback functions for buttons
    async function deleteItem(id: number){
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            deleteBranchMut.mutate(id);
        }
    }

    async function addItem(){
        let value = await AddModal.Open(); //wait until the dialog closes
        if (value !== false){
            addBranchMut.mutate(value);
        }
    }

    async function updateItem(id: number){
        console.log("update button clicked");        
        
        let value: any = await UpdateModal.Open(
            {
                currentData: branches?.data?.find(x => x.branchId == id) //I don't think I need to check if branch.data is loaded right?
            }
        ); //wait until the dialog closes
        
        console.log("opened")
        if (value !== false){
            value.branchId = id; //the update function expects that to be set
            updateBranchMut.mutate(value);
        }
    }

    //The list of Cards
    const Cards = branches.data.map((i: BranchEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}} key={i.branchId}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>BranchId:</b> {i.branchId}
                </Card.Title>
                <hr />
                <Card.Text as={'div'}>
                    <p><b>Name:</b> {i.name}</p>
                </Card.Text>
                <hr />
                <div className="button-base">
                    <Button variant="primary" onClick={()=>updateItem(i.branchId)}><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItem(i.branchId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
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

export default Branch;