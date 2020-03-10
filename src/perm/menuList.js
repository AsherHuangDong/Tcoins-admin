const menuList = function () {
  return [
    {
      path: '/otcs',
      name: 'otcs',
      permId: 1,
      show: false,
      title: 'OTC承兑商管理',
      children:[
        {
          path: '/applyList',
          name: 'applyList',
          permId: 2,
          show: false,
          title: '承兑商申请列表'
        },
        {
          path: '/teamManagement',
          name: 'teamManagement',
          permId: 3,
          show: false,
          title: '团队管理'
        },
        {
          path: '/memberManagement',
          name: 'memberManagement',
          permId: 4,
          show: false,
          title: '承兑商会员管理'
        },
        {
          path: '/personJiangli',
          name: 'personJiangli',
          permId: 5,
          show: false,
          title: '个人激励发放记录'
        },
      ]
    }
  ]
};

export default menuList;
