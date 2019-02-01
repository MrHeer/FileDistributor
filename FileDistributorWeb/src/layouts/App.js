import { Component } from 'react';
import { LocaleProvider } from 'antd';
import { getLocale } from 'umi/locale';
import BasicLayout from './BasicLayout';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS  from 'antd/lib/locale-provider/en_US';

class App extends Component {
    render() {
        var antdLocale;
        if (getLocale() === 'zh-CN') {
            antdLocale = zhCN;
        } else {
            antdLocale = enUS;
        }

        return (
            <LocaleProvider locale={ antdLocale }>
              <BasicLayout>
                { this.props.children }
              </BasicLayout>
            </LocaleProvider>
        )
    }
}

export default App;
