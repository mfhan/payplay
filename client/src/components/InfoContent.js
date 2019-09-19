import React, {PureComponent} from 'react';
import '../App.css';

export default class InfoContent extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = info.username;
    //const displayName = `${info.username}`;
    const displayWebsite = `${info.social1}`
    const displayIntro = `${info.intro}`
    console.log('info from InfoContent', info)
    return (
      <div className="info-window">
        <div>
          {displayName} |'Me!'
          <a
            target="_new"
            href={ `${displayWebsite}`}
          >
            {displayWebsite}
          </a>
          <p>{displayIntro}</p>
        </div>
        <img width={150} src={info.image} alt ='' />
      </div>
    );
  }
}
