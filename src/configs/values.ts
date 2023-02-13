import { ErrorConfig } from './types';

export const errorConfigs: { [statusCode: number]: ErrorConfig } = {
  404: {
    title: '페이지를 못찾겟어여',
    subTitle: '요청하신 URL에 대한 페이지가 없읍니다.',
    description: '주소를 제대로 써주세여',
    backButton: true,
    indexButton: true,
  },
};
