import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function DeleteModal({show, onExit}: {show:boolean, onExit: (data: boolean)=>void}){
    return <Modal show={show} centered>
        <Modal.Header>
            <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete this branch?</p>
        </Modal.Body>

        <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
            <Button variant="primary" onClick={() => onExit(false)}>No</Button>
            <Button variant="danger" onClick={() => onExit(true)}>Yes</Button>
        </Modal.Footer>
    </Modal>
}

//I wanted to provide an easier to grasp interface for the delete modal
function useDeleteModal(){
    const [show, setShow] = useState(false);
    const [onExit, setOnExit]: any[] = useState();

    function OpenModal(): Promise<boolean>{        
        setShow(true);

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
        View: () => <DeleteModal show={show} onExit={onExit}/>, //exported as function so we can use the JSX syntax
        Open: OpenModal
    }
}


export default useDeleteModal;
