import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReportStatus, SendStatus } from '@/graphql/schema';

import ListTable from '.';

describe('', () => {
  it('', async () => {
    const data = Array(5)
      .fill(1)
      .map((_, i) => ({
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
        status: [ReportStatus.Unwritten, ReportStatus.Unwritten, ReportStatus.Completed][+faker.random.numeric(3) % 3],
        requestYn: ['Y', 'N'][+faker.random.numeric(3) % 2],
        step: +faker.random.numeric(2),
        smsSend: [SendStatus.Send, SendStatus.Resend, SendStatus.Disabled][+faker.random.numeric(3) % 3],
        smsSendDate: dayjs(faker.date.past(2)).format('YYYY-MM-DD'),
        emailSend: [SendStatus.Send, SendStatus.Resend, SendStatus.Disabled][+faker.random.numeric(3) % 3],
        emailSendDate: dayjs(faker.date.past(2)).format('YYYY-MM-DD'),
        show: +faker.random.numeric(3) % 2 === 0,
      }));
    render(
      <ListTable
        data={data}
        count={3}
      />
    );
    expect(screen.queryByText(data[0].name)).toBeInTheDocument();
    expect(screen.queryByText(data[1].name)).toBeInTheDocument();
    expect(screen.queryByText(data[2].name)).toBeInTheDocument();
    expect(screen.queryByText(data[3].name)).not.toBeInTheDocument();
    expect(screen.queryByText(data[4].name)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTitle('2'));
    expect(screen.queryByText(data[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(data[1].name)).not.toBeInTheDocument();
    expect(screen.queryByText(data[2].name)).not.toBeInTheDocument();
    expect(screen.queryByText(data[3].name)).toBeInTheDocument();
    expect(screen.queryByText(data[4].name)).toBeInTheDocument();
  });
});
