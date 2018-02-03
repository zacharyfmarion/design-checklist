import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';

const NotificationErrorText = ({ history }) => {
  const handleClick = () => history.push('/about');
  return (
    <span>
      Your project could not be found. Please make sure you spelled it
      correctly. Click <a onClick={handleClick}>here</a> for information about
      how to set up your project.
    </span>
  );
};

export default withRouter(NotificationErrorText);
