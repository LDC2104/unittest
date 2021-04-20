import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DanhSachDoAnAdmin from '../DanhSachDoAnAdmin';
import Cookies from 'universal-cookie';
import Logo from '../../images/logo.jpg';


class QuanLyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : [],
          ten : '',
          s : false,
          infor : '',
          ngTao : '',
          n : false,
          p : false,
          di : false,
          ngayNop : '',
          phong : '',
          loai : 'Đồ án cơ sở',
          lan1 : '',
          lan2 : '',
          lan3 : '',
          idUser : '',
          tenDA : '',
          idLoai : '',
        }
        const cookie = new Cookies();
        this.id = cookie.get('id') !== 'admin' ? true : false;
        this.ngTao = cookie.get('id');
    }
    componentDidMount(){
      const {history, match} = this.props;
      let {id} = match.params;
      this.setState({
        idLoai : id
      })
        axios({ 
            method : 'GET',
            url : `http://localhost:4000/topics/${id}`,
            data : null,
            withCredentials: true,
        }).then(res => {
          if(res.data === 0){
            history.push('');
          }
          else {
            if(!this.id){
              this.setState({
                danhsach : res.data.data,
                ten : res.data.message,
              })
            }
            else {
              this.setState({
                danhsach : res.data.data.topic,
                ten : res.data.message,
              })
            }
          }
        })

      }
      onClickS = (id, ngayNop) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics',
          data : {
            id : id,
            ngayNop : ngayNop,
          }
        }).then(res => {
          console.log(res.data);
          this.componentDidMount();
        })
      }

      onChange = ({target}) => {
        this.setState({
          [target.name] : target.value
      })
      }

      onClickP = (id, phong) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/p',
          data : {
            id : id,
            phong : phong,
          }
        }).then(res => {
          console.log(res.data);
          this.componentDidMount();
        })
      }

      onClickI = (id) => {
        axios({
          method : 'POST',
          url : `http://localhost:4000/topics/${this.state.idLoai}/TTID`,
          data : {
            id : id,
          }
      }).then(res => {
        this.setState({
          infor : res.data,
          s : true,
        })
        console.log(this.state.infor);
      })
      }

      onClickD = () => {
        this.setState({
          s : false,
        })
      }

      onDelete = (id, ngTao) => {
        console.log(ngTao, this.ngTao);
        if(ngTao === this.ngTao || !this.id){
          axios({
            method : 'POST',
            url : `http://localhost:4000/topics/${this.state.idLoai}/TTID`,
            data : {
              id : id,
            }
          }).then(res => {
            if(res.data.user.length !== 0){
              if(confirm('Đã có sinh viên đăng ký đề tài, bạn có chắc chắn muốn xóa ?')){ //eslint-disable-line
                let {danhsach} = this.state;
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/topics/${this.state.idLoai}/${id}`,
                  data : null
                }).then(res => {
                  if(res.status === 200){
                    let index = this.findId(danhsach, id);
                    console.log(index);
                    if(index !== -1){
                      danhsach.splice(index, 1);
                      this.setState({
                        danhsach : danhsach
                      })
                    }
                  }
                })
              }
            }
            else {
                let {danhsach} = this.state;
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/topics/${this.state.idLoai}/${id}`,
                  data : null
                }).then(res => {
                  if(res.status === 200){
                    let index = this.findId(danhsach, id);
                    console.log(index);
                    if(index !== -1){
                      danhsach.splice(index, 1);
                      this.setState({
                        danhsach : danhsach
                      })
                    }
                  }
                })
              }  
            })
        }
        else alert('Bạn không thể xóa đồ án');
      }

      onClickALLN = () => {
        this.setState({
          n : !this.state.n,
        })
      }

      onClickALLP = () => {
        this.setState({
          p : !this.state.p,
        })
      }

      onClickDi = () => {
        this.setState({
          di : !this.state.di,
        })
      }

      onClickDS = (id, lan) => {
        let diem;
        this.setState({
          di : !this.state.di
        })
        if(lan === 1)
            diem = this.state.lan1;
        if(lan === 2)
            diem = this.state.lan2;
        if(lan === 3)
            diem = this.state.lan3;
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/diem',
          data : {
            id : id,
            lan : lan,
            diem : diem,
          }
        }).then(res => {
          this.onClickI(id);
          this.componentDidMount();
        })
      }

      onClickAllSaveN = () => {
        this.setState({
          n : !this.state.n
        })
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/ngay',
          data : {
            loai : this.state.loai,
            ngayNop : this.state.ngayNop,
          }
        }).then(res => {
          this.componentDidMount();
        })
      }

      onClickAllSaveP = () => {
        this.setState({
          p : !this.state.p
        })
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/phong',
          data : {
            loai : this.state.loai,
            phong : this.state.phong,
          }
        }).then(res => {
          this.componentDidMount();
        })
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
      this.name = this.state.ten === 'admin' ? true : false;
      let {danhsach} = this.state;
    return (

      <div className="st">

      <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-lg-12">
                        <div class="divmain cc">
                            <div class="bgtitle" style={{textAlign: 'center', fontSize: '20px'}}>Danh sách
                            <Link to={'/LuaChon'} type="button" className="btn btn-success" style={{float: 'left', marginTop: '-0.5%', width: 'auto'}}>Quay lại</Link>                              
                            </div>
                            <div className=" col-lg-13 ">
        {
          this.state.s ? 
            <div className="panel panel-primary">
                <div className="panel-heading flex">
                    <h3 className="panel-title">Thông tin chi tiết đồ án</h3>
                    <button type="button" class="btn btn-lg btn-danger fx xx wcn" onClick={this.onClickD}>X</button>
                </div>
                <div className="panel-body">
                    <h4>Tên đồ án: {this.state.infor.tenDoAn}</h4>
                    <h4>Nền tảng: {this.state.infor.nenTang} </h4>
                    <h4>Loại đồ án: {this.state.infor.loai} </h4>
                    <h4>Mô tả: {this.state.infor.moTa} </h4>
                    <h4>Ngày báo cáo: {this.state.infor.ngayNop === 'Invalid date' ? 'Chưa cập nhật' : this.state.infor.ngayNop} </h4>
                    <h4>Phòng: {this.state.infor.phong === null ? 'Chưa cập nhật' : this.state.infor.phong} </h4>
                    <h4>Thành viên: 
                      {this.state.infor.user.map((item) => {
                        if(item.isGV === false){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                        }
                      })}
                    </h4>
                    <h4>Giáo viên hướng dẫn: 
                      {this.state.infor.user.map((item) => {
                        if(item.isGV === true){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                        }
                      })}
                    </h4>
                    <h4>
                      <div className="flex">
                        <div>
                          Điểm lần 1: {this.state.infor.lan1 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan1}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div>
                                    <input type="text" name="lan1" id="input" className="form-control" onChange={this.onChange} value={this.state.lan1} required="required" title="" />
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 1)}>save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>
                        <div className="ml-10">
                          Điểm lần 2: {this.state.infor.lan2 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan2}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div>
                                    <input type="text" name="lan2" id="input" className="form-control" onChange={this.onChange} value={this.state.lan2} required="required" title="" />
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 2)}>save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>
                        <div className="ml-10">
                          Điểm lần 3: {this.state.infor.lan3 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan3}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div>
                                    <input type="text" name="lan3" id="input" className="form-control" onChange={this.onChange} value={this.state.lan3} required="required" title="" />
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 3)}>save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>  
                        <div className="ml-10">
                          Điểm tổng kết: {(this.state.infor.lan1 === null || this.state.infor.lan2 === null || this.state.infor.lan3 === null) ?
                          'Chưa cập nhật'
                          : Math.round((this.state.infor.lan1 * 0.2 + this.state.infor.lan2 * 0.2 + this.state.infor.lan3 * 0.6) * 100) / 100}
                        </div>   
                      </div>               
                    </h4>
                </div>
              </div>
          : ''   
        }
        <div className="panel panel-danger ds1">
              <div className="panel-body">
                  {/* {this.id ? <Link to={'/ThongTin'} type="button" className="btn btn-default cy bd ml-5">Quay lại</Link> : ''} */}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên đồ án</th>
                                <th>Nền tảng</th>
                                <th>Loại đồ án</th>
                                <th className={"w1"}>Mô tả</th>
                                <th>Số người</th>
                                {
                                  this.id ? '' :
                                  <th style={{width: '100px'}}>Ngày báo cáo
                                    <button type="button" className="btn btn-warning f" onClick={this.onClickALLN}>ALL</button>
                                    {this.state.n ? 
                                      <div>
                                        <div className="form-group">
                                          <label>Loại đồ án</label>
                                          <select className="form-control" name="loai" onChange={this.onChange} Value={this.state.loai}>
                                              <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                                              <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                                              <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                                              <option value="Khóa luận">Khóa luận</option>
                                          </select>
                                      </div>
                                        <input type="date" name="ngayNop" id="input" className="form-control" onChange={this.onChange} value={this.state.ngayNop} required="required" title="" />
                                        <button type="button" className="btn btn-danger" onClick={this.onClickAllSaveN}>save</button>
                                      </div>
                                      :
                                      ''
                                    }
                                  </th>
                                }
                                {
                                  this.id ? '' :
                                  <th style={{width: '10px'}}>Phòng
                                    <button type="button" className="btn btn-warning  f" onClick={this.onClickALLP}>ALL</button>
                                    {this.state.p ? 
                                      <div style={{width: '200px'}}> 
                                        <div className="form-group">
                                          <label>Loại đồ án</label>
                                          <select className="form-control" name="loai" onChange={this.onChange} Value={this.state.loai}>
                                              <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                                              <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                                              <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                                              <option value="Khóa luận">Khóa luận</option>
                                          </select>
                                      </div>
                                        <input type="text" name="phong" id="input" className="form-control" onChange={this.onChange} value={this.state.phong} required="required" title="" />
                                        <button type="button" className="btn btn-danger" onClick={this.onClickAllSaveP}>save</button>
                                      </div>
                                      :
                                      ''
                                    }
                                  </th>
                                }
                                <th style={{width: '300px'}}>Giáo viên hướng dẫn</th>
                                <th>
                                  <Link to={`/Them/${this.state.idLoai}`} type="button" className="btn btn-default cy bd">Thêm đồ án</Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showDanhSach(danhsach)}
                        </tbody>
                    </table>
              </div>
        </div>
      </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid padding">	
                    <div class="row text-center padding">
                        <div class="col-12">
                            <h2>Contact us</h2>
                        </div>
                        <div className="col-12 social padding">
                            <a href="#"><i className="fab fa-facebook" /></a>
                            <a href="#"><i className="fab fa-twitter" /></a>
                            <a href="#"><i className="fab fa-google-plus-g" /></a>
                            <a href="#"><i className="fab fa-instagram" /></a>
                            <a href="#"><i className="fab fa-youtube" /></a>
                        </div>
                    </div>
                </div>	
                <footer>
                    
                </footer>
            </div>
        </div>

    );
  }

  showDanhSach(danhsach){
    let resuft = null;
    if(danhsach.length > 0){
        resuft = danhsach.map((ds, index) =>{
            return(
                <DanhSachDoAnAdmin
                  key={index}
                  ds={ds}
                  idLoai = {this.state.idLoai}
                  index={index}
                  onDelete={this.onDelete}
                  onClickS={this.onClickS}
                  onClickP={this.onClickP}
                  onClickI={this.onClickI}
                />
            );
        });
    }
    return resuft;
}
  
}

export default QuanLyDoAn;