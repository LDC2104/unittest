import React, { Component } from 'react';

class DanhSachDoAn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      count : 0,
    }
  }

  onClick = (id, ds, sln) => {
    if(confirm('Bạn có chắc chắn muốn đăng ký đề tài ?')){ //eslint-disable-line
      this.props.onClick(id, ds, sln);
    }
  } 

  render() {
    var {ds, index} = this.props;
    return (
      <tr>
            <td>{index + 1}</td>
            <td>{ds.tenDoAn}</td>
            <td>{ds.nenTang}</td>
            <td>{ds.moTa}</td>
            <td>{ds.ngDK}</td>
            <td>{ds.user.map((item) => {
                    if(item.isGV !== true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}</p>
                    }
                })}
            </td>
            <td>{ds.user.map((item) => {
                    if(item.isGV === true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}</p>
                    }
                })}
            </td>
            
            <td>
              <button type="button" className="btn btn-success" onClick={() => this.onClick(ds.id, ds.user, ds.ngDK)}>Đăng ký </button>
            </td>
      </tr>
    );
  }
  
}

export default DanhSachDoAn;
