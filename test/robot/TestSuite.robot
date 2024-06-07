*** Settings ***
Library               RequestsLibrary
Library               Collections

*** Variables ***

${base_url}    http://host.docker.internal:3000
${accessToken}    "none"

*** Test Cases ***

BearerAuthTest
  create session     mysession     ${base_url}
  ${headers}    create dictionary  Content-Type=application/json
  ${resp}    POST On Session       mysession    /auth/login
  ...   data={"email": "john.doe@domain.com", "password": "password"}
  ...   headers=${ headers }
  ${token}        Get From Dictionary     ${ resp.json() }     accessToken
  Set Global Variable    ${accessToken}    Bearer ${token}
  Delete All Sessions


AppGetTest
  create session     mysession     ${base_url}
  ${headers}    create dictionary  Content-Type=application/json    Authorization=${accessToken}
  ${resp}    GET On Session        mysession    /     headers=${ headers }
  Delete All Sessions