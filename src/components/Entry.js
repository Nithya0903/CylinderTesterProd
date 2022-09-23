import {Card, Button,Space ,Form, Row,Col,Input,DatePicker,message,Select} from "antd"
import { addEntry,getNewRef } from "../dbHandler";
import {  useState,useEffect } from "react";
const Entry = ()=>{
    const { Option } = Select;
    const [form] = Form.useForm();
   const [ref,setref] = useState()
  
    useEffect(() => {
        getNewRef().then((r) => {
            setref(r)
        })
    }, [])

    const submitHandler =async ()=>{

        form
            .validateFields()
            .then(async (values) => {
                values.date = values.date.format()
             

                let V = Object.values(values)
                V = [ref,...V]
            console.log(V)
                addEntry(V).then(()=>{
                    message.success("Entry " +ref + " Added")
                    getNewRef().then(async (r) => {
                        await setref(r)
                        form.resetFields()
                    }).catch(e=>{
                        console.log("Error",e)
                        throw e
                       
                    })
                }).catch(e=> {throw e})
                
            })
            .catch(e=>{
                console.log(e);
                throw e})
        
    }
    

return <Card style={{marginTop:"20px"}}>

 <Form size="small" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} form={form}  >
    <Row>
    <Col span={12}>

                <Form.Item label="Reference Number">
                    {ref}
                </Form.Item>
            
                <Form.Item name="tubeSize" label="Tube Size" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={[{ required: true,message:"required" }]}>
                    <DatePicker format="DD/MM/YY"/>
                </Form.Item>
                <Form.Item name="party" label="Party Name" rules={[{ required: true ,message: "Required"}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="cylinderNo" label="Cylinder No" rules={[{ required: true, message: "Required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="make" label="Make">
                    <Input />
                </Form.Item>
                <Form.Item name="mfr" label="MFR Cylinder No" >
                    <Input />
                </Form.Item>
                <Form.Item name="specNo" label="Specification No" >
                    <Input />
                </Form.Item>
                
                <Form.Item name="originalWeight" label="Original Weight" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="currWeight" label="Current Weight" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>

    </Col>
    
    <Col span={12}>
                <Form.Item name="waterWeight" label=" Weight With Water" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
     </Form.Item>
                <Form.Item name="testPressure" label="Test Pressure" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
           
                <Form.Item name="C1" label="C1" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="C2" label="C2" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="C3" label="C3" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="cylWaterCapacity" label="Cylinder Water Capacity" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gas" label="Working Gas" rules={[{ required: true, message: "Required"}]}>
                    <Select
                        allowClear
                    >
                      
                            <Option value="Oxygen"> Oxygen</Option>
                            <Option value="Carbon Dioxide"> Carbon Dioxide</Option>
                            <Option value="Argon"> Argon</Option>
                            <Option value="Nitrogen"> Nitrogen</Option>
                            <Option value="Nitrous Oxide">Nitrous Oxide</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="cylinderCapacity" label="Cylinder Capacity" rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                

    </Col>

    </Row>



    </Form> 
    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
     
        <Button key="reset" onClick={()=>form.resetFields()}> Reset</Button>
        <Button key="save" onClick={submitHandler}> Save</Button>
     

</Space>
  

            
        
</Card>
 


}



export default Entry