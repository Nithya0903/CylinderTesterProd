import { Form, Row,Select, Col, Input, DatePicker,Space, Button} from "antd"
import { useEffect } from "react"
import { convertMoment } from "../helper"
const FormComponent = (props)=>{
    const { Option } = Select;
    const [formi] = Form.useForm();
    useEffect(() => { formi.resetFields() }, [props.initialValues, formi])
    useEffect(() => { }, [props.initialValues])
    return <>
        <Form size="small" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} form={formi}  >
        <Row>
            <Col span={12}>

                <Form.Item label="Reference Number">
            
                   {props.initialValues.Id}
                </Form.Item>

                    <Form.Item name="tubeSize" label="Tube Size" initialValue={props.initialValues.TubeSize} rules={[{ required: true }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input  />
                </Form.Item>
                    <Form.Item name="date" label="Date" initialValue={convertMoment(props.initialValues.Date)}rules={[{ required: true, message: "Required" }]} >
                    <DatePicker format="DD/MM/YY" />
                </Form.Item>
                    <Form.Item name="party" label="Party Name" initialValue={props.initialValues.PartyName} rules={[{ required: true, message: "Required" }]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="cylinderNo" label="Cylinder No" initialValue={props.initialValues.Cylinder} rules={[{ required: true, message: "Required" }]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="make" label="Make" initialValue={props.initialValues.Make}>
                    <Input />
                </Form.Item>
                    <Form.Item name="mfr" label="MFR Cylinder No" initialValue={props.initialValues.MFR} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="specNo" label="Specification No" initialValue={props.initialValues.Spfno} >
                    <Input />
                </Form.Item>
                  
                    <Form.Item name="originalWeight" label="Original Weight" initialValue={props.initialValues.OrgWg} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="currWeight" label="Current Weight" initialValue={props.initialValues.CrtWg} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>

            </Col>

            <Col span={12}>
                    <Form.Item name="waterWeight" label="With Water Weight" initialValue={props.initialValues.wtrWg} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="testPressure" label="Test Pressure" initialValue={props.initialValues.TestPrs} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                  
                    <Form.Item name="C1" label="C1" initialValue={props.initialValues.C1} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="C2" label="C2" initialValue={props.initialValues.C2} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="C3" label="C3" initialValue={props.initialValues.C3} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                    <Form.Item name="cylWaterCapacity" label="Cylinder Water Capacity" initialValue={props.initialValues.Cylwatercap} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input"}]}>
                    <Input />
                </Form.Item>
                   
                    <Form.Item name="gas" label="Working Gas" initialValue={props.initialValues.gas || ""}  rules={[{ required: true, message: "Required" }]}>
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
                    <Form.Item name="cylinderCapacity" label="Cylinder Capacity" initialValue={props.initialValues.CylCap} rules={[{ required: true, message: "Required" }, { pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$', message: "incorrect input" }]}>
                        <Input />
                    </Form.Item>


            </Col>

        </Row>



    </Form>
      <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>

            <Button key="reset" onClick={() => formi.resetFields()}> Reset</Button>
            <Button key="save" onClick={()=>{props.submitHandler(formi)}}> Save</Button>
            <Button key="delete" onClick={() => { props.DeleteHandler() }} > Delete</Button>

        </Space>
       </>
}


export default FormComponent