import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Table, Card, Button, Pagination, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';

const Index = () => {
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(10);
    const init = useRequest<{ data: BasicListApi.Data }>(
        `/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
    );

    const searchLayout = () => {};

    const beforeTableLayout = () => {
        return (
            <Row>
                <Col xs={24} sm={12}>
                    ...
                </Col>
                <Col xs={24} sm={12} className={styles.tableToolbar}>
                    <Space>
                        <Button type="primary">Add</Button>
                        <Button type="primary">Add2</Button>
                    </Space>
                </Col>
            </Row>
        );
    };

    const paginationChangeHandler = (_page: number, _per_page: number | undefined) => {
        setPage(_page);
        setPerPage(_per_page || 10);
    };

    const afterTableLayout = () => {
        return (
            <Row>
                <Col xs={24} sm={6}>
                    ...
                </Col>
                <Col xs={24} sm={18} className={styles.tableToolbar}>
                    <Pagination
                        total={init.data?.meta.total || 0}
                        current={init.data?.meta.page || 1}
                        pageSize={init.data?.meta.per_page || 10}
                        showSizeChanger
                        showQuickJumper
                        showLessItems
                        showTotal={(total) => `Total ${total} items`}
                        onChange={paginationChangeHandler}
                        onShowSizeChange={paginationChangeHandler}
                    />
                </Col>
            </Row>
        );
    };

    useEffect(() => {
        init.run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, per_page]);

    return (
        <PageContainer>
            {searchLayout()}
            <Card>
                {beforeTableLayout()}
                <Table
                    rowKey="id"
                    dataSource={init?.data?.dataSource}
                    columns={init?.data?.layout?.tableColumn.filter(
                        (item: any) => !item.hideInColumn,
                    )}
                    pagination={false}
                    loading={init.loading}
                />
                {afterTableLayout()}
            </Card>
        </PageContainer>
    );
};

export default Index;

// https://www.yuque.com/aspirantzhang/antdprov5/fxn0s9
