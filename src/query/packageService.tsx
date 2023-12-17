import axios from "axios";

interface PackageEntity {
    packageId: number,
    name: string
}

async function getPackages(): Promise<PackageEntity[]>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/package/');
        return res.data;
    } catch (e: any){
        throw e;
    }
}

async function getPackageById(id: number): Promise<PackageEntity>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        const res = await axios.get('http://localhost:5230/api/package/'+id);
        return res.data;
    } catch (e: any){
        throw e;
    }   
}

async function deletePackage(id: number): Promise<void>{
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    try{
        await axios.delete('http://localhost:5230/api/package/'+id);
    } catch (e: any){
        throw e;
    }   
}

async function addPackage(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second
    
    const toSend = {
        packageId: e.packageId,
        docDate: e.docDate,
        reference: e.reference,
        remarks: e.remarks    
    }
    
    try{
        await axios.post('http://localhost:5230/api/package/',toSend);
    } catch (e: any){
        throw e;
    }  
}

export { type PackageEntity, getPackages, getPackageById, deletePackage, addPackage};