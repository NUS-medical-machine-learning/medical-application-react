import React from 'react';

class SubjectIdInput extends React.Component {
    render() { 
        return <div className="input-group">
        <span className="input-group-text">BTX-DEV-</span>
        <input
          aria-label="Server"
          className="form-control"
          placeholder="Enter Test ID to begin sampling"
          type="text"
          handleKeyDown={this.props.onKeyDown}
          onChange={this.props.onChange}
        />
      </div>;
    }
}
 
export default SubjectIdInput;
