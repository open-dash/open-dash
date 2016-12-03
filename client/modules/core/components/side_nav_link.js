import React, { PropTypes } from 'react';
import { Roles } from 'meteor/alanning:roles';

const Link = ({ label, link, roles, user }) => {
  if (Roles.userIsInRole(user, roles) || roles === 'any') {
    return (
      <li>
        <a href={link}>
          {label}
        </a>
      </li>
    );
  }
  return null;
};

Link.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  user: PropTypes.object
};

export default Link;
