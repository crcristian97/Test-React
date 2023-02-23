import React, { useState, useEffect } from 'react';
import './Main.css';
import { Card, Row, Col } from 'react-bootstrap';

function Main() {
    const apiNames = [
        "accounts",
        "assets",
        "customers",
        "datapoints",
        "devices",
        "documents",
        "forms",
        "invites",
        "media",
        "messages",
        "namespaces",
        "orders",
        "patients",
        "relationships",
        "rules",
        "templates",
        "users",
        "workflows",
      ];
    
    const [apiStatuses, setApiStatuses] = useState({});

      //Call Api
    const fetchApiStatuses = async () => {
        const newApiStatuses = {};
        for (const apiName of apiNames) {
          const url = `https://api.factoryfour.com/${apiName}/health/status`;
          
          try {
            const response = await fetch(url);
            const data = await response.json();
            
            //Transform the time
            const formattedTime = new Date(data.time).toLocaleTimeString("en-US", {
                hour12: false,
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
              });
              data.time = formattedTime;

            newApiStatuses[apiName] = data;
          } catch (error) {
            console.error(`Error fetching ${apiName} status: ${error}`);
          }
        }
        setApiStatuses(newApiStatuses);
      };


      //Here we can change the call API 15sec ---> x time
    useEffect(() => {
        fetchApiStatuses();
        const intervalId = setInterval(fetchApiStatuses, 15000);
        return () => clearInterval(intervalId);
      }, []);

      return (
        <Card>
            <Card.Header>API Status</Card.Header>
            <Card.Body>
            <Row>
                {apiNames.map((apiName) => (
                <Col key={apiName} sm={2}>
                    <Card style={{ margin: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', height: '250px' }}>
                    <Card.Header>{apiName.toUpperCase()}</Card.Header>
                    <Card.Body>
                        <p style={{ color: apiStatuses[apiName]?.message ? 'green' : 'red' }}>
                        {apiStatuses[apiName]?.message ?? "Error"}
                        </p>
                        <p style={{ color: apiStatuses[apiName]?.hostname ? 'green' : 'red' }}>
                        {apiStatuses[apiName]?.hostname ?? "OUTAGE"}
                        </p>
                        <p style={{ color: apiStatuses[apiName]?.time ? 'green' : 'red' }}>
                        {apiStatuses[apiName]?.time ?? "403 forbidden"}
                        </p>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            </Card.Body>
        </Card>    
    );
  }
  
  export default Main;
  