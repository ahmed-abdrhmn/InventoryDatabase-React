//import axios from "axios";

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

//Initializing Headers
let headers: HeaderEntity[] = [];

for (let i = 0; i < 14; i++){
    headers.push({
        inventoryInHeaderId: i,
        branch: {
            branchId: 1,
            name: 'Western Branch',
        },
        docDate: '2024-11-02',
        reference: 'Big reference',
        totalValue: 15,
        remarks: 'no remarks'
    })
}

// async function getHeaders(): Promise<HeaderEntity[]>{
//     try{
//         const res = await axios.get('http://localhost:5230/api/header/');
//         return res.data;
//     } catch (e: any){
//         throw e;
//     }
// }

async function getHeaders(): Promise<HeaderEntity[]>{
    return headers;
}

async function getHeaderById(id: number){
    return headers.find(x=>x.inventoryInHeaderId == id);
}

async function deleteHeader(id: number){
    headers = headers.filter(x=> x.inventoryInHeaderId !== id);
}

export { type HeaderEntity, getHeaders, getHeaderById, deleteHeader};