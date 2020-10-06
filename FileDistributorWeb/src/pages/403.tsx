import React from "react";
import { Link } from "umi";
import { useIntl } from "umi";
import { Result, Button } from "antd";

export default () => {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: "app.exception.description.403" })}
      extra={
        <Link type="primary" to="/">
          <Button type="primary">
            {formatMessage({ id: "app.exception.back" })}
          </Button>
        </Link>
      }
    />
  );
};
