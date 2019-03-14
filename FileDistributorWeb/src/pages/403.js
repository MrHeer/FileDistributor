import React from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi/locale';
import Exception from '@/components/Exception';

export default () => (
    <Exception
      type="403"
      linkElement={Link}
      desc={formatMessage({ id: 'app.exception.description.403' })}
      backText={formatMessage({ id: 'app.exception.back' })}
      />
);
