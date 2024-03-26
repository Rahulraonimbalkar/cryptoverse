
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News } from './components';
import 'antd/dist/reset.css';

const app = () => {
  return (
    <div ClassName = 'app'>
        <div ClassName = 'navbar'>
            <Navbar />
        </div>
        <div ClassName = 'main'>
            <Layout>
                <div className='routes'>
                    <switch>
                        <Route exact path='/'>
                            <Homepage />
                        </Route>
                        <Route exact path='/exchanges'>
                            <Exchanges />
                        </Route>
                        <Route exact path='/cryptocurrencies'>
                            <Cryptocurrencies />
                        </Route>
                        <Route exact path='/crypto/:coinID'>
                            <CryptoDetails />
                        </Route>
                        <Route exact path='/news'>
                            <News />
                        </Route>
                    </switch>
                </div>
            </Layout>
        </div>
        <div ClassName = 'footer' >
            <Typography.Title level={5} style={{color: 'white', textAlign: 'centre'}} >
                Cryptoverse <br />
                All rights reserved
            </Typography.Title>
            <Space>
                <Link to = '/'> Home </Link>
                <Link to = '/exchanges'> Exchanges </Link>
                <Link to = '/news'> News </Link>

            </Space>

        </div>
    </div>
  )
}

export default app
