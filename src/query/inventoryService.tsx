import axios from "axios";
import { HeaderEntity } from "./headerService";
import { ItemEntity } from "./itemService";
import { PackageEntity } from "./packageService";

interface InventoryEntity {
    inventoryInDetailId: number,
    inventoryInHeader: HeaderEntity,
    serial: number,
    item: ItemEntity,
    package: PackageEntity,
    batchNumber: string,
    serialNumber: string,
    expireDate: string,
    quantity: number,
    consumerPrice: number,
    totalValue: number
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
        inventoryInHeaderId: e.inventoryInHeaderId,
        serial: e.serial,
        itemId: e.itemId,
        packageId: e.packageId,
        batchNumber: e.batchNumber,
        serialNumber: e.serialNumber,
        expireDate: e.expireDate,
        quantity: e.quantity,
        consumerPrice: e.consumerPrice
    }
    
    try{
        await axios.post('http://localhost:5230/api/inventory/',toSend);
    } catch (e: any){
        throw e;
    }  
}

async function updateInventory(e: any){
    await new Promise(r => setTimeout(r,1000)); //wait for 1 second

    const toSend = {
        inventoryInHeaderId: e.inventoryInHeaderId,
        serial: e.serial,
        itemId: e.itemId,
        packageId: e.packageId,
        batchNumber: e.batchNumber,
        serialNumber: e.serialNumber,
        expireDate: e.expireDate,
        quantity: e.quantity,
        consumerPrice: e.consumerPrice,
        totalValue: e.totalValue 
    }
    
    try{
        await axios.put('http://localhost:5230/api/inventory/' + e.inventoryInDetailId, toSend);
    } catch (e: any){
        throw e;
    } 
}

export { type InventoryEntity, getInventories, getInventoryById, deleteInventory, addInventory, updateInventory};