import React, { Component } from 'react';

class ActivityConsole extends Component {
    render() { 
        return (
          <div className="col-lg-4 bg-light">
            <div className="bg-white shadow text-dark rounded p-3">
              <h1>
                Become a <span className="text-warning"> Web Developer </span>
              </h1>
              <p className="lead my-4">
                We focus on teaching our students the fundamentals of the latest
                and greatest technologies to prepare them for their first dev
                role
              </p>
            </div>
          </div>
        );
    }
}
 
export default ActivityConsole;