export interface ExcelDownloadFormDataType {
  all: boolean;
  'info-all': boolean;
  info: ('siteId' | 'siteName' | 'siteNickname' | 'pvCapacity' | 'essCapacity' | 'safetyManager' | 'lockingDevice')[];
  'fs-all': boolean;
  fs: (
    | 'operatedDate'
    | 'expiredDate'
    | 'siteType'
    | 'designation'
    | 'angle'
    | 'latitude'
    | 'longitude'
    | 'altitude'
    | 'insolation'
  )[];
  'equipment-all': boolean;
  equipment: ('inverterInfo' | 'essInfo' | 'moduleInfo' | 'structureType')[];
  'report-all': boolean;
  report: ('reportUrl' | 'reportWritingStatus' | 'actionList')[];
  'detail-all': boolean;
  detail: ('module' | 'wireLine' | 'inverter' | 'accessPanel' | 'switchboard' | 'structure' | 'innerSite' | 'ess')[];
}
