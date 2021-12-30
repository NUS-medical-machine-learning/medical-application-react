import React from 'react';

class SubjectIdInput extends React.Component {
    render() { 
        return (
          <div className="input-group">
            <span className="input-group-text bg-tertiary">PNS-</span>
            <input
              aria-label="Server"
              className="form-control bg-tertiary"
              placeholder="Enter Test ID to begin sampling"
              type="text"
              handleKeyDown={this.props.onKeyDown}
              onChange={this.props.onChange}
            />
          </div>
        );
    }
}
 
export default SubjectIdInput;
