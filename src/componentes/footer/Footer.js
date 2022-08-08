import React from 'react'
import styled from 'styled-components'
import { getServiceWithoutToken } from '../../library/Service'

const versionApp = require('../../../package.json').version
const FooterComponente = styled.div`
  height: 35px;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0px -1px 1px 1px #1f1f1f;
  background-color: #1f1f1f;
  padding-top: 10px;
  z-index: 1;
`

const Footer = () => {
  const [versionApi, setVersionApi] = React.useState('')
  React.useEffect(() => {
    async function getVersionApp() {
      await getServiceWithoutToken()
        .get('/version')
        .then((response) => {
          setVersionApi(response.data)
        })
    }
    getVersionApp()
  }, [])
  return (
    <FooterComponente>
      <span>App-Version: {versionApp}</span> | <span>Api-Version: {versionApi}</span>
    </FooterComponente>
  )
}

export default Footer
