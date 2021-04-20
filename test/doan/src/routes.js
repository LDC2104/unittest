import React from 'react';
import NotFound from './components/NotFound';
import DangNhap from './components/DangNhap';
import DangKy from './components/DangKy';
import DangKyDoAn from './components/DangKyDoAn';
import QuanLyDoAn from './components/QuanLyDoAn';
import ThongTin from './components/ThongTin';
import Them from './components/Them';
import DanhSachGiaoVien from './components/DanhSachGiaoVien';
import SuaDoAn from './components/SuaDoAn';
import Order from './components/Order';
import TrangChu from './components/TrangChu';
import LuaChon from './components/LuaChon';
import TaoThongBao from './components/TaoThongBao';
import QLND from './components/QLND';



const routes = [
    {
        path : '/',
        exact : true,
        main : ({history}) => <TrangChu history={history}/>
    },
    {
        path : '/DangNhap',
        exact : false,
        main : ({history}) => <DangNhap history={history}/>
    },
    {
        path : '/LuaChon',
        exact : false,
        main : ({history}) => <LuaChon history={history}/>
    },
    {
        path : '/TaoThongBao',
        exact : false,
        main : ({history}) => <TaoThongBao history={history}/>
    },
    {
        path : '/QLND',
        exact : false,
        main : ({history}) => <QLND history={history}/>
    },
    {
        path : '/DangKy',
        exact : false,
        main : ({history}) => <DangKy history={history}/>
    },
    {
        path : '/ThongTin',
        exact : true,
        main : () => <ThongTin />
    },
    {
        path : '/DangKyDoAn/:id',
        exact : false,
        main : ({match,history}) => <DangKyDoAn match={match} history={history}/>
    },
    {
        path : '/QuanLyDoAn/:id',
        exact : false,
        main : ({match,history}) => <QuanLyDoAn match={match} history={history}/>
    },
    {
        path : '/Them/:id',
        exact : false,
        main : ({match, history}) => <Them match={match} history={history}/>
    },
    {
        path : '/:idd/:id/tgv',
        exact : false,
        main : ({match, history}) => <DanhSachGiaoVien match={match} history={history}/>
    },
    {
        path : '/:id/:id/edit',
        exact : false,
        main : ({match, history}) => <SuaDoAn match={match} history={history}/>
    },
    {
        main : ({history}) => <Order history={history}/>
    },
    {
        path : '',
        exact : false,
        main : () => <NotFound />
    }
]

export default routes;