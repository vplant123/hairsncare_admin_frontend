import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  import { Button } from '@react-email/components';
  
  const baseUrl = `https://api.mountainroots.co.in`;
  // const baseUrl = `http://localhost:3001`;
  
  export const CustomMsg = ({ msg }) => (
    
    <Html>
      <Head />
  
      <Body style={main}>
        {/* {console.log("lmwooeopwe",order)} */}
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Text style={heading}>{msg}</Text>
              </Column>
  
            </Row>
          </Section>
          {/* <Hr style={productPriceLineBottom} /> */}
          {/* <Section>
            <Row>
              <Column align="center" style={block}>
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center',
                  }}
                >
                  Contact Us On{' '}
                  <Link
                    href="https://wa.link/fx1qa0"
                    style={{ display: 'inline' }}
                  >
                    <Img
                      src={`${baseUrl}/static/images/whatapp.png`}
                      style={{
                        cursor: 'pointer',
                      }}
                      width="20"
                      height="20"
                      alt="What app"
                    />
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section> */}
        </Container>
      </Body>
    </Html>
  );
  
  export default CustomMsg;
  

  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: '#ffffff',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  };
  
  const resetText = {
    margin: '0',
    padding: '0',
    lineHeight: 1.4,
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '660px',
    maxWidth: '100%',
  };
  
  const tableCell = { display: 'table-cell' };
  
  const heading = {
    fontSize: '20px',
    fontWeight: '400',
    color: '#000',
  };
  
  const informationTable = {
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    color: 'rgb(51,51,51)',
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: '3px',
    fontSize: '12px',
  };
  
  const informationTableRow = {
    height: '46px',
  };
  
  const informationTableColumn = {
    paddingLeft: '20px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '0px 1px 1px 0px',
    height: '44px',
  };
  
  const informationTableLabel = {
    ...resetText,
    color: 'rgb(102,102,102)',
    fontSize: '10px',
  };
  
  const informationTableValue = {
    fontSize: '12px',
    margin: '0',
    padding: '0',
    lineHeight: 1.4,
  };
  
  const productTitleTable = {
    ...informationTable,
    margin: '30px 0 15px 0',
    height: '24px',
  };
  
  const productsTitle = {
    background: '#fafafa',
    paddingLeft: '10px',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0',
  };
  
  const productIcon = {
    margin: '0 0 0 20px',
    borderRadius: '14px',
    border: '1px solid rgba(128,128,128,0.2)',
  };
  
  const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };
  
  const productPriceTotal = {
    margin: '0',
    color: 'rgb(102,102,102)',
    fontSize: '14px',
    fontWeight: '600',
    padding: '0px 30px 0px 0px',
    textAlign: 'right',
  };
  
  const NormalText = {
    margin: '0',
  };
  
  const productPrice = {
    fontSize: '12px',
    fontWeight: '600',
    margin: '0',
  };
  
  const productPriceLarge = {
    margin: '0px 20px 0px 0px',
    fontSize: '16px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    textAlign: 'right',
  };
  
  const productPriceWrapper = {
    display: 'table-cell',
    padding: '0px 20px 0px 0px',
    width: '100px',
    verticalAlign: 'top',
  };
  
  const productPriceLine = { margin: '30px 0 0 0' };
  
  const productPriceVerticalLine = {
    height: '48px',
    borderLeft: '1px solid',
    borderColor: 'rgb(238,238,238)',
  };
  
  const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };
  
  const productPriceLineBottom = { margin: '0 0 75px 0' };
  
  const block = { display: 'block' };
  
  const footerCopyright = {
    margin: '25px 0 0 0',
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgb(102,102,102)',
  };