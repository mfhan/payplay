import React, {PureComponent} from 'react';
import '../App.css';

export default class InfoContent extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.username}`;
    const displayWebsite = `${info.social1}`
    const displayIntro = `${info.intro}`

    return (
      <div className="info-window">
        <div>
          {displayName} |{' '}
          <a
            target="_new"
            href={ `${displayWebsite}`}
          >
            {displayWebsite}
          </a>
          <p>{displayIntro}</p>
        </div>
        <img width={100} src={info.image} alt ='' />
      </div>
    );
  }
}
