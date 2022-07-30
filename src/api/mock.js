import Mock from 'mockjs'
import homeApi from '../api/mockSeverData/homeApi.js'
import userApi from '../api/user'
import permissionApi from '../api/mockSeverData/permission'
//正则，接口与调用接口的函数需对应
Mock.mock('/home/getData',homeApi.getStatisticalData)   
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser) 

Mock.mock(/user\/getUser/,'get',userApi.getUserList) 
Mock.mock(/user\/del/,'get',userApi.deleteUser) 

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu) 