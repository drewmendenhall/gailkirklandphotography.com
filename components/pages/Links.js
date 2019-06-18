import React from 'react'

import Helmet from 'react-helmet'

const linkSections = [
  {
    title: 'Publications',
    links: [
      {
        title: 'National Horseman',
        url: 'http://www.nationalhorseman.com',
      },
      {
        title: 'Saddle Horse Report',
        url: 'http://www.saddlehorsereport.com',
      },
      {
        title: 'Saddle & Bridle Magazine',
        url: 'https://www.saddleandbridle.com',
      },
      {
        title: 'Plano Profile',
        url: 'http://planoprofile.com',
      },
    ],
  },
  {
    title: 'Websites & Calendars',
    links: [
      {
        title: 'American Saddlebred Horse Association',
        url: 'https://asha.net',
      },
      {
        title: 'North Texas American Saddle Horse Association',
        url: 'http://www.ntasha.org',
      },
      {
        title: 'Mill-Again Stables',
        url: 'http://www.mill-againstables.com',
      },
      {
        title: 'Big D Charity Horse Show',
        url: 'http://www.bigdhorseshow.com/Big-D-Charity-Gala-Photos.html',
      },
      {
        title: 'EQ-Wear',
        url: 'https://www.facebook.com/EQWear/photos_stream',
      },
      {
        title: 'The Greyhound Project calendar',
        url: 'http://www.adopt-a-greyhound.org',
      },
      {
        title: 'NTASHA Calendar',
        url: 'http://www.ntasha.org/CALENDAR.html',
      },
    ],
  },
]

const Links = () => (
  <div>
    <Helmet title="Links" />
    <p>
      <a href="http://www.equinephotographers.org">
        Member of Equine Photographers Network
      </a>
    </p>
    {linkSections.map((section, index) => (
      <section key={index}>
        <h2>{section.title}</h2>
        {section.links.map((link, index) => (
          <p key={index}>
            <a href={link.url}>{link.title}</a>
          </p>
        ))}
      </section>
    ))}
  </div>
)

export default Links
