import React from 'react'
import styled from 'styled-components'

const version = require('../../../package.json').version
const FooterComponente = styled.div`
  height: 30px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
`
const Footer = () => (
  <FooterComponente>
    <span>App-Version: {version}</span> | <span>Api-Version: xxx</span>
  </FooterComponente>
)

export default Footer
