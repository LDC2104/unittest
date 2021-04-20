import React, { Component } from 'react';
import axios from 'axios';



class TaoThongBao extends Component{
    constructor(props){
        super(props);
        this.state = {
            tieuDe : '',
            noiDung : ''
        }
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
        e.preventDefault();
        const {history} = this.props;
        axios({
            method : 'POST',
            url : 'http://localhost:4000/tbs',
            data : {
                tieuDe: this.state.tieuDe,
                noiDung : this.state.noiDung,
            },
            withCredentials: true
        }).then(res => {
            if(res.data){
                alert('Tạo thông báo thành công');
                history.push('/LuaChon');
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
                            <h3 className="panel-title mc">Tạo thông báo</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tiêu đề</label>
                                <input type="text" className="form-control" name="tieuDe" placeholder="Tiều đề" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Nội dung</label>
                                <textarea type="text" className="form-control" name="noiDung" placeholder="Nội dung"  onChange={this.onChange}/>
                            </div>            
                            <button type="submit" className="btn btn-primary mt btc">Tạo</button>
                        </form> 
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default TaoThongBao;