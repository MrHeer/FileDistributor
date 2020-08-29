import React from "react";
import { Link } from "umi";
import { formatMessage } from "umi";
import { Result, Button } from "antd";

export default () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: "app.exception.description.404" })}
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
