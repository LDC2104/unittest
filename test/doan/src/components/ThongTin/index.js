import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.jpg';


class ThongTin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ds : [],
      isGV : false,
      ten : '',
    }
  }
  
  componentDidMount(){
    axios({
        method : 'GET',
        url : 'http://localhost:4000/users/TT',
        data : null,
        withCredentials: true
    }).then(res => {
      console.log(res.data);
      this.setState({
        ds: res.data[0].topic,
        isGV : res.data[0].isGV,
        ten : res.data[0].ten,
      })
    })
  }
  
  
  render() {
    return (

      <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-md-3 col-sx-3 col-sm-3 col-lg-3">
                        <div class="accordion ">
                            <div class="accordion-group khungt">
                                <div class="accordion-heading" style={{padding: '5px'}}>
                                  <Link to='/'>Trang Chủ</Link>
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
                            <div class="bgtitle">Thông tin</div>
                            {this.state.ds.map((item, index) => {
                              return <div className="panel panel-danger" key={index}>
                                        <div className="panel-body">
                                            <h4>- Tên đồ án: {this.state.ds[index].tenDoAn}</h4>
                                            <h4>- Nền tảng: {this.state.ds[index].nenTang} </h4>
                                            <h4>- Mô tả: {this.state.ds[index].moTa} </h4>
                                            <h4>- Ngày báo cáo: {this.state.ds[index].ngayNop === 'Invalid date' ? 'Chưa cập nhật' : this.state.ds[index].ngayNop} </h4>
                                            <h4>- Phòng: {this.state.ds[index].phong === null ? 'Chưa cập nhật' : this.state.ds[index].phong} </h4>
                                            <h4>- Thành viên: 
                                              {this.state.ds[index].user.map((item) => {
                                                if(item.isGV === false){
                                                return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                                                }
                                              })}
                                            </h4>
                                            <h4>- Giáo viên hướng dẫn: 
                                              {this.state.ds[index].user.map((item) => {
                                                if(item.isGV === true){
                                                return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                                                }
                                              })}
                                            </h4>
                                            <h4>
                                            <div className="flex">
                                      <div style={{marginLeft: "2%"}}>
                                        Điểm lần 1: {this.state.ds[index].lan1 === null ?
                                        'Chưa cập nhật'
                                        : this.state.ds[index].lan1}
                                      </div>
                                      <div className="ml-10">
                                        Điểm lần 2: {this.state.ds[index].lan2 === null ?
                                        'Chưa cập nhật'
                                        : this.state.ds[index].lan2}
                                      </div>
                                      <div className="ml-10">
                                        Điểm lần 3: {this.state.ds[index].lan3 === null ?
                                        'Chưa cập nhật'
                                        : this.state.ds[index].lan3}
                                      </div>     
                                      <div className="ml-10">
                                        Điểm tổng kết: {(this.state.ds[index].lan1 === null || this.state.ds[index].lan2 === null || this.state.ds[index].lan3 === null) ?
                                        'Chưa cập nhật'
                                        : Math.round((this.state.ds[index].lan1 * 0.2 + this.state.ds[index].lan2 * 0.2 + this.state.ds[index].lan3 * 0.6) * 100) / 100}
                                      </div> 
                                    </div>
                                            </h4>
                                        </div>
                              </div>    
                        })
                      }                            
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

export default ThongTin;