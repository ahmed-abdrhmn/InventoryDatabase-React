import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from 'react-bootstrap';

function AddModal({show, data, onExit}: {show:boolean, data:any, onExit: (data: any)=>void}){
    const inventoryInHeaderIdRef: any = useRef(null);
    const serialRef: any = useRef(null);
    const itemIdRef: any = useRef(null);
    const packageIdRef: any = useRef(null);
    const batchNumberRef: any = useRef(null);
    const serialNumberRef: any = useRef(null);
    const expireDateRef: any = useRef(null);
    const quantityRef: any = useRef(null);
    const consumerPriceRef: any = useRef(null);

    function returnData(){
        const data = {
            inventoryInHeaderId: inventoryInHeaderIdRef.current.value,
            serial: serialRef.current.value,
            itemId: itemIdRef.current.value,
            packageId: packageIdRef.current.value,
            batchNumber: batchNumberRef.current.value,
            serialNumber: serialNumberRef.current.value,
            expireDate: expireDateRef.current.value,
            quantity: quantityRef.current.value,
            consumerPrice: consumerPriceRef.current.value 
        }

        onExit(data);
    }

    return <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <FormGroup className="mb-3">
                    <Form.Label>HeaderId</Form.Label>
                    <Form.Select ref={inventoryInHeaderIdRef}>
                        {data.headers.map((x: any) => <option value={x} key={x}>{x}</option>)}
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Serial</Form.Label>
                    <Form.Control type="number" ref={serialRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>ItemId</Form.Label>
                    <Form.Select ref={itemIdRef}>
                        {data.items.map((x: any) => <option value={x} key={x}>{x}</option>)}
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>PackageId</Form.Label>
                    <Form.Select ref={packageIdRef}>
                        {data.packages.map((x: any) => <option value={x} key={x}>{x}</option>)}
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Batch Number</Form.Label>
                    <Form.Control type="text" ref={batchNumberRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type="text" ref={serialNumberRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3" controlId="DATE">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control type="date" ref={expireDateRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" ref={quantityRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Consumer Price</Form.Label>
                    <Form.Control type="number" ref={consumerPriceRef}></Form.Control>
                </FormGroup>
            </Form>
        </Modal.Body>

        <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
            <Button variant="warning" onClick={() => onExit(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => returnData()}>Ok</Button>
        </Modal.Footer>
    </Modal>
}

//I wanted to provide an easier to grasp interface for the delete modal
function useAddModal(){
    const [show, setShow] = useState(false);
    const [data, setData] = useState({headers:[], packages:[], items:[]});
    const [onExit, setOnExit]: any[] = useState();

    function OpenModal(data: any): Promise<boolean>{        
        setShow(true);
        setData(data);

        return new Promise<boolean>((resolve)=>{
            console.log('Promise Began executing')
            setOnExit(()=>(del: boolean)=>{     //Assigning a function that returns a function since set* functions of react treats functions specially
                console.log('OnExit has been done')
                setShow(false);
                resolve(del);
            });
        })
    }

    return {
        View: () => <AddModal show={show} data={data} onExit={onExit}/>, //exported as function so we can use the JSX syntax
        Open: OpenModal
    }
}


export default useAddModal;
