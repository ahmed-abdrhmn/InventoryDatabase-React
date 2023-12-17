import axios from "axios";

interface ItemEntity {
    itemId: number,
    name: string
}

async function getItems(): Promise<ItemEntity[]>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/item/');
        return res.data;
    } catch (e: any){
        throw e;
    }
}

async function getItemById(id: number): Promise<ItemEntity>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/item/'+id);
        return res.data;
    } catch (e: any){
        throw e;
    }   
}

async function deleteItem(id: number): Promise<void>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        await axios.delete('http://localhost:5230/api/item/'+id);
    } catch (e: any){
        throw e;
    }   
}

async function addItem(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    
    const toSend = {
        itemId: e.itemId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.post('http://localhost:5230/api/item/',toSend);
    } catch (e: any){
        throw e;
    }  
}

export { type ItemEntity, getItems, getItemById, deleteItem, addItem};