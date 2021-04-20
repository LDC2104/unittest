import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from '../../images/logo.jpg';
import New from '../../images/new.png';
import moment from 'moment';




class TrangChu extends Component{
    constructor(props){
        super(props);
        var today = new Date();
        this.state = {
            tb : [],
            hienThi : false,
            i : '',
            date : today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
        }
    }

    componentDidMount() {
        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/tbs',
        }).then(res => {
            var tbSort = res.data.sort((a,b) => {
                return new Date(a.scheduled_for).getTime() - 
                    new Date(b.scheduled_for).getTime()
            }).reverse();
            this.setState({
                tb : tbSort
            }); 
        })
    }

    onClick = (index) => {
        this.setState({
            hienThi : !this.state.hienThi,
            i : index
        })
    }

  render() {
    return (
        <div>           
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            {this.state.hienThi 
                ? 
                <div class="modal-dialog modal-dialog-centered modal-main modal display-block">
                    
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">{this.state.tb[this.state.i].tieuDe}</h3>
                        </div>
                        <div class="modal-body">
                            <p>{this.state.tb[this.state.i].noiDung}</p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default"onClick={this.onClick}>Close</button>
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
                                <div class="accordion-heading menuhome" style={{padding: '5px'}}>
                                        <a href="./index.html">Trang chủ</a>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#">Tin tức</a>
                                </div>
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
                                    <Link to='/DangNhap'>Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sx-9 col-sm-9 col-md-9 col-lg-9">
                        <div class="divmain">
                            <div class="bgtitle">Thông báo chung</div>
                            {this.state.tb.map((item, index) => {
                                return <tr style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <h3>{item.tieuDe}</h3>
                                        <button style={{width: '100px',height: '20px', fontSize: '15px', border: 'none', backgroundColor: 'white'}} type="button" 
                                            onClick={() => this.onClick(index)}>
                                        Chi tiết>>>>
                                        </button>
                                    </div>                                    
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                                        {
                                            moment(item.updatedAt).format("DD-M-YYYY") == this.state.date
                                            ? <img style={{width: '15%',marginTop: '3%'}}  src={New} />
                                            : ''
                                        }
                                        <h6 style={{marginTop: '3%'}}>{moment(item.updatedAt).format("DD-MM-YYYY")}</h6>
                                    </div>
                                </tr>
                            })}        
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

export default TrangChu;