import React from 'react'
import styled from 'styled-components'
import { getServiceWithoutToken } from '../../library/Service'

const versionApp = require('../../../package.json').version
const FooterComponente = styled.div`
  height: 30px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
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
