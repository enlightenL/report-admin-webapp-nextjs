import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

export interface TableDataType {
  no: number;
  siteId: string;
  siteName: string;
  name: string;
  phone: string;
  pvCapacity: number;
  essCapacity: number;
  address: string;
  writer: string;
  createdAt: string;
  status: '미작성' | '작성중' | '작성완료';
  requestYn: 'Y' | 'N';
  step: number;
  smsSend: 'send' | 'resend' | 'disabled';
  smsSendDate: string;
  emailSend: 'send' | 'resend' | 'disabled';
  emailSendDate: string;
  show: boolean;
}

export default function useMock() {
  const [tableData, setTableData] = useState<TableDataType[]>([]);

  useEffect(() => {
    setTableData(
      Array(100)
        .fill(1)
        .map(
          (_, i) =>
            ({
              no: i + 1,
              siteId: faker.random.numeric(8),
              siteName: faker.name.fullName(),
              name: faker.name.fullName(),
              phone: faker.phone.number('010-####-####'),
              pvCapacity: +faker.random.numeric(3),
              essCapacity: +faker.random.numeric(3),
              address: faker.address.streetAddress(true),
              writer: faker.name.fullName(),
              createdAt: dayjs(faker.date.past(2)).format('YYYY-MM-DD'),
              status: ['미작성', '작성중', '작성완료'][+faker.random.numeric(3) % 3],
              requestYn: ['Y', 'N'][+faker.random.numeric(3) % 2],
              step: +faker.random.numeric(2),
              smsSend: ['send', 'resend', 'disabled'][+faker.random.numeric(3) % 3],
              smsSendDate: dayjs(faker.date.past(2)).format('YYYY-MM-DD'),
              emailSend: ['send', 'resend', 'disabled'][+faker.random.numeric(3) % 3],
              emailSendDate: dayjs(faker.date.past(2)).format('YYYY-MM-DD'),
              show: +faker.random.numeric(3) % 2 === 0,
            } as TableDataType)
        )
    );
  }, []);

  return { tableData };
}
