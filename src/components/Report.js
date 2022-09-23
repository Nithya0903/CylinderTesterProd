import {  Button, Space, message,Typography, InputNumber,Card,Col,Row,Table } from "antd"
import React,{ useState,useEffect,useRef } from "react";
import { getAllEntries } from "../dbHandler";
import  ReactToPrint  from "react-to-print"
import { PrinterOutlined } from "@ant-design/icons"
import { formatDate, capitalize,permenantExp,tempExpansion,weightlossPercentage, after5 } from "../helper.js";

const ComponentToPrint = React.forwardRef((props, ref) => {
   
return <div className="printCard" ref={ref} style={{ display: "flex", justifyContent: "center" }}>
        <Card  style={{ width:"90%",marginTop: "20px"}}>
            <Row style={{ justifyContent: "center" }}>
            <Typography.Title level={3} style={{ textAlign: "center" }} >
                <b><u>RECORD OF  INSPECTION OF HYDROSTATIC STRETCH TESTING OF CYLINDERS</u></b>
            </Typography.Title>
            
                
            </Row>
            <Row> <br /></Row>
            <Row>
            <Col span={8}>
            <Typography.Paragraph level={4}>        
            DATE OF INSPECTION: { props.data && props.data[0] && props.data[0].Date ? formatDate(new Date(props.data[0].Date)): ""}
                </Typography.Paragraph>     </Col>
                <Col span={8}></Col>
            <Col span={8}>  <Typography.Paragraph level={4}>
                PARTY NAME: {props.data && props.data[0] ? capitalize(props.data[0].PartyName) : ""} </Typography.Paragraph></Col>
            </Row>
            <Row> <br /></Row>
        <Row>

          
             
            <Col span={8}><Typography.Paragraph level={4}>TESTING PRESSURE: {props.data && props.data[0]? props.data[0].TestPrs : ""} 
            </Typography.Paragraph> </Col>
            <Col span={8}>
                <Typography.Paragraph level={4}>
            NO. OF CYLINDERS TESTED: {props.data && props.data[0]?props.data.length : ""}
                </Typography.Paragraph>
            </Col>
            <Col span={8}>
                <Typography.Paragraph level={4}>
                    TYPE OF GAS: {props.data && props.data[0] ? capitalize(props.data[0].gas) : ""}
                </Typography.Paragraph>
            </Col>
                    </Row>
            <Row> <br /></Row>
            <Table bordered className="printtable"
                columns={props.columns}
                dataSource={props.data}
            
            >
            </Table>
        </Card>
    </div>
})



