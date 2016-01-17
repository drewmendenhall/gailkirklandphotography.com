import React from 'react'
import {Link} from 'react-router'

export default class CommonSessionInfo extends React.Component {
  static defaultProps = {
    includes: [],
  };
  static propTypes = {
    includes: React.PropTypes.array,
  };

  render() {
    return (
      <div>
        <p>Sessions are tailored to your needs. A session includes:</p>
        <ul>
          {this.props.includes.map((included, index) =>
            <li key={index}>{included}</li>
          )}
          <li>Travel to your location (up to 25 miles from 75093, Plano TX)</li>
          <li>1.5-2 hours photographer's time and talent only</li>
          <li>Professional editing and retouching</li>
        </ul>
        <p>$250 minimum product order for:</p>
        <ul>
          <li>Printed products</li>
          <li>Digital copies</li>
        </ul>
        <p>There is a surcharge of $25 for any additional pets above 2</p>

        <h2>Twilight Sessions</h2>
        <p>Special sessions design for pets who are elderly or ailing, to help you capture some of your final memories with them.  Since these types of events can happen at the blink of an eye, I will do my absolute best to accomodate you and be available for your needs. Please visit <Link to="/sessions/twilight">Twilight Sessions</Link> for more information.</p>
      </div>
    )
  }
}
