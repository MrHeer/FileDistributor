import { Component } from 'react';
import { Row,
         Col,
         Card,
         Upload,
         Button,
         Icon
       } from 'antd';
import { formatMessage } from 'umi/locale';

class FileDistribute extends Component {
    state = {
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        }],
    }

    handleChange = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return false;
        });

        this.setState({ fileList });
    }

    render() {
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
            multiple: true,
        };

        return (
            <Row gutter={5}>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'chose_file'}) }
                  style={{ height: 600 }}>
                  <Upload {...props} fileList={this.state.fileList}>
                    <Button>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'chose_host'}) }
                  style={{ height: 600 }}>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'distribute_file'}) }
                  style={{ height: 600 }}>
                </Card>
              </Col>
            </Row>
        )
    }
}

export default FileDistribute;
