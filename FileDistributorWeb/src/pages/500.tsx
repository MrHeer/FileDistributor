import React from "react";
import { Link } from "umi";
import { formatMessage } from "umi";
import { Result, Button } from "antd";

export default () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle={formatMessage({ id: "app.exception.description.500" })}
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
