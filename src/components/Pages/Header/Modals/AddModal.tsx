import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from 'react-bootstrap';

function AddModal({show, data, onExit}: {show:boolean, data:any, onExit: (data: any)=>void}){
    const branchIdRef: any = useRef(null);
    const docDateRef: any = useRef(null);
    const referenceRef: any = useRef(null);
    const remarksRef: any = useRef(null);

    function returnData(){
        const data = {
            branchId: branchIdRef.current.value,
            docDate: docDateRef.current.value,
            reference: referenceRef.current.value,
            remarks: remarksRef.current.value
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
                    <Form.Label>BranchId</Form.Label>
                    <Form.Select ref={branchIdRef}>
                        {data.branches.map((x: any) => <option value={x}>{x}</option>)}
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3" controlId="DATE">
                    <Form.Label>DocDate</Form.Label>
                    <Form.Control type="date" ref={docDateRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Reference</Form.Label>
                    <Form.Control type="text" ref={referenceRef}></Form.Control>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control type="text" ref={remarksRef}></Form.Control>
                </FormGroup>
            </Form>
        </Modal.Body>

        <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
            <Button variant="primary" onClick={() => returnData()}>Ok</Button>
            <Button variant="warning" onClick={() => onExit(false)}>Cancel</Button>
        </Modal.Footer>
    </Modal>
}

//I wanted to provide an easier to grasp interface for the delete modal
function useAddModal(){
    const [show, setShow] = useState(false);
    const [data, setData] = useState({branches:[]});
    const [onExit, setOnExit]: any[] = useState();

    function OpenModal(data: any): Promise<boolean>{        
        setShow(true);
        setData(data);

        return new Promise<boolean>((resolve)=>{
            console.log('Promise Began executing')
            setOnExit(()=>(del: boolean)=>{     //Assigning a function that returns a function since set* functions of react treats functions specially
                console.log('OnExit has been done')
                console.log(del)
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
