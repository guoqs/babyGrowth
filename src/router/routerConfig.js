
// import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/login'
import empty from '@/components/empty'
import bbgrowth from '@/components/bbgrowth'
import userInfo from '@/components/userInfo'
import topicList from '@/components/topicList'
import publishTopic from '@/components/publishTopic'
import my from '@/components/my'
import modifyHeadImg from '@/components/modifyHeadImg'
import modifySex from '@/components/modifySex'
import modifyCommon from '@/components/modifyCommon'
export default [
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '*',
    redirect: '/topic-list',
  },
  {
    path: '/bbgrowth',
    component: bbgrowth,
    redirect: '/topic-list',
    children:[{
      path: '/topic-list',
      component: topicList
    },{
      path: '/publish-topic',
      component: publishTopic
    },{
      path: '/my',
      component: empty,
      redirect: '/user-info',
      children:[{
          path: '/user-info',
          component: empty,
          children:[{
            path: '',
            component: userInfo
          },{
            path: 'modify-head-img',
            component: modifyHeadImg
          },{
            path: 'modify-sex',
            component: modifySex
          },{
            path: 'modify-nick-name',
            component: modifyCommon
          },{
            path: 'modify-mobile',
            component: modifyCommon
          },{
            path: 'modify-birthday',
            component: modifyCommon
          }]
        }]
    }]
  }
]