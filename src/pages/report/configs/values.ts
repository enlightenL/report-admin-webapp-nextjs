import { ColumnType } from 'antd/lib/table';

export const filterTabs = [
  { label: '전체', value: 'all' },
  { label: '미작성', value: 'unwritten' },
  { label: '작성중', value: 'writing' },
  { label: '작성완료', value: 'completed' },
];

export const excelDownloadConfigs = [
  {
    title: '기본 정보',
    groupList: [
      {
        group: { label: '기본 정보', value: 'info' },
        itemList: [
          { label: '발전소 ID', value: 'siteId' },
          { label: '발전소명', value: 'siteName' },
          { label: '발전소 닉네임', value: 'siteNickname' },
          { label: '설비용량 (PV)', value: 'pvCapacity' },
          { label: '설비용량 (ESS)', value: 'essCapacity' },
          { label: '안전관리자 이름/연락처', value: 'safetyManager' },
          { label: '시건장치', value: 'lockingDevice' },
        ],
      },
    ],
  },
  {
    title: '발전소 정보',
    groupList: [
      {
        group: { label: '부지 정보', value: 'fs' },
        itemList: [
          { label: '상업운전개시일', value: 'operatedDate' },
          { label: '시공하자보증만료일', value: 'expiredDate' },
          { label: '부지유형', value: 'siteType' },
          { label: '지목', value: 'designation' },
          { label: '경사각', value: 'angle' },
          { label: '위도', value: 'latitude' },
          { label: '경도', value: 'longitude' },
          { label: '고도', value: 'altitude' },
          { label: '일사량', value: 'insolation' },
        ],
      },
      {
        group: { label: '설비 정보', value: 'equipment' },
        itemList: [
          { label: '인버터 제품정보', value: 'inverterInfo' },
          { label: 'ESS 제품정보', value: 'essInfo' },
          { label: '모듈 제품 정보', value: 'moduleInfo' },
          { label: '구조물 타입', value: 'structureType' },
        ],
      },
    ],
  },
  {
    title: '보고서 정보',
    groupList: [
      {
        group: { label: '보고서', value: 'report' },
        itemList: [
          { label: '보고서 링크', value: 'reportUrl' },
          { label: '보고서 작성상태', value: 'reportWritingStatus' },
          { label: '조치 신청 내역', value: 'actionList' },
        ],
      },
      {
        group: { label: '상세 점검 항목', value: 'detail' },
        itemList: [
          { label: '모듈', value: 'module' },
          { label: '전선로', value: 'wireLine' },
          { label: '인버터', value: 'inverter' },
          { label: '접속반', value: 'accessPanel' },
          { label: '수배전반', value: 'switchboard' },
          { label: '구조물', value: 'structure' },
          { label: '내부 부지', value: 'innerSite' },
          { label: 'ESS', value: 'ess' },
        ],
      },
    ],
  },
];

export const columns: ColumnType<any>[] = [
  {
    title: '보고서 No.',
    dataIndex: 'no',
    align: 'center',
  },
  {
    title: '발전소 ID',
    dataIndex: 'siteId',
    align: 'center',
  },
  {
    title: '발전소명',
    dataIndex: 'siteName',
    align: 'center',
  },
  {
    title: '회원명',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '연락처',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '용량(PV)',
    dataIndex: 'pvCapacity',
    align: 'center',
  },
  {
    title: '용량(ESS)',
    dataIndex: 'essCapacity',
    align: 'center',
  },
  {
    title: '발전소 주소',
    dataIndex: 'address',
    align: 'center',
  },
  {
    title: '업체명(작성자)',
    dataIndex: 'writer',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '조치 신청 여부',
    dataIndex: 'requestYn',
    align: 'center',
  },
  {
    title: '회차',
    dataIndex: 'step',
    align: 'center',
  },
  {
    title: '문자발송',
    dataIndex: 'smsSend',
    align: 'center',
  },
  {
    title: '문자발송일자',
    dataIndex: 'smsSendDate',
    align: 'center',
  },
  {
    title: '이메일발송',
    dataIndex: 'emailSend',
    align: 'center',
  },
  {
    title: '이메일발송일자',
    dataIndex: 'emailSendDate',
    align: 'center',
  },
  {
    title: '노출여부',
    dataIndex: 'show',
    align: 'center',
  },
  {
    title: '삭제',
    dataIndex: 'remove',
    align: 'center',
  },
];
