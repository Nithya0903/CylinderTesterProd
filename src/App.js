import {Layout,Col, Row, Typography,Image } from "antd";
import { Content,Footer} from 'antd/lib/layout/layout';
import { HashRouter, Route, Routes} from 'react-router-dom';
import Entry from "./components/Entry"
import NavBar from "./components/NavBar";
import Report from "./components/Report";
import ViewEntry from "./components/ViewEntry";
import logo from "./assets/logo.png"
import './App.css';

function App() {

  return (

    <HashRouter>
        <Layout>
        <Row style={{ justifyContent: 'center' }}>
          <Typography.Title level={4} style={{ textAlign: "center" }} >
            CYLINDER TESTING
          </Typography.Title>
        </Row>
        <Row>
          <Col span={24}>
            <NavBar />
          </Col>


        </Row>
        <Content className="site-layout">
          <div className="site-layout-background" style={{ minHeight: 480 }}>
            <Routes>       
              <Route path="/ViewEntry"
                element={<ViewEntry />} 
              />
              <Route path="/Report"
      element={<Report />}
              />
              <Route exact path="/"
               element={<Entry />}
              />
              </Routes>
      
             
        
     </div>

        </Content>
        <Footer >
          <Row style={{ dispaly: 'flex', justifyContent: 'center' }} >
            <Image preview={false}
              width={100}
              src={logo}
            />
        </Row>
    
         
        </Footer>
        
 </Layout>
    </HashRouter>
  );
}

export default App;
