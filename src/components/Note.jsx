import React from 'react';
import PropTypes from 'prop-types';

export default function Note(props) {
  return (
    <div className="note">
      {props.text}
      <div className="delete" onClick={() => props.delete(props.id)}>x</div>
    </div>
  )
}

Note.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  delete: PropTypes.func.isRequired
}


