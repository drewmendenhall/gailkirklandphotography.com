import styled, {css} from 'styled-components'

export const clearLeft = css`
  clear: left;
`
export const pullLeft = css`
  float: left;
`
export const pullRight = css`
  float: right;
`
export const stretch = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Container = styled.div`
  max-width: 800px;
  margin: auto;
`
export const ClearLeft = styled.div`
  ${clearLeft}
`
export const PullLeft = styled.div`
  ${pullLeft}
`
export const PullRight = styled.div`
  ${pullRight}
`
