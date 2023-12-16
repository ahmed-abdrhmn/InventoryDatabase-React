import axios from "axios";

interface BranchEntity {
    branchId: number,
    name: string
}

async function getBranches(): Promise<BranchEntity[]>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/Branch/');
        return res.data;
    } catch (e: any){
        throw e;
    }
}

async function getBranchById(id: number): Promise<BranchEntity>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/Branch/'+id);
        return res.data;
    } catch (e: any){
        throw e;
    }   
}

async function deleteBranch(id: number): Promise<void>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        await axios.delete('http://localhost:5230/api/Branch/'+id);
    } catch (e: any){
        throw e;
    }   
}

async function addBranch(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    
    const toSend = {
        branchId: e.branchId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.post('http://localhost:5230/api/Branch/',toSend);
    } catch (e: any){
        throw e;
    }  
}

export { type BranchEntity, getBranches, getBranchById, deleteBranch, addBranch};