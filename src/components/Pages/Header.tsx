import { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "react-bootstrap/Card"
import { HeaderEntity, deleteHeader, getHeaders } from "../../query/headerService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

function DeleteModal({show, onYesClick, onNoClick}: {show:boolean, onYesClick ():void, onNoClick ():void}){
    return <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete this object?</p>
        </Modal.Body>

        <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
            <Button variant="primary" onClick={onNoClick}>No</Button>
            <Button variant="danger" onClick={onYesClick}>Yes</Button>
        </Modal.Footer>
    </Modal>
}

// function useModal(){
//     const [show, setShow] = useState(false);
//     const [selectedId, setSelectedId] = useState(-1);

//     return {
//         openModal: () => setShow(true),
//         closeModal: () => setShow(false)
//     }
// }

function Headers(): ReactNode[] | ReactNode{
    //React Query related hooks
    const {isPending, isError, data, error} = useQuery({queryKey: ['header'],queryFn: getHeaders})
    const client = useQueryClient()
    const delHeaderMut = useMutation(
        {mutationFn: deleteHeader,
        onSuccess: () => client.invalidateQueries({queryKey: ['header']}) 
    })

    //manage modal state
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);

    if (isPending){
        return <h1> Fetching Data... </h1>
    }

    if (isError){
        return <>
            <h1> There was some Error </h1>
            <p><b>The error is: </b>{error.message}</p>
        </>
    }


    //The list of Cards
    const Cards = data.map((i: HeaderEntity)=> (
        <Card style={{display: 'inline-block', margin: '0em 0.5em'}}> {/*We must use inline style in this context or else it will be overidden internally*/}
            <Card.Body>
                <Card.Title>
                    <b>HeaderId:</b> {i.inventoryInHeaderId}
                </Card.Title>
                <hr />
                <Card.Text>
                    <p><b>Branch:</b></p>
                    <div>
                        <p><b>BranchId:</b> {i.branch.branchId}</p>
                        <p><b>Name:</b> {i.branch.name}</p>
                    </div>
                    <p><b>DocDate:</b> {i.docDate}</p>
                    <p><b>Reference:</b> {i.reference}</p>
                    <p><b>TotalValue:</b> {i.totalValue}</p>
                    <p><b>Remarks:</b> {i.remarks}</p>
                </Card.Text>
                <hr />
                <div className="button-base">
                    <Button><i className="bi bi-pen-fill"></i></Button> {/*Edit button*/}
                    <Button variant="danger" onClick={()=>{setShow(true); setSelectedId(i.inventoryInHeaderId)}}><i className="bi bi-trash-fill"></i></Button> {/*Delete button*/}
                </div>
            </Card.Body>
        </Card>))

        //The List of Card + the Add button
        return <>
            {Cards}
            <Button className="add-button"><i className="bi bi-plus-lg"></i></Button>
            <DeleteModal 
                show={show} 
                onNoClick={()=>{setShow(false); setSelectedId(-1)}}
                onYesClick={()=>{setShow(false); delHeaderMut.mutateAsync(selectedId); setSelectedId(-1)}}
            
            />
        </>
}

export default Headers;