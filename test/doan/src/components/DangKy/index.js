import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Logo_DLU from '../../images/logo_dlu.png';



class DangKy extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            ten : '',
            ma : '',
            maGV : '',
            isGV : false,
            isSignuped : false,
        }
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }
    
    onClick = () => {
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users/send',
            data : {
                email : this.state.email,
            }
        }).then(res => {
            if(res.data === 'da ton tai')
             alert('Email đã đăng ký, vui lòng nhập email mới');
            if(res.data === 1){
                alert('Mã xác nhận đã được gửi tới email: '+ this.state.email);
            }
        })
    }

    onSubmit = (e) => {
        if (this.state.email === "1710137@dlu.edu.vn" && this.state.password === "123" && this.state.ma === "-111") {
            this.setState({
                isSignuped : true
            })
        }
        // const {history} = this.props;
        // e.preventDefault();
        // axios({
        //     method : 'POST',
        //     url : 'http://localhost:4000/users/dk',
        //     data : {
        //         email : this.state.email,
        //         password : this.state.password,
        //         ten : this.state.ten,
        //         ma : this.state.ma,
        //         maGV : this.state.maGV,
        //         isGV : this.state.isGV,
        //     }
        // }).then(res => {
        //     if(res.data === 'da ton tai')
        //      alert('Email đã đăng ký, vui lòng nhập email mới');
        //     else {
        //         if(res.data === 'nhap ma')
        //             alert('Bạn chưa nhập mã đăng ký');
        //         else {
        //             if(res.data === 'ma sai')
        //                 alert('Mã đăng ký không đúng, vui lòng nhập lại');
        //                 else {
        //                     if(res.data === 'sai maGV'){
        //                         alert('Mã giáo viên không đúng, vui lòng nhập lại');
        //                     }
        //                     else {
        //                         alert('Đăng ký thành công');
        //                         const cookies = new Cookies();
        //                         if(res.data.message === '1'){
        //                             cookies.set('id', res.data.result.id, { path: '/' });
        //                             history.push('/LuaChon');
        //                         }
        //                         else {
        //                             cookies.set('id', res.data.id, { path: '/' });
        //                             history.push('/LuaChon');
        //                         }
        //                     }
        //                 }         
        //         }   
        //     }
        // })
    }   

  render() {
    return (
        <div className="center">
          <div className="container">
            <div className="logo">
              <img src={Logo_DLU} alt="DaLat University" />
            </div>
            <div className="text">Đăng Ký</div>
            <form >
              <div className="data">
                <label>Email</label>
                <input type="email" className="form-control" name="email" title="Bạn phải nhập đúng MSSV@dlu.edu.vn" placeholder="Email" onChange={this.onChange} required pattern="[a-z0-9._%+-]+@dlu.edu.vn"/>
              </div>
              <div className="data">
                <label>Password</label>
                <input type="password" className="form-control" name="password" placeholder="password"  onChange={this.onChange} required/>
              </div>
              <div className="data">
                <label>Họ và Tên</label>
                <input type="text" className="form-control" name="ten" placeholder="Họ và tên"  onChange={this.onChange} required/>
              </div>
              <div className="form-group">
                    <label style={{fontSize: "18px"}}>Mã đăng ký</label>
                    <div className="flex">
                        <input type="number" className="form-control w2" name="ma" placeholder="Mã đăng ký"  onChange={this.onChange} required/>
                        <button type="button" className="btn-primary btn1" onClick={this.onClick}>Lấy mã</button>
                    </div>
                </div>
              <div className="checkbox">
                    <label>
                        <input type="checkbox"  name="isGV" value={this.state.isGV} defaultChecked={this.state.isGV} onChange={this.onChange}/>
                        Giáo viên
                    </label>
                    {this.state.isGV ? <input type="text" className="form-control w2" name="maGV" placeholder="Mã GV"  onChange={this.onChange}/> : ''}
               </div>
              <div className="btn">
                {/* <div className="inner" /> */}
                <button onClick={this.onSubmit} className="submit-button" name="Signup" type="submit">Đăng Ký</button>
              </div>
            </form>
          </div>
        </div>
    );
  }
  
}

export default DangKy;