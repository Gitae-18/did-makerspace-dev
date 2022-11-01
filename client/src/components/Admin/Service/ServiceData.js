import React from 'react';
import * as RiIcons from 'react-icons/ri';


export const ServiceData = [
  {
    title: '시제품 제작',
    path: '/prototype',
    value: 1,
    active: false,
    type: "dropdown",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    submenus: [
      {
        title: '시제품 제작 관리',
        path: '/prototype/management',

      },
      {
        title: '상담 신청 관리',
        path: '/prototype/application',

      },
    ]
  }
]
