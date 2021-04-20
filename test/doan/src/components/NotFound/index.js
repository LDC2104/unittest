import React, { Component } from 'react';


class NotFound extends Component{
  render() {
    return (
      <div>
          
          <div className="alert alert-warning">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
              <strong>Khong tim thay trang</strong>
          </div>
          
      </div>
    );
  }
  
}

export default NotFound;