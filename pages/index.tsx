import { Avatar, Card, Col, Row, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../src/services/postsSlice';
import { RootState, useAppDispatch } from '../src/store';
import Link from 'next/link';

const { Meta } = Card;

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  if (!posts.length) {
    return <div style={{ textAlign: 'center' }}>No Posts ❌</div>;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {posts?.map((post) => (
          <Col
            className='gutter-row'
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={post?.id}
          >
            <Card
              size='small'
              style={{ height: '100%' }}
              extra={
                <DeleteOutlined
                  key='delete'
                  onClick={() => dispatch(deletePost(post?.id))}
                />
              }
              title={<Link href={`posts/${post?.id}`}>{post?.title}</Link>}
            >
              <Meta
                avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
                description={post?.body}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
