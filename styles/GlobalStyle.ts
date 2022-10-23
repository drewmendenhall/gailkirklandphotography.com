import {createGlobalStyle, css} from 'styled-components'

import {gray, lighterGray} from '../components/styled/colors'
import textOverflow from '../components/styled/text-overflow'

const bodyBackground = `${gray} url(/images/main_bg.png)`
const textColor = lighterGray
const footerBackground = gray
const footerTextColor = '#696969'

export default createGlobalStyle(
  () => css`
    * {
      box-sizing: inherit;
    }
    body {
      box-sizing: border-box;
      margin: 0;
      background: ${bodyBackground};
      color: ${textColor};
    }
    #__next {
      min-height: 100vh;
      display: flex;
      flex-flow: column;
    }
    footer {
      font-size: 0.8rem;
      background: ${footerBackground};
      color: ${footerTextColor};

      a {
        ${textOverflow()};
        display: block;
        padding: 1em;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    a {
      color: ${textColor};
    }

    input,
    textarea {
      border: 1px solid #4e4e4e;
      background: #414141;
      padding: 15px 5px 16px 22px;
      font-family: 'Cabin', sans-serif;
      font-weight: 400;
      color: #8e8e8e;
      font-size: 20px;
      display: block;
      width: 100%;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    button {
      padding: 10px;
      background: #707070;
      color: white;
      border: 0;
    }
    textarea {
      min-height: 5em;
    }
  `,
)
