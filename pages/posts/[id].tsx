import { unwrapResult } from '@reduxjs/toolkit';
import { Avatar, Card, List, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchAuthor,
  fetchCommentsById,
  fetchPostById,
} from '../../src/services/postSlice';
import { RootState, useAppDispatch } from '../../src/store';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { post, comments, author, isLoading } = useSelector(
    (state: RootState) => state.post,
  );

  useEffect(() => {
    if (id)
      dispatch(fetchPostById(id as string)).then((res) => {
        const a = unwrapResult(res);
        dispatch(fetchAuthor(a.userId));
      });
    if (id) dispatch(fetchCommentsById(id as string));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <span>{author?.name}</span>

      <h2>Comments</h2>
      <List
        itemLayout='horizontal'
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              title={comment?.email}
              description={comment?.body}
            />
          </List.Item>
        )}
      />
    </>
  );
}
