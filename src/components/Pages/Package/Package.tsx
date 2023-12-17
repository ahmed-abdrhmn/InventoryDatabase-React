import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';

import { getPackages, addPackage, deletePackage, updatePackage, PackageEntity } from "../../../query/packageService";


import useDeleteModal from "./Modals/DeleteModal";
import useAddModal from "./Modals/AddModal";
import useUpdateModal from "./Modals/UpdateModal";

function Package(): ReactNode[] | ReactNode{
    //React Query related hooks
    const packages = useQuery({queryKey:['package'],queryFn: getPackages})
    
    const client = useQueryClient()
    const deletePackageMut = useMutation(
        {mutationFn: deletePackage,
        onSuccess: () => client.invalidateQueries({queryKey: ['package']}) 
    })

    const addPackageMut = useMutation(
        {mutationFn: addPackage,
        onSuccess: () => client.invalidateQueries({queryKey: ['package']}) 
    })

    const updatePackageMut = useMutation(
        {mutationFn: updatePackage,
        onSuccess: () => client.invalidateQueries({queryKey: ['package']}) 
    })

    //Modals
    const DeleteModal = useDeleteModal();
    const AddModal = useAddModal();
    const UpdateModal = useUpdateModal();

    //Check react query states
    if (packages.isPending){
        return <h1> Fetching Data... </h1>
    }

    if (packages.isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{packages.error.message}</p>
        </>
    }

    //Callback functions for buttons
    async function deleteItem(id: number){
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            deletePackageMut.mutate(id);
        }
    }

    async function addItem(){
        let value = await AddModal.Open(); //wait until the dialog closes
        if (value !== false){
            addPackageMut.mutate(value);
        }
    }

    async function updateItem(id: number){
        console.log("update button clicked");        
        
        let value: any = await UpdateModal.Open(
            {
                currentData: packages?.data?.find(x => x.packageId == id) //I don't think I need to check if branch.data is loaded right?
            }
        ); //wait until the dialog closes
        
        console.log("opened")
        if (value !== false){
            value.packageId = id; //the update function expects that to be set
            updatePackageMut.mutate(value);
        }
    }

    //The list of Cards
    const Cards = packages.data.map((i: PackageEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}} key={i.packageId}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>PackageId:</b> {i.packageId}
                </Card.Title>
                <hr />
                <Card.Text as={'div'}>
                    <p><b>Name:</b> {i.name}</p>
                </Card.Text>
                <hr />
                <div className="button-base">
                    <Button variant="primary" onClick={()=>updateItem(i.packageId)}><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItem(i.packageId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
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

export default Package;