import { Card, Button, Space,Empty, InputNumber, message } from "antd"
import { updateEntry, getEntrybyRef ,getNewRef,deleteEntry} from "../dbHandler";
import { useState } from "react";
import FormComponent from "./Form";
import React from "react";
const ViewEntry = ()=>{
   
    const [ref, setref] = useState(1)
    const [values,setValues] = useState()
    const [currentRef, setCurrentRef] = useState()
   
        getNewRef().then((r) => {
    
            setCurrentRef(r)})
    const handleClick = ()=>{
        
        getEntrybyRef(ref).then((entry)=>{
            setValues(entry)
        })
    }
    const submitHandler = async (formi) => {

        formi 
            .validateFields()
            .then(async (values) => {
               
                let newValues = values
                newValues.Id = ref
                newValues.date = values.date.toDate().toUTCString()
            
                updateEntry(Object.values(values)).then( () => {
                    message.success("Entry updated")
                
                    })
                }).catch((error)=>{
                 
                    message.error("Failed to update entry")})

            
            
    }
    const DeleteHandler = async()=>{
        deleteEntry(ref).then(()=>{
            message.success(" Entry No." + ref + " deleted")
       handleClick()
        })
    }
 
    return <>
    <Space>
           <InputNumber min={1} max={currentRef-1} placeholder="Ref Number" value={ref} onChange={(val)=>{setref(val)}}/> 
            <Button  onClick={handleClick} type="primary"> Load Entry </Button> 

    </Space>
        <Card style={{ marginTop: "20px" }}>
        {values ? <FormComponent submitHandler={submitHandler} DeleteHandler={DeleteHandler} reference={ref} initialValues={values} /> : <Empty description="No entry with this reference number"  /> }
    </Card>
    </>
}

export default ViewEntry