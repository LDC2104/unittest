import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DangKy from './index';

describe('Test case for testing signup',() =>{
let wrapper;
configure({adapter: new Adapter()});
test('email check',()=>
{
wrapper = shallow(<DangKy />);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
expect(wrapper.state('email')).toEqual('1710137@dlu.edu.vn');
})
it('password check',()=>{
wrapper = shallow(<DangKy />);
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
expect(wrapper.state('password')).toEqual('123');
})
it('signup check with right data',()=>{
wrapper = shallow(<DangKy />);
wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
wrapper.find('input[type="number"]').simulate('change', {target: {name: 'ma', value: '-111'}});
wrapper.find('button[type="submit"]').simulate('click');
expect(wrapper.state('isSignuped')).toBe(true);
})
it('signup check with right data with GV',()=>{
    wrapper = shallow(<DangKy />);
    wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
    wrapper.find('input[type="number"]').simulate('change', {target: {name: 'ma', value: '-111'}});
    wrapper.find('input[type="number"]').simulate('change', {target: {name: 'maGV', value: 'ABC'}});
    wrapper.find('button[type="submit"]').simulate('click');
    expect(wrapper.state('isSignuped')).toBe(true);
})
it('signup check with wrong data',()=>{
    wrapper = shallow(<DangKy />);
    wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: '1710137@dlu.edu.vn'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123'}});
    wrapper.find('input[type="number"]').simulate('change', {target: {name: 'ma', value: '111'}});
    wrapper.find('button[type="submit"]').simulate('click');
    expect(wrapper.state('isSignuped')).toBe(false);
    })
})