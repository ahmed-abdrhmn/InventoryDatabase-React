import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import { getHeaders } from "../../../query/headerService";
import { getItems } from "../../../query/itemService";
import { getPackages } from "../../../query/packageService";
import { getInventories, deleteInventory, addInventory, updateInventory, InventoryEntity } from "../../../query/inventoryService";
import Button from 'react-bootstrap/Button';

import useDeleteModal from "./Modals/DeleteModal";
import useAddModal from "./Modals/AddModal";
import useUpdateModal from "./Modals/UpdateModal";

function Inventory(): ReactNode[] | ReactNode{
    //React Query related hooks
    const inventories = useQuery({queryKey: ['inventory'],queryFn: getInventories})
    const headers = useQuery({queryKey:['header'],queryFn: getHeaders})
    const items = useQuery({queryKey:['item'],queryFn: getItems})
    const packages = useQuery({queryKey:['package'],queryFn: getPackages})
    
    const client = useQueryClient()
    const deleteInventoryMut = useMutation(
        {mutationFn: deleteInventory,
        onSuccess: () => client.invalidateQueries({queryKey: ['inventory']}) 
    })

    const addInventoryMut = useMutation(
        {mutationFn: addInventory,
        onSuccess: () => client.invalidateQueries({queryKey: ['inventory']}) 
    })

    const updateInventoryMut = useMutation(
        {mutationFn: updateInventory,
        onSuccess: () => client.invalidateQueries({queryKey: ['inventory']}) 
    })

    //Modals
    const DeleteModal = useDeleteModal();
    const AddModal = useAddModal();
    const UpdateModal = useUpdateModal();

    //Check react query states
    if (inventories.isPending){
        return <h1> Fetching Data... </h1>
    }

    if (inventories.isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{inventories.error.message}</p>
        </>
    }

    //Callback functions for buttons
    async function deleteItem(id: number){
        let del: boolean = await DeleteModal.Open(); //wait until the dialog closes
        if (del) {
            deleteInventoryMut.mutate(id);
        }
    }

    async function addItem(){
        let headerIds: number[] = []
        let itemIds: number[] = []
        let packageIds: number[] = []
        
        if (headers.isSuccess){
            headerIds = headers.data.map(x => x.inventoryInHeaderId);
        }

        if (items.isSuccess){
            itemIds = items.data.map(x => x.itemId);
        }

        if (packages.isSuccess){
            packageIds = packages.data.map(x => x.packageId);
        }
        
        let value = await AddModal.Open({packages: packageIds, items: itemIds, headers: headerIds}); //wait until the dialog closes
        if (value !== false){
            addInventoryMut.mutate(value);
        }
    }

    async function updateItem(id: number){
        let headerIds: number[] = []
        let itemIds: number[] = []
        let packageIds: number[] = []
        
        if (headers.isSuccess){
            headerIds = headers.data.map(x => x.inventoryInHeaderId);
        }

        if (items.isSuccess){
            itemIds = items.data.map(x => x.itemId);
        }

        if (packages.isSuccess){
            packageIds = packages.data.map(x => x.packageId);
        }
        
        let value: any = await UpdateModal.Open(
            {
                packages: packageIds, 
                items: itemIds, 
                headers: headerIds,
                currentData: inventories?.data?.find(x => x.inventoryInDetailId == id)
            }
          ); //wait until the dialog closes
        if (value !== false){
            value.inventoryInDetailId = id; //update function expects this to be set
            updateInventoryMut.mutate(value);
        }
    }

    //The list of Cards
    const Cards = inventories.data.map((i: InventoryEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}} key={i.inventoryInDetailId}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>InventoryId:</b> {i.inventoryInDetailId}
                </Card.Title>
                <hr />
                <Card.Text as={'div'}>
                    <p><b>Header:</b></p>
                    <div> 
                        <p><b>HeaderId:</b> {i.inventoryInHeader.inventoryInHeaderId}</p>
                        <p><b>Branch:</b></p>
                        <div>
                            <p><b>BranchId:</b> {i.inventoryInHeader.branch.branchId}</p>
                            <p><b>Name:</b> {i.inventoryInHeader.branch.name}</p>
                        </div>
                        <p><b>DocDate:</b> {i.inventoryInHeader.docDate}</p>
                        <p><b>Reference:</b> {i.inventoryInHeader.reference}</p>
                        <p><b>TotalValue:</b> {i.inventoryInHeader.totalValue}</p>
                        <p><b>Remarks:</b> {i.inventoryInHeader.remarks}</p>
                    </div>
                    <p><b>Serial:</b> {i.serial}</p>
                    <p><b>Item:</b></p>
                    <div>
                        <p> <b>ItemId:</b> {i.item.itemId}</p>
                        <p> <b>Name:</b> {i.item.name}</p>
                    </div>
                    <p><b>Package:</b></p>
                    <div>
                        <p> <b>PackageId:</b> {i.package.packageId}</p>
                        <p> <b>Name:</b> {i.package.name}</p>
                    </div>
                    <p><b>BatchNumber:</b> {i.batchNumber}</p>
                    <p><b>SerialNumber:</b> {i.serialNumber}</p>
                    <p><b>ExpireDate:</b> {i.expireDate}</p>
                    <p><b>Quantity:</b> {i.quantity}</p>
                    <p><b>ConsumerPrice:</b> {i.consumerPrice}</p>
                    <p><b>TotalValue:</b> {i.totalValue}</p>
                </Card.Text>
                <hr />
                <div className="button-base">
                    <Button variant="primary" onClick={()=>updateItem(i.inventoryInDetailId)}><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>deleteItem(i.inventoryInDetailId)}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
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

export default Inventory;