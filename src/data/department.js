export const sector = [
  {
    id: 1,
    name: "الإدارة المركزية للمراكز الإقليمية التخطيطية",
    departments: [
      {
        deptId: 1,
        deptName: "الإدارة المركزية للمراكز الإقليمية التخطيطة",
        sub: [
          "المركز الإقليمي لتخطيط وتنمية إقليم القاهرة الكبرى",
          "المركز الإقليمي لتخطيط وتنمية إقليم الدلتا",
          "المركز الإقليمي لتخطيط وتنمية إقليم قناة السويس",
          "المركز الإقليمي لتخطيط وتنمية إقليم أسيوط",
          "المركز الإقليمي لتخطيط وتنمية إقليم شمال الصعيد",
          "المركز الإقليمي لتخطيط وتنمية إقليم جنوب الصعيد",
          "المركز الإقليمي لتخطيط وتنمية إقليم الإسكندرية",
          "الإدارة العامة لشئون المراكز الإقليمية",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "إدارة التخطيط القومي والإقليمي والبحوث والدراسات",
    departments: [
      {
        deptId: 2,
        deptName: "الإدارة العامة للدراسات والبحوث الطبيعية",
        sub: ["إدارة وجه بحري", "إدارة وجه قبلي", "إدارة المحافظات النائية"],
      },
      {
        deptId: 3,
        deptName: "الإدارة العامة للتخطيط القومي والإقليمي",
        sub: [],
      },
      {
        deptId: 4,
        deptName: "الإدارة العامة لتخطيط أقاليم شمال الجمهورية",
        sub: [],
      },
      {
        deptId: 5,
        deptName: "الإدارة العامة لتخطيط أقاليم جنوب الجمهورية",
        sub: [],
      },
      {
        deptId: 6,
        deptName: "الإدارة العامة للدراسات والبحوث السكانية والاجتماعية",
        sub: [
          "إدارة الدراسات والبحوث السكانية",
          "إدارة الدراسات والبحوث الاجتماعية",
        ],
      },
      {
        deptId: 7,
        deptName: "الإدارة العامة للدراسات والبحوث الاقتصادية",
        sub: ["إدارة دراسات التنمية الاقتصادية", "إدارة دراسات الجدوى"],
      },
    ],
  },
  {
    id: 3,
    name: "إدارة التخطيط والتنمية العمرانية",
    departments: [
      {
        deptId: 8,
        deptName:
          "الإدارة العامة للتخطيط والتنمية العمرانية لمدن وقرى وجه بحري",
        sub: ["مدن وجه بحري", "قرى وجه بحري"],
      },
      {
        deptId: 9,
        deptName:
          "الإدارة العامة للتخطيط والتنمية العمرانية لمدن وقرى وجه قبلي",
        sub: ["مدن وجه قبلي", "قرى وجه قبلي"],
      },
      {
        deptId: 10,
        deptName:
        "الإدارة العامة للتخطيط والتنمية العمرانية لمدن وقرى المحافظات النائية",

        sub: [
          "مدن وقرى محافظتي سيناء الشمالية والجنوبية",
          "مدن وقرى محافظتي الوادي الجديد والبحر الأحمر",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "الإدارة المركزية لتخطيط هياكل البنية الأساسية",
    departments: [
      {
        deptId: 11,
        deptName:
          "الإدارة العامة لتخطيط الطرق والنقل والموانئ",
        sub: [
          "إدارة تخطيط الطرق",
          "إدارة تخطيط النقل والمرور",
          "إدارة تخطيط الموانئ",
        ],
      },
      {
        deptId: 12,
        deptName: "الإدارة العامة لتخطيط المياه والصرف الصحي",
        sub: ["إدارة تخطيط المياه", "إدارة تخطيط الصرف الصحي"],
      },
      {
        deptId: 13,
        deptName:
          "الإدارة العامة لتخطيط الكهرباء والاتصالات",
        sub: [
          "إدارة تخطيط الكهرباء والطاقة",
          "إدارة تخطيط الاتصالات",
        ],
      },
      {
        deptId: 14,
        deptName: "الإدارة العامة للأعمال التكميلية",
        sub: ["إدارة المساحة", "إدارة الدراسات الجيوتقنية"],
      },
    ],
  },
];

export const internal = [
  "الإدارة العامة لنظم المعلومات والتحول الرقمي",
  "الإدارة العامة للإدارة الاستراتيجية",
  "الإدارة العامة للمكتب الفني",
  "الإدارة العامة للمرصد الحضري",
  "الإدارة العامة للتعاون الدولي والعلاقات الخارجية",
  "لجنة الحيز العمراني",
];

// export const department = [
//   {
//     id: 1,
//     department: "1. Central Department for Regional Planning",
//     sub: [
//       "Cairo Region Planning",
//       "Delta Region Planning",
//       "Suez Canal Region Planning",
//       "Assiut Region Planning",
//       "North Upper Egypt Region Planning",
//       "Southern Upper Egypt Region Planning",
//       "Alex Region Planning",
//     ],
//     sectorId: 1,
//   },
//   {
//     id: 2,
//     department: "2. General Department for Research and Natural Studies",
//     sub: [
//       "Lower Egypt Department",
//       "Upper Egypt Department",
//       "Other Governrate Department",
//     ],
//   },
//   {
//     id: 3,
//     department: "3. General Department for National and Regional Planning",
//     sub: [],
//   },
//   {
//     id: 4,
//     department: "4. General Department for North Regions Planning",
//     sub: [],
//   },
//   {
//     id: 5,
//     department: "5. General Department for South Regions Planning",
//     sub: [],
//   },
//   {
//     id: 6,
//     department: "6. General Department for Population and Social Studies",
//     sub: [
//       "Population Studies and Research Department",
//       "Social Studies and Research Department",
//     ],
//   },
//   {
//     id: 7,
//     department: "7. General Department for Economic Studies",
//     sub: [
//       "Economic Development Studies Department",
//       "Feasibility Studies Department",
//     ],
//   },
//   {
//     id: 8,
//     department:
//       "8. The General Department of Planning and Urban Development for the Cities and Villages of Lower Egypt",
//     sub: ["Cities Department", "Villages Department"],
//   },
//   {
//     id: 9,
//     department:
//       "9. The General Department of Planning and Urban Development for the Cities and Villages of Upper Egypt",
//     sub: ["Cities Department", "Villages Department"],
//   },
//   {
//     id: 10,
//     department:
//       "10. The General Department of Planning and Urban Development for the Cities and Villages of the Following Governrate",
//     sub: [
//       "Cities and Villages in North and South Sinai",
//       "Cities and Villages in New Valley and Red Sea Governorates",
//     ],
//   },
//   {
//     id: 11,
//     department:
//       "11. The General Department for Roads, Transport and Ports Planning",
//     sub: [
//       "Road Planning Department",
//       "Transportation and Traffic Planning Department",
//       "port planning department",
//     ],
//   },
//   {
//     id: 12,
//     department: "12. The General Department of Water and Sanitation Planning",
//     sub: ["Water Planning Department", "Sanitary Planning Department"],
//   },
//   {
//     id: 13,
//     department:
//       "13. General Department of Electricity and Communications Planning",
//     sub: [
//       "Electricity and Energy Planning Department",
//       "Communications planning Department",
//     ],
//   },
//   {
//     id: 14,
//     department: "14. Urban Space Committee",
//     sub: [],
//   },
// ];

// export const sector = [
//   {
//     id: 1,
//     name: "الإدارة المركزية للمراكز الإقليمية التخطيطية",
//     departments: [
//       {
//         deptId: 1,
//         deptName: "1. Central Department for Regional Planning",
//         sub: [
//           "Cairo Region Planning",
//           "Delta Region Planning",
//           "Suez Canal Region Planning",
//           "Assiut Region Planning",
//           "North Upper Egypt Region Planning",
//           "Southern Upper Egypt Region Planning",
//           "Alex Region Planning",
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "إدارة التخطيط القومي والإقليمي والبحوث والدراسات",
//     departments: [
//       {
//         deptId: 2,
//         deptName: "2. General Department for Research and Natural Studies",
//         sub: [
//           "Lower Egypt Department",
//           "Upper Egypt Department",
//           "Other Governrate Department",
//         ],
//       },
//       {
//         deptId: 3,
//         deptName: "3. General Department for National and Regional Planning",
//         sub: [],
//       },
//       {
//         deptId: 4,
//         deptName: "4. General Department for North Regions Planning",
//         sub: [],
//       },
//       {
//         deptId: 5,
//         deptName: "5. General Department for South Regions Planning",
//         sub: [],
//       },
//       {
//         deptId: 6,
//         deptName: "6. General Department for Population and Social Studies",
//         sub: [
//           "Population Studies and Research Department",
//           "Social Studies and Research Department",
//         ],
//       },
//       {
//         deptId: 7,
//         deptName: "7. General Department for Economic Studies",
//         sub: [
//           "Economic Development Studies Department",
//           "Feasibility Studies Department",
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "إدارة التخطيط والتنمية العمرانية",
//     departments: [
//       {
//         deptId: 8,
//         deptName:
//           "8. The General Department of Planning and Urban Development for the Cities and Villages of Lower Egypt",
//         sub: ["Cities Department", "Villages Department"],
//       },
//       {
//         deptId: 9,
//         deptName:
//           "9. The General Department of Planning and Urban Development for the Cities and Villages of Upper Egypt",
//         sub: ["Cities Department", "Villages Department"],
//       },
//       {
//         deptId: 10,
//         deptName:
//           "10. The General Department of Planning and Urban Development for the Cities and Villages of the Following Governrate",
//         sub: [
//           "Cities and Villages in North and South Sinai",
//           "Cities and Villages in New Valley and Red Sea Governorates",
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "الإدارة المركزية لتخطيط هياكل البنية الأساسية",
//     departments: [
//       {
//         deptId: 11,
//         deptName:
//           "11. The General Department for Roads, Transport and Ports Planning",
//         sub: [
//           "Road Planning Department",
//           "Transportation and Traffic Planning Department",
//           "port planning department",
//         ],
//       },
//       {
//         deptId: 12,
//         deptName:
//           "12. The General Department of Water and Sanitation Planning",
//         sub: ["Water Planning Department", "Sanitary Planning Department"],
//       },
//       {
//         deptId: 13,
//         deptName:
//           "13. General Department of Electricity and Communications Planning",
//         sub: [
//           "Electricity and Energy Planning Department",
//           "Communications planning Department",
//         ],
//       },
//       {
//         deptId: 14,
//         deptName: "الإدارة العامة للأعمال التكميلية",
//         sub: ["إدارة المساحة", "إدارة الدراسات الجيوتقنية"],
//       },
//     ],
//   },
// ];
