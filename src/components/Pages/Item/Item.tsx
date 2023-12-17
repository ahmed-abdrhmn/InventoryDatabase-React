import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';

import { getItems, addItem, deleteItem, updateItem, ItemEntity } from "../../../query/itemService";


import useDeleteModal from "./Modals/DeleteModal";
import useAddModal from "./Modals/AddModal";
import useUpdateModal from "./Modals/UpdateModal";

function Item(): ReactNode[] | ReactNode{
    //React Query related hooks
    const items = useQuery({queryKey:['item'],queryFn: getItems})
    
    const client = useQueryClient()
    const deleteItemMut = useMutation(
        {mutationFn: deleteItem,
        onSuccess: () => client.invalidateQueries({queryKey: ['item']}) 
    })

    const addItemMut = useMutation(
        {mutationFn: addItem,
        onSuccess: () => client.invalidateQueries({queryKey: ['item']}) 
    })

    const updateItemMut = useMutation(
        {mutationFn: updateItem,
        onSuccess: () => client.invalidateQueries({queryKey: ['item']}) 
    })

    //Modals
    const DeleteModal = useDeleteModal();
    const AddModal = useAddModal();
    const UpdateModal = useUpdateModal();

    //Check react query states
    if (items.isPending){
        return <h1> Fetching Data... </h1>
    }

    if (items.isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{items.error.message}</p>
        </>
    }

    //Callback functions for buttons
    async function deleteItemRecord(id: number){ //Here I had to change the name since "Item" here overlaps with the Item Entity.
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            deleteItemMut.mutate(id);
        }
    }

    async function addItemRecord(){
        let value: any = await AddModal.Open(); //wait until the dialog closes
        if (value !== false){
            addItemMut.mutate(value);
        }
    }

    async function updateItemRecord(id: number){
        console.log("update button clicked");        
        
        let value: any = await UpdateModal.Open(
            {
                currentData: items?.data?.find(x => x.itemId == id) //I don't think I need to check if branch.data is loaded right?
            }
        ); //wait until the dialog closes
        
        console.log("opened")
        if (value !== false){
            value.itemId = id; //the update function expects that to be set
            updateItemMut.mutate(value);
        }
    }

    //The list of Cards
    const Cards = items.data.map((i: ItemEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}} key={i.itemId}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>ItemId:</b> {i.itemId}
                </Card.Title>
                <hr />
                <Card.Text as={'div'}>
                    <p><b>Name:</b> {i.name}</p>
                </Card.Text>
                <hr />
                <div className="button-base">
                    <Button variant="primary" onClick={()=>updateItemRecord(i.itemId)}><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItemRecord(i.itemId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
                </div>
            </Card.Body>
        </Card>))

        //The List of Card + the Add button
        return <>
            {Cards}
            <Button className="add-button" onClick={()=>addItemRecord()}><i className="bi bi-plus-lg"></i></Button> {/*Add Button*/}
            <DeleteModal.View />
            <AddModal.View />
            <UpdateModal.View />
        </>
}

export default Item;