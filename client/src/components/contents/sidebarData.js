export const dataLables = [
  
    {
      title: '시설 소개',
      value:1,
      active:false,
       submenu : [
       {
         title: '공간 소개',
         path:'/didinfo',
         index : 1
       },
       {
         title: '장비 소개',
         path:'/didinfo/info/equipinfo',
         index : 2
       },
        {
         title: "운영인력소개",
         path:'/didinfo/info/workerinfo',
         index : 3
        }
      ]
    },
    {
      title : '기관 소개',
      value:2,
      active:false,
      submenu : [
        {
          title: '인사말',
          path: "/info/greetings",
         index : 1
        },
        {
          title: '미션/비전',
          path: "/info/vision",
          index : 2
        },
         {
          title: "조직도",
          path: "/info/organization",
          index : 3
         },
         {
          title: "협력기관안내",
          path: "/info/partner",
          index : 4
         }
       ]
    },
    {
      title : '오시는 길',
      value:3,
      path: "/info/way",
    },
    {
      title : 'FAQ',
      value:4,
      path: "/info/faq",
    },
    {
       title : '장비 예약',
       value :5, 
    },
    {
        title : '공간 예약',
        value :6, 
     },
     {
        title : '전문 랩 투어',
        value :7, 
     },
     {
        title: '시제품제작관리',
        value:8,
        submenu:[
            {
                title: '상담신청',
                path:'/info/spaceinfo',
                index : 1
              },
              {
                title: '시제품제작신청',
                path:'/info/equipinfo',
                index : 2
              },               
        ]
     },
     {
      title:'시제품제작안내',
      value:9,
     },
     {
      title: "교육 프로그램",
      value:10,
     },
     {
      title: "행사 프로그램",
      value:11,
     },
     {
      title:'기업/회원관리',
      value:12,
      submenu:[
        {
          title:'기업 관리'
        },
        {
          title:'회원 관리'
        }
      ]
     }
  ]