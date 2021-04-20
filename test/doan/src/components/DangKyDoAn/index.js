import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DanhSachDoAn from '../DanhSachDoAn';
import axios from 'axios';
import Logo from '../../images/logo.jpg';


class DangKyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : [],
        }
    }
    componentDidMount(){
      const {match} = this.props;
      let {id} = match.params;
        axios({
            method : 'POST',
            url : `http://localhost:4000/topics/${id}`,
            data : null,
            withCredentials: true
        }).then(res => {
          this.setState({
            danhsach : res.data.ds,
          })
        })
      }

      onClick = (id, ds, sln) => {
        let sl = 0;
        ds.map((item) => {
          if(item.isGV === false)
            return sl = sl + 1;
        })
        if (sl < sln) {
          const {history} = this.props;
          axios({
            method : 'POST',
            url : `http://localhost:4000/topics/dkda/${id}`,
            data : {id : id},
            withCredentials: true
          }).then(res => {console.log("má", res.data);
            if(res.data === 0){
              alert('Bạn không thể đăng ký đồ án nữa');
            }
            history.push('/ThongTin');
          })
        }
        else alert('Số lượng sinh viên đăng ký đã đủ, xin chọn đồ án khác');
      }

  render() {
      let {danhsach} = this.state;
    return (
      <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            <div class="container-fluid padding">
                <div class="row padding">
                    
                    <div class="col-lg-12">
                        <div class="divmain">
                            <div class="bgtitle" style={{textAlign: 'center', fontSize: '20px'}}>Danh sách
                              <Link to={'/LuaChon'} type="button" className="btn btn-success" style={{float: 'left', marginTop: '-0.5%', width: 'auto'}}>Quay lại</Link>                              
                            </div>
                            <div>
                              <div className="panel panel-danger">
                                    <div className="panel-body">
                                          <table className="table table-hover tabledk">
                                              <thead>
                                                  <tr>
                                                      <th>STT</th>
                                                      <th>Tên đồ án</th>
                                                      <th>Nền tảng</th>
                                                      <th>Mô tả</th>
                                                      <th>Số lượng</th>
                                                      <th>Người đăng ký</th>
                                                      <th>Giáo viên hướng dẫn</th>
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
                <DanhSachDoAn
                  key={index}
                  ds={ds}
                  index={index}
                  onClick={this.onClick}
                />
            );
        });
    }
    return resuft;
}
  
}

export default DangKyDoAn;