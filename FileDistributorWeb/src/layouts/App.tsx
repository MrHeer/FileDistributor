import React, { FC, useEffect, useMemo } from "react";
import { ConfigProvider } from "antd";
import { getLocale } from "umi";
import BasicLayout from "./BasicLayout";

import zhCN from "antd/lib/locale-provider/zh_CN";
import enUS from "antd/lib/locale-provider/en_US";

const App: FC = (props) => {
  const antdLocale = useMemo(() => {
    if (getLocale() === "zh-CN") {
      return zhCN;
    } else {
      return enUS;
    }
  }, []);

  return (
    <ConfigProvider locale={antdLocale}>
      <BasicLayout>{props.children}</BasicLayout>
    </ConfigProvider>
  );
};

export default App;
