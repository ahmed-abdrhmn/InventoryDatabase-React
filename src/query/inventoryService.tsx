import axios from "axios";

interface InventoryEntity {
    inventoryInHeaderId: number,
    branch: {
        branchId: number,
        name: string
    },
    docDate: string,
    reference: string,
    totalValue: number,
    remarks: string
}

async function getInventories(): Promise<InventoryEntity[]>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/inventory/');
        return res.data;
    } catch (e: any){
        throw e;
    }
}

async function getInventoryById(id: number): Promise<InventoryEntity>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/inventory/'+id);
        return res.data;
    } catch (e: any){
        throw e;
    }   
}

async function deleteInventory(id: number): Promise<void>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        await axios.delete('http://localhost:5230/api/inventory/'+id);
    } catch (e: any){
        throw e;
    }   
}

async function addInventory(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    
    const toSend = {
        branchId: e.branchId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.post('http://localhost:5230/api/inventory/',toSend);
    } catch (e: any){
        throw e;
    }  
}

export { type InventoryEntity, getInventories, getInventoryById, deleteInventory, addInventory};