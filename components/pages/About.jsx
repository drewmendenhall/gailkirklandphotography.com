import React from 'react'

// import '../styles/about'

export default class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <img className="about-picture pull-left" src="/images/about_img1.jpg" />
        <p>
          I understand that unique bond between you and your fur kids. For me photography is all about capturing "that moment" catching your best friend being themselves. I like to capture your four-legged member of the family where they are most comfortable and happy: in your home.
        </p>
		    <p>
          I use natural light and a casual, loosely posed style that keeps the focus on your pet. Clients can choose if they want to be in the photos, or just have their pet be the star.
        </p>
        <p className="pull-left">
          Growing up I loved dogs and horses. I had Breyers and played horse instead of Barbies. This love of horses lead to riding lessons and then to showing American Saddlebred Horses. My life-long passion of horses and dogs continues with my photography.
        </p>
        <img className="about-picture pull-right" src="/images/about_img2.jpg" />
        <p className="clear-left">
          I invite you to take a look around, get to know me. If you have any questions please contact me! Photography sessions available in the Dallas/Fort Worth Metroplex.
        </p>
      </div>
    )
  }
}
