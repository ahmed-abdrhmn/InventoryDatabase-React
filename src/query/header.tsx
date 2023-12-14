import axios from "axios";

interface Header {
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

// async function getHeaders(): Promise<Header[]>{
//     try{
//         const res = await axios.get('http://localhost:5230/api/header/');
//         return res.data;
//     } catch (e: any){
//         throw e;
//     }
// }

async function getHeaders(): Promise<Header[]>{
    return Array(15).fill({
        inventoryInHeaderId: 1,
        branch: {
            branchId: 2,
            name: "Head Quarters"
        },
        docDate: "2023-12-28",
        reference: "some ref",
        totalValue: 17,
        remarks: "Great!"
    })
}

export { type Header, getHeaders};