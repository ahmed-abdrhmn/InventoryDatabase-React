import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FormGroup } from 'react-bootstrap';

function UpdateModal({show, data, onExit}: {show:boolean, data:any, onExit: (data: any)=>void}){
    const nameRef: any = useRef(null);

    function returnData(){
        const data = {
            name: nameRef.current.value,
        }

        onExit(data);
    }

    return <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <FormGroup className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control type="text" ref={nameRef} defaultValue={data.currentData?.name || ''}></Form.Control>
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
function useUpdateModal(){
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
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
        View: () => <UpdateModal show={show} data={data} onExit={onExit}/>, //exported as function so we can use the JSX syntax
        Open: OpenModal
    }
}


export default useUpdateModal;