const Report = ()=>{

    const pageStyle = `
@media print {
  .ant-table-pagination.ant-pagination{
      display :none
  }

.ant-card-bordered{
    width: fit-content!important;
}
.ant-table table{
     overflow-x: auto!important;
}
.printCard {
transform: scale(.55);
}
}`

const componentRef = useRef();
const [from,setFrom] = useState(1)
const [to,setTo] = useState(100)
    function onChange(value,type) {
        type==="f"?setFrom(value):setTo(value)
       
    }
 const onButtonClick = ()=>{
     if(from > to)
     message.error("From should be less than to")
     else
     getAllEntries(from, to).then(entries => {
         let modified = entries.map((entry, index) => {
             entry.key = index
             entry.slNo = index + 1
             entry.perm = permenantExp(entry)
             entry.temp = tempExpansion(entry)
             entry.wgtloss = weightlossPercentage(entry)
             entry.pass = "FAILED"
             entry.strech = entry.perm*100/entry.temp
             entry.NxtTstDate = after5(entry.Date)
             if (entry.wgtloss <= 5 && entry.strech <= 10 && entry.perm <= entry.Cylwatercap)
             entry.pass = "PASSED"

             entry.CylCap = parseFloat(entry.CylCap).toFixed(2)
             entry.OrgWg = parseFloat(entry.OrgWg).toFixed(2)
             entry.CrtWg = parseFloat(entry.CrtWg).toFixed(2)
             entry.Cylwatercap = parseFloat(entry.Cylwatercap).toFixed(2)
             entry.wgtloss =entry.wgtloss.toFixed(2)
            //  entry.TestPrs = entry.TestPrs.toFixed(2)
             entry.perm = entry.perm.toFixed(2)
             entry.temp = entry.temp.toFixed(2)
             entry.strech = entry.strech.toFixed(2)
             return entry
         })
     
         setData(modified)
     })
    }
const [data,setData] = useState()
useEffect(()=>{
    getAllEntries(0,101).then(entries => {
        let modified =  entries.map((entry, index) => {
            console.log(entry)
            entry.key = index
            entry.slNo = index+1
            entry.perm = permenantExp(entry)
            entry.temp = tempExpansion(entry)
            entry.wgtloss = weightlossPercentage(entry)
            entry.pass = "FAILED"
            entry.strech = entry.perm * 100 / entry.temp
            entry.NxtTstDate = after5(entry.Date)
            entry.CylCap = parseFloat(entry.CylCap).toFixed(2)
            entry.OrgWg = parseFloat(entry.OrgWg).toFixed(2)
            entry.CrtWg = parseFloat(entry.CrtWg).toFixed(2)
            entry.Cylwatercap = parseFloat(entry.Cylwatercap).toFixed(2)
            entry.wgtloss = entry.wgtloss.toFixed(2)
            // entry.TestPrs = entry.TestPrs.toFixed(2)
            entry.perm = entry.perm.toFixed(2)
            entry.temp = entry.temp.toFixed(2)
            entry.strech = entry.strech.toFixed(2)
            if (entry.wgtloss <= 5 && entry.strech <= 10 && entry.perm <= entry.Cylwatercap)
                entry.pass = "PASSED"
            return entry
        })
    
        setData(modified)
    })
},[])
 
  
    const columns = [
        {
            title: "Sl No.",
            dataIndex: "slNo",
            key: "Sl No",
            align: "center",
        },
        
        {
            title: "Cylinder Number",
            dataIndex: "Cylinder",
            key: "Cylinder Number",
            align: "center",
        },
        // {
        //     title: "Type of gas",
        //     dataIndex: "gas",
        //     key: "gas",
        //     align: "center",
        // },
        {
            title: "Specification/ Year of Manufacture",
            dataIndex: "Spfno",
            key: "Specification",
            align: "center",
        },
        {
            title: "MFR's Cylinder Number",
            dataIndex: "MFR",
            key: "MFR's Cylinder Number",
            align: "center",
        },
        {
            title: "Cylinder Capacity",
            dataIndex: "CylCap",
            key: "Cylinder Capacity",
            align: "center",

        },
        {
            title: "Original Weight Kg",
            dataIndex: "OrgWg",
            key: "id",
            align: "center",

        },
        {
            title: "Current Weight Kg",
            dataIndex: "CrtWg",
            key: "Current Weight",
            align: "center",

        },
        {
            title: "Weigh Loss %",
            dataIndex: "wgtloss",
            key: "id",
            align: "center",

        },
        {
            title: "Water Capacity Ltrs",
            dataIndex: "Cylwatercap",
            key: "Water Capacity ",
            align: "center",

        },
        // {
        //     title: "Test Pressure Kg/ Cm", //edit
        //     dataIndex: "TestPrs",
        //     key: "Test Pressure",
        //     align: "center",

        // },
        {
            title: "Temporary Expansion of water in CC",
            dataIndex: "temp",
            key: "id",
            align: "center",

        },

        {
            title: "Permanent Expansion of water in CC",
            dataIndex: "perm",
            key: "perm",
            align: "center",

        },
        {
            title: "Ratio of Perm to Temp Exp. ", 
            dataIndex: "strech",
            key: "id",
            align: "center",

        },
        {
            title: "Inspection Results",
            dataIndex: "pass",
            key: "id",
            align: "center",

        },
        {
            title: "Next test date",
            dataIndex: "NxtTstDate",
            key: "Next test date",
            align: "center",

        },
    ];

    return <>
       
        <Row>
        <Col span={16}>
            <Space >
        <span> From</span>
            <InputNumber size="small" value={from} onChange={(val)=>{onChange(val,"f")}} />
            <span> To</span>
            <InputNumber size="small" value={to} onChange={(val) => { onChange(val, "t") }}/>
            <Button type="primary" onClick={onButtonClick}>  Generate Report </Button>
            </Space>
            </Col>
        <Col span={8} style={{justifyContent:"flex-end"}}>
            <ReactToPrint
              
                pageStyle={pageStyle}
                    trigger={() => <Button type="primary"  >Print Report <PrinterOutlined /></Button>}
                content={() => componentRef.current}
                    
           />
        </Col>
        
        </Row>
        <ComponentToPrint ref={componentRef} data={data} columns={columns}/>
        


            
    </>
  
}

export default Report
