import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DangNhap from './index';

describe('Test case for testing login',() =>{
let wrapper;
configure({adapter: new Adapter()});
test('email check',()=>
{
wrapper = shallow(<DangNhap/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
expect(wrapper.state('email')).toEqual('1710137@dlu.edu.vn');
})
it('password check',()=>{
wrapper = shallow(<DangNhap/>);
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
expect(wrapper.state('password')).toEqual('123');
})
it('login check with right data',()=>{
wrapper = shallow(<DangNhap/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(true);
})
it('login check with wrong data',()=>{
wrapper = shallow(<DangNhap/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '1234'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(false);
})
})