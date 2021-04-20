import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo_DLU from '../../images/logo_dlu.png';



class DangNhap extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            isLogined : false,
        }
    }

    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }

    onSubmit = (e) => {
        if (this.state.email === "1710137@dlu.edu.vn" && this.state.password === "123") {
            this.setState({
                isLogined : true
            })
        }
        // e.preventDefault();
        // const {history} = this.props;
        // axios({
        //     method : 'POST',
        //     url : 'http://localhost:4000/users',
        //     data : {
        //         email : this.state.email,
        //         password : this.state.password,
        //     },
        // }).then(res => {
        //     if(res.data === 0)
        //         alert('Email chưa được đăng ký');
        //     else if(res.data === 1)
        //             alert('Email hoặc mật khẩu chưa chính xác');
        //          else {
        //              if(res.data.admin === 1){
        //                 const cookies = new Cookies();
        //                 cookies.set('id', 'admin', { path: '/' });
        //                 history.push(res.data.message);
        //              }else {
        //                 const cookies = new Cookies();
        //                 cookies.set('id', res.data.kt, { path: '/' });
        //                 history.push(res.data.message);
        //              }
        //          }
        // })
    }
  render() {
    return (

        <div className="center">
            <div className="container">
                <div className="logo">
                    <img src={Logo_DLU} alt="DaLat University" />
                </div>
                <div className="text">Đăng Nhập</div>
                <form>
                    <div className="data">
                        <label>Email</label>
                        <input type="text" placeholder="Nhập Email" name="email" required  title="Bạn phải nhập đúng MSSV@dlu.edu.vn" onChange={this.onChange} />
                    </div>
                    <div className="data">
                        <label>Password</label>
                        <input type="password" placeholder="Nhập Mật Khẩu" name="password" required onChange={this.onChange} />
                    </div>
                    <div className="forgot-pass">
                        <a href="#">Quên mật khẩu?</a></div>
                    <div className="btn">
                        {/* <div className="inner"> */}
                        <button onClick={this.onSubmit} className="submit-button" type="submit" title="dangnhap">Đăng nhập</button>
                        {/* </div> */}
                            
                    </div>
                        <div className="signup-link">Không có tài khoản? <Link to='/Dangky'>Đăng ký ngay</Link></div>
                </form>
            </div>
        </div>
        
        /* <div className="row">
            <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Đăng nhập</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" placeholder="Email" title="Bạn phải nhập đúng MSSV@dlu.edu.vn" onChange={this.onChange} required pattern="[a-z0-9._%+-]+@dlu.edu.vn"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="password"  onChange={this.onChange} required/>
                            </div>
                            <button type="submit" className="btn btn-primary btc pd">Đăng nhập</button><br />
                            <Link to='/Dangky'>Nhấn vào đây để đăng ký</Link>
                        </form> 
                    </div>
                </div>
            </div>  
        </div> */
    );
  }
  
}

export default DangNhap;