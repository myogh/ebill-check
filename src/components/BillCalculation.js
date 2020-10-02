import React, { useState } from 'react'

import styled from 'styled-components'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

const BillCalculation = () => {

    const laborCost = 500
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [validated, setValidated] = useState(false);
    const [clickState, setClickState] = useState(false)

    const handleChange1 = (e) => {
      setValue1(e.target.value)
      setClickState(false)
    }

    const handleChange2 = (e) => {
      setValue2(e.target.value)
      setClickState(false)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      setClickState(!clickState)
    }

    const calculateBill = (v1, v2) =>{
      let unit = v2 - v1
      let price = 0.0

      if (unit <= 30.0){ price = unit*35.0 }
      else if (unit >= 31.0 && unit <=50.0) {price = (30.0*35.0)+(unit-30)*50.0}
      else if (unit >=51.0 && unit <=75.0) {price = (30.0*35.0)+(20.0*50.0)+(unit-50)*70.0}
      else if (unit >=76.0 && unit <=100.0) {price = (30.0*35.0)+(20.0*50.0)+(25.0*70.0)+(unit-75)*90.0}
      else if (unit >= 101.0 && unit <=150.0) {price = (30.0*35.0)+(20.0*50.0)+(25.0*70.0)+(25.0*90.0)+(unit-100)*110.0}
      else if (unit >= 151.0 && unit <=200.0) {price = (30.0*35.0)+(20.0*50.0)+(25.0*70.0)+(25.0*90.0)+(50.0*110.0)+(unit-150)*120.0}
      else if (unit >=201.0) {price = (30.0*35.0)+(20.0*50.0)+(25.0*70.0)+(25.0*90.0)+(50.0*110.0)+(50*120.0)+(unit-200)*125.0}
      
      let orgResult = String(price + laborCost)

      if (price){
        return orgResult.length > 3 ? `${orgResult.slice(0,-3)},${orgResult.slice(-3,)}` : orgResult
      }
      else{
        return '0'
      }
    }

    return (
        <BillS>
            <Container>
              <Heading className='col-xs-12 col-md-6 text-left display-1 mb-4 bg-dark p-2 text-white rounded'>E-Bill Calculator</Heading>

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                      <Col xs='12' md='6'>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label style={{userSelect: 'none'}}>Previous Month's Unit</Form.Label>
                            <Form.Control required onChange={handleChange1} placeholder="Eg.19250" type='number'/>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label style={{userSelect: 'none'}}>Current Unit</Form.Label>
                            <Form.Control required onChange={handleChange2} placeholder="Eg.19360" type='number'/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className='p-2' variant="primary" size="md" type="submit" block>
                            <span className='text-uppercase font-weight-bold'>Calculate</span>
                        </Button>
                      </Col>
                    </Row>            
                    <Container className= {clickState && value1 && value2 ? 'rounded border border-black mt-4 shadow-sm' : 'd-none'} style={{transition: 'display 300ms ease-in'}}>
                      <Row className='justify-content-start'> 
                        <Col className='mt-3 display-5' style={{fontSize: '1.2rem'}}>
                            <div>AMOUNT</div>
                        </Col>
                      </Row>
                      <hr/>
                      <Row className='justify-content-end mt-3 mb-3' style={{fontFamily: 'Montserrat, sans-serif', fontSize: '1.9rem'}}> 
                        <Col xs='auto'>
                            {calculateBill(parseFloat(value1), parseFloat(value2))} MMK
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                  <Row>
                    <Footer>
                      Copyright &#169; {new Date().getFullYear()} <a href='https://twitter.com/aungmcs' target='__blank' >@aungmcs</a> | All rights reserved
                    </Footer>
                  </Row>
            </Container>
        </BillS>
    )
}

const BillS = styled.div`
    background-color: ${props => props.theme.bgColor};
    max-width: 600px;
    min-height: 500px;
    height: 100vh;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0.6rem;
    position: relative;
`
const Heading = styled.h2`
  font-size: 1.6rem;
`
const Footer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  position: absolute;
  width: 95%;
  bottom: 10px;
`

export default BillCalculation