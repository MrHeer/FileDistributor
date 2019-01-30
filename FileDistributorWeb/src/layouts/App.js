import { Component } from 'react';
import { LocaleProvider } from 'antd';
import { getLocale } from 'umi/locale';
import BasicLayout from './BasicLayout';

import zhCN from 'antd/lib/locale-provider/zh_CN';

class App extends Component {
    render() {
        const locale = getLocale();

        return (
            <LocaleProvider locale={ locale }>
              <BasicLayout>
                { this.props.children }
              </BasicLayout>
            </LocaleProvider>
        )
    }
}

export default App;
