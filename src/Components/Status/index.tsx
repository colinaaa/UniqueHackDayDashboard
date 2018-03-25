import * as React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Icon from 'antd/es/icon';
// import Button from 'antd/es/button';

import cls from './style.less';

export interface StatusProps {
  type: 'success' | 'warning' | 'error';
  statusText: string;
  // buttons: Array<{ type: ButtonType, title: string, key: string | number }>;
  buttons: React.ReactNode[];
}

const Status = (props: StatusProps) => {
  return (
    <Card bordered={false} type="inner" className={cls['status-card']}>
      <Row>
        <Col xs={24} sm={15} md={15}>
          <div className={cls['icon-title-wrapper']}>
            <Icon className={cls['icon-success']} type="check-circle" />
            <h1 className={cls['status-title']}>当前状态: {props.statusText}</h1>
          </div>
        </Col>
        <Col xs={24} sm={9} md={9}>
          <div className={cls['buttons-wrapper']}>
            {/* // The reason we reverse this array is `float: right` is used. */}
            {props.buttons.reverse()}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Status;
