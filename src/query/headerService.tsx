import axios from "axios";

interface HeaderEntity {
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

async function getHeaders(): Promise<HeaderEntity[]>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/header/');
        return res.data;
    } catch (e: any){
        throw e;
    }
}

async function getHeaderById(id: number): Promise<HeaderEntity>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/header/'+id);
        return res.data;
    } catch (e: any){
        throw e;
    }   
}

async function deleteHeader(id: number): Promise<void>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        await axios.delete('http://localhost:5230/api/header/'+id);
    } catch (e: any){
        throw e;
    }   
}

async function addHeader(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    
    const toSend = {
        branchId: e.branchId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.post('http://localhost:5230/api/header/',toSend);
    } catch (e: any){
        throw e;
    }  
}

async function updateHeader(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second

    const toSend = {
        branchId: e.branchId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.put('http://localhost:5230/api/header/' + e.inventoryInHeaderId, toSend);
    } catch (e: any){
        throw e;
    } 
}

export { type HeaderEntity, getHeaders, getHeaderById, deleteHeader, addHeader, updateHeader};