import React from 'react';
import * as RiIcons from 'react-icons/ri';


export const SidebarData = [
  {
    title: '서비스',
    path: '/service',
    value: 1,
    active: false,
    type: "dropdown",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    submenus: [
      {
        title: '상담 내역',
        path: '/service/counsel',

      },
      {
        title: '신청 내역',
        path: '/service/application',

      },
      {
        title: '진행 내역',
        path: '/service/process',

      },
      {
        title: '반려 내역',
        path: '/service/reject',

      },
      {
        title: '지원 기업',
        path: '/service/company',

      }
    ]
  },
  {
    title: '기자재',
    path: '/materials',
    value: 2,
    active: false,
    type: "dropdown",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    submenus: [
      {
        title: '자재 품목',
        path: '/materials/items',


      },
      {
        title: '자재 사용',
        path: '/materials/imports',

      },
      {
        title: '자재별 재고 보유량',
        path: '/materials/amount',

      },
      {
        title: '자재 관리 장비현황',
        path: '/materials/equipment',

      }
    ]
  },
  {
    title: '사용자',
    path: '/users',
    vlaue: 3,
    active: false,
    type: "dropdown",

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    submenus: [
      {
        title: '사용자 통계',
        path: '/users/stastics',

      },
      {
        title: '사용자 서비스 통계',
        path: '/users/service',

      },
      {
        title: '사용자 목적 통계',
        path: '/users/purpose',

      },
    ]
  }
]
