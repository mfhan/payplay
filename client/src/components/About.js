import React from 'react';

function About(props) {
  console.log('this is About: props', props)
  return (
    <div>
      <h2>About This Project: </h2>
      <p>Repo: https://github.com/mfhan/paylay  </p>
    </div>
  );
}

export default About;
