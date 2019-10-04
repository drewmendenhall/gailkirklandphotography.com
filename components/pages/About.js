import React from 'react'

import styled from 'styled-components'
import {Helmet} from 'react-helmet-async'

import {
  ClearLeft,
  Container,
  PullLeft,
  pullLeft,
  pullRight,
} from '../styled/layout'

const Image = styled.img`
  margin: 20px;
  width: 50%;
`

const ImagePullLeft = styled(Image)`
  ${pullLeft}
  margin-top: 0;
  margin-left: 0;
`
const ImagePullRight = styled(Image)`
  ${pullRight}
  margin-right: 0;
`

const About = () => (
  <Container>
    <Helmet title="About" />
    <ImagePullLeft src="/images/about_img1.jpg" />
    <p>
      I understand that unique bond between you and your fur kids. For me
      photography is all about capturing "that moment" catching your best friend
      being themselves. I like to capture your four-legged member of the family
      where they are most comfortable and happy: in your home.
    </p>
    <p>
      I use natural light and a casual, loosely posed style that keeps the focus
      on your pet. Clients can choose if they want to be in the photos, or just
      have their pet be the star.
    </p>
    <PullLeft as="p">
      Growing up I loved dogs and horses. I had Breyers and played horse instead
      of Barbies. This love of horses lead to riding lessons and then to showing
      American Saddlebred Horses. My life-long passion of horses and dogs
      continues with my photography.
    </PullLeft>
    <ImagePullRight src="/images/about_img2.jpg" />
    <ClearLeft as="p">
      I invite you to take a look around, get to know me. If you have any
      questions please contact me! Photography sessions available in the
      Dallas/Fort Worth Metroplex.
    </ClearLeft>
  </Container>
)

export default About
