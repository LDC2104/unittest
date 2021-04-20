import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Order from '../Order';
import Logo from '../../images/logo.jpg';
import New from '../../images/new.png';




class QLND extends Component{
    constructor(props){
        super(props);
        this.state = {
            ten : 'admin',
            isSV : false,
            o : false,
            op : false,
            ds : [],
            sE : '',
            dsF : [],
            hienThi : false,
            infor : [],
          }
    }

    onClick = () => {
        this.setState({
            op : !this.state.op
        })
    }

    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value.toLowerCase()
        })
    }

    onClickInfo = (id) => {
        this.setState({
            infor : []
          })
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users/TTID',
            data : {
              id : id,
            }
        }).then(res => {
            console.log(res.data);
          this.setState({
            infor : res.data[0],
            hienThi : true,
          })
        })
    }

    componentDidMount(){
        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/TT',
            data : null,
            withCredentials: true
        }).then(res => {
          if (res.data.length != 0) {
            this.setState({
                ten : res.data[0].ten,
            })
            if (res.data[0].isGV == false) {
                this.setState({
                    isSV : true
                })
              }
          }
        })

        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/allUser',
            data : null,
        }).then(res => {
            console.log(res);
            this.setState({
                ds : res.data,
            })
        })

    }


  render() {
    if (this.state.sE !== '') {
        this.state.dsF = this.state.ds.filter((item) => {
            return item.email.toLowerCase().indexOf(this.state.sE) !== -1
        })
    } else {
        this.state.dsF = []
    }
    return (
        <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>


            {this.state.hienThi 
                ? 
                <div class="modal-dialog modal-dialog-centered modal modal-mainx display-block">
                    
                    <div class="modal-content">
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default"onClick={() => {this.setState({hienThi : !this.state.hienThi})}}>Close</button>
                        </div>
                        <div class="modal-body">
                            {
                                this.state.infor.isGV === false
                                ? <h2 class="modal-title">Sinh viên: {this.state.infor.ten}</h2>
                                : <h2 class="modal-title">Giảng viên: {this.state.infor.ten}</h2>
                            }
                        </div>
                        <div class="modal-header">
                            <p>Email: {this.state.infor.email}</p>
                            {   
                                this.state.infor.topic.length === 0 
                                ? <p>Chưa có thông tin đồ án</p>
                                :   this.state.infor.isGV === false
                                    ? <p class="modal-title">Đồ án đăng ký: {this.state.infor.topic[0].tenDoAn}</p>
                                    : <p class="modal-title">Đồ án hướng dẫn: {this.state.infor.topic.map((item) => {return <p>- {item.tenDoAn}</p>})}</p>
                            }
                        </div>
                    </div>
                    
                </div>
                
                : ''
            }

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-md-3 col-sx-3 col-sm-3 col-lg-3">
                        <div class="accordion ">
                            <div class="accordion-group khungt">
                                {
                                    this.state.ten == 'admin' 
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/QLND'}>Quản lý người dùng</Link>
                                        </div>
                                    : ''
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    this.state.ten == 'admin' 
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/TaoThongBao'}>Tạo thông báo</Link>
                                        </div>
                                    :   <div>
                                        { this.state.isSV 
                                            ? ''
                                            :   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                                    <button style={{fontSize: '15px', border: 'none', backgroundColor: 'rgba(16, 163, 23, 0.9)', color: 'white', fontSize: '20px'}} onClick={this.onClick}>Lời mời</button>
                                                    {
                                                        this.state.o 
                                                        ? <img style={{width: '15%',float: 'right'}}  src={New} />
                                                        : ''
                                                    }
                                                </div>
                                            }
                                        </div>
                                }
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#"> Giảng viên hướng dẫn</a>
                                </div>
                            <div id="collapse_1" class="accordion-body collapse" >
                                <div class="accordion-inner">
                                </div>
                            </div>
                                </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#">Tài liệu tham khảo</a>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <p className="xc">Xin chào {this.state.ten}</p> 
                                    {/* {this.state.isGV ? 'giáo viên' : 'sinh viên'} */}
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <Link to='/'>Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="divmain">
                            <div class="bgtitle">Danh sách người dùng</div>
                            <div className=" col-lg-13 allk ">
                                
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th style={{borderLeft: "2px solid white"}}></th>
                                        <th style={{borderLeft: "2px solid white"}}></th>                                      
                                        <th>
                                            <div style={{display: "flex"}}>
                                                <input type="search" name="sE" id="input" class="form-control" value={this.state.sE} required="required" title="Tìm theo email" placeholder="Tìm theo email" onChange={this.onChange} />   
                                            </div>                                         
                                        </th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dsF.length !== 0
                                        ? this.state.dsF.map((item, index) => {
                                            return <tr onClick={() => this.onClickInfo(item.id)}>
                                                        <th>{index}</th>
                                                        <th>{item.ten}</th>
                                                        <th>{item.email}</th>
                                                    </tr>
                                            })
                                        : this.state.ds.map((item, index) => {
                                            return <tr onClick={() => this.onClickInfo(item.id)}>
                                                        <th>{index}</th>
                                                        <th>{item.ten}</th>
                                                        <th>{item.email}</th>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </table>

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
  
}

export default QLND;