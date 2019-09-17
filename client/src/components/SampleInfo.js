import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.username}`;
    const displayWebsite = `${info.website}`
    const displayIntro = `${info.intro}`

    return (
      <div>
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
        <img width={240} src={info.image} />
      </div>
    );
  }
}
