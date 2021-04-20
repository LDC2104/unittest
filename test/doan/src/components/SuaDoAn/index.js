import React, { Component } from 'react';
import axios from 'axios';
//import moment from 'moment';



class SuaDoAn extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenDoAn : '',
            nenTang : '',
            moTa : '',
            ngayNop : '',
            ngDK : '',
        }
    }

    componentDidMount(){
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'GET',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : null,
        }).then(res => {
            this.setState({
                tenDoAn : res.data.tenDoAn,
                nenTang : res.data.nenTang,
                moTa : res.data.moTa,
                //ngayNop : moment(res.data.ngayNop, "DD-MM-YYYY").format("YYYY-MM-DD"),
                ngDK : res.data.ngDK,
            })
        })
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    
    onSubmit = (e) => {
        console.log(this.state.ngayNop);
        e.preventDefault();
        let {history} = this.props;
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'PUT',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                moTa : this.state.moTa,
                ngDK : this.state.ngDK,
            }
        }).then(res => {
            if(res.data === 's'){
                alert('Sửa đồ án thàng công');
                history.goBack();
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }
  render() {
    return (
        <div className="row">
            <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Sửa đồ án</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên</label>
                                <input type="text" className="form-control" name="tenDoAn" placeholder="Tên đồ án" onChange={this.onChange} value={this.state.tenDoAn}/>
                            </div>
                            <div className="form-group">
                                <label>Nền tảng</label>
                                <input type="text" className="form-control" name="nenTang" placeholder="Nền tảng"  onChange={this.onChange} value={this.state.nenTang}/>
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea type="text" className="form-control" name="moTa" placeholder="Mô tả"  onChange={this.onChange} value={this.state.moTa}/>
                            </div>
                            <div className="form-group">
                                <label>Số lượng</label>
                                <input type="number" min='1' max='3' className="form-control" name="ngDK" onChange={this.onChange} value={this.state.ngDK}/>
                            </div>
             
                            <button type="submit" className="btn btn-primary mt btc">Lưu</button>
                        </form> 
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default SuaDoAn;