import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Order from '../Order';
import Logo from '../../images/logo.jpg';
import New from '../../images/new.png';




class LuaChon extends Component{
    constructor(props){
        super(props);
        this.state = {
            ten : 'admin',
            isSV : false,
            o : false,
            op : false
          }
    }

    onClick = () => {
        this.setState({
            op : !this.state.op
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
            url : 'http://localhost:4000/orders/tb',
            data : null,
            withCredentials: true,
          }).then(res => {
            
            res.data.map((item, index) => {
              if(item.ck === 0){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Giáo viên " + res.data[0].ten + " đã từ chối tham gia hướng dẫn đồ án " + this.state.tenDA);
                })
  
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
              if(item.ck === 1){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Giáo viên " + res.data[0].ten + " đã đồng ý tham gia hướng dẫn đồ án " + this.state.tenDA);
                })
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
            })
          })

        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/orders',
            data : null,
            withCredentials: true,
          }).then(res => {
            if(res.data.length !== 0){
              this.setState({
                o : !this.state.o,
              })
            }
        })
    }


  render() {
    return (
        <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            {
                this.state.op ? 
                    <Order />
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
                            <div class="bgtitle">Loại đồ án</div>
                            <div className=" col-lg-13 allk ">
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DACS'}`}><h3>Đồ án cơ sở</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DACS'}`}><h3>Đồ án cơ sở</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DACN'}`}><h3>Đồ án chuyên ngành</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DACN'}`}><h3>Đồ án chuyên ngành</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DATN'}`}><h3>Đồ án tốt nghiệp</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DATN'}`}><h3>Đồ án tốt nghiệp</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'KL'}`}><h3>Khóa luận tốt nghiệp</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'KL'}`}><h3>Khóa luận tốt nghiệp</h3></Link>
                                    }
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
  
}

export default LuaChon;