
import React from 'react';
import millify from 'millify';
import { Typograph, Row, Col, Statistic, Typography } from 'antd';
import { Link } from 'react-router-dom';


const [ Title ] = Typography;

const Homepage = () => {
  return (
    <>
      <Title level={2} className = 'heading'>GLOBAL CRYPTO STATS</Title>
      <Row>
        <Col span={12}><Statistic title = "Total Cryptocurrencies" value='5' /></Col>
        <Col span={12}><Statistic title = "Total Exchanges" value='5' /></Col>
        <Col span={12}><Statistic title = "Total Market cap" value='5' /></Col>
        <Col span={12}><Statistic title = "Total 24 Volume" value='5' /></Col>
        <Col span={12}><Statistic title = "Total Markets" value='5' /></Col>
      </Row>
    </>
  )
}

export default Homepage
