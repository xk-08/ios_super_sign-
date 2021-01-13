import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Personal from './components/Personal'
import AllApp from './components/AppAll'
import UploadApp from './components/UploadApp'
import CertAll from "./components/CertAll";
import UploadCert from "./components/UploadCert";
import UserAll from "./components/UserAll";
import DownRecord from "./components/DownRecord";
import DownCode from "./components/DownCode";
import PackRecord from "./components/PackRecord";
import StartPack from "./components/StartPack";
import UploadAppSign from "./components/UploadAppSign";
import SignRecord from "./components/SignRecord";
import SoftwareDistribute from "./components/SoftwareDistribute";
import DistributeRecord from "./components/DistributeRecord";
import UploadEnterpriseCert from "./components/UploadEnterpriseCert";

Vue.use(VueRouter)

  const routes = [

]

const router = new VueRouter({
  routes: [
    { path: '/login', component : Login},
    { path: '/', redirect: '/login'},
    {
      path: '/Home',
      component : Home,
      redirect: '/Personal',
      children: [
          { path: '/Personal', component : Personal},
          { path: '/AppAll', component : AllApp},
          { path: '/UploadApp', component : UploadApp},
          { path: '/CertAll', component : CertAll},
          { path: '/UploadCert', component : UploadCert},
          { path: '/UserAll', component : UserAll},
          { path: '/DownRecord', component : DownRecord},
          { path: '/DownCode', component : DownCode},
          { path: '/PackRecord', component : PackRecord},
          { path: '/StartPack', component : StartPack},
          { path: '/UploadAppSign', component : UploadAppSign},
          { path: '/SignRecord', component : SignRecord},
          { path: '/SoftwareDistribute', component : SoftwareDistribute},
          { path: '/DistributeRecord', component : DistributeRecord},
          { path: '/UploadEnterpriseCert', component : UploadEnterpriseCert}
      ]
    }
  ]
})

export default router
