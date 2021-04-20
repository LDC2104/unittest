import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';


class DanhSachDoAnAdmin extends Component{
  constructor(props){
    super(props);
    const cookie = new Cookies();
    this.id = cookie.get('id') !== 'admin' ? true : false;
    this.id1 = cookie.get('id');
    this.state = {
      s : false,
      n : false,
      ngayNop : '',
      phong : '',
    }
  }

  onDelete = (id, ngTao) => {
    if(confirm('Bạn có chắc chắn muốn xóa đề tài không ?')){ //eslint-disable-line
      this.props.onDelete(id, ngTao);
    }
  }

  onClick2 = (id) => {
    this.props.onClickI(id);
  }

  onChange = ({target}) => {
    this.setState({
      [target.name] : target.value
  })
  }

  onClickP = (id) => {
    this.setState({
      n : !this.state.n
    })
    this.props.onClickP(id, this.state.phong);
  }

  onClickS = (id) => {
    this.setState({
      s : !this.state.s
    })
    this.props.onClickS(id, this.state.ngayNop);
  }

  onClick = () => {
    this.setState({
      s : !this.state.s,
    })
  }

  onClick1 = () => {
    this.setState({
      n : !this.state.n,
    })
  }


  onDeleteGV = (idGV, id, ngTao) => {
    console.log(this.id1, idGV);
    const {ds} = this.props;
    if(ngTao === null){
      if(this.id1 == idGV || !this.id){
        if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
          axios({
            method : 'DELETE',
            url : `http://localhost:4000/users/${idGV}`,
            data : {
              idTopic : id,
            }
          }).then(res => {
            if(res.status === 200){
              let index = this.findId(ds.user, idGV);
              console.log(index);
              if(index !== -1){
                ds.user.splice(index, 1);
                this.setState({
                  ds : this.ds
                })
              }
            }
          })
          window.location.reload(false);
        }
      }
      else alert('Bạn không thể xóa');
    }
    else {
      if(ngTao !== idGV || !this.id){
        if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
          axios({
            method : 'DELETE',
            url : `http://localhost:4000/users/${idGV}`,
            data : {
              idTopic : id,
            }
          }).then(res => {
            if(res.status === 200){
              let index = this.findId(ds.user, idGV);
              console.log(index);
              if(index !== -1){
                ds.user.splice(index, 1);
                this.setState({
                  ds : this.ds
                })
              }
            }
          })
          window.location.reload(false);
        }
      }
      else alert('Bạn không thể xóa');
    }
  }

  findId = (danhsach, id) => {
    let resuft = -1;
    danhsach.forEach((ds, index) => {
      if(ds.id === id){
        resuft = index;
      }
    });
    return resuft;
  }


  render() {
    var {ds, index, idLoai} = this.props;
    return (
      <tr>
            <td onClick={() => this.onClick2(ds.id)}>{index + 1}</td>
            <td onClick={() => this.onClick2(ds.id)}>{ds.tenDoAn}</td>
            <td onClick={() => this.onClick2(ds.id)}>{ds.nenTang}</td>
            <td onClick={() => this.onClick2(ds.id)}>{ds.loai}</td>
            <td onClick={() => this.onClick2(ds.id)}>{ds.moTa}</td>
            <td onClick={() => this.onClick2(ds.id)}>{ds.ngDK}</td>
            {
              this.id ? '' :
              <td >
                {ds.ngayNop}
                <button type="button" className="btn btn-warning f" onClick={this.onClick}>CN</button>
                {this.state.s ? 
                  <div>
                    <input type="date" name="ngayNop" id="input" className="form-control" onChange={this.onChange} value={this.state.ngayNop} required="required" title="" />
                    <button type="button" className="btn btn-danger" onClick={() => this.onClickS(ds.id)}>save</button>
                  </div>
                  :
                  ''
                }
              </td>
            }
            {
              this.id ? '' :
              <td >
                {ds.phong}
                <button type="button" className="btn btn-warning f" onClick={this.onClick1}>CN</button>
                {this.state.n ? 
                  <div>
                    <input type="text" name="phong" id="input" className="form-control" onChange={this.onChange} value={this.state.phong} required="required" title="" />
                    <button type="button" className="btn btn-danger" onClick={() => this.onClickP(ds.id)}>save</button>
                  </div>
                  :
                  ''
                }
              </td>
            }
            <td>{ds.user.map((item, index) => {
                    if(item.isGV === true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}
                              <button type="button" className="btn btn-warning ml-10 f" onClick={() => this.onDeleteGV(ds.user[index].id, ds.id, ds.ngTao)}>-</button>
                            </p>
                    }
                })}
              <Link to={`/${idLoai}/${ds.id}/tgv`}type="button" className="btn btn-primary f" >+</Link>
            </td>
            <td>
            <Link to={`/${idLoai}/${ds.id}/edit`}type="button" className="btn btn-success" >Sửa</Link>
            <button type="button" className="btn btn-danger ml-10" onClick={() => this.onDelete(ds.id, ds.ngTao)}>Xóa</button>
            </td>
      </tr>
    );
  }
  
}

export default DanhSachDoAnAdmin;
