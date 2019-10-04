import {css} from 'styled-components'

export default (textOverflow = 'ellipsis') => css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ${textOverflow};
`
