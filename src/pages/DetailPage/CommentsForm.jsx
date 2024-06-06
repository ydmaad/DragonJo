import { useEffect, useState } from 'react';
import { supabase } from '../../service/supabase';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Wrapper,
  Form,
  Label,
  Textarea,
  Button,
  CommentContainer,
  Comment,
  CommentAuthor,
  CommentContent,
  CommentDate,
  DeleteButton
} from './CommentsForm.styles';

export const CommentsForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const user_name = useSelector((state) => state.user.userInfo.user.name);
  console.log(user_name);

  const handleTextareaChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('comments').insert({
        content: comment,
        post_id: postId,
        writer: user_name
      });
      console.log(data, error);
      setComment('');
      // getComments();
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(true);
    }
  };

  const handleDelete = async (commentId, commentWriter) => {
    if (commentWriter !== user_name) {
      Swal.fire({
        icon: 'error',
        title: '삭제 불가',
        text: '작성자만 댓글을 삭제할 수 있습니다.'
      });
      return;
    }

    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) {
        console.error('Error deleting comment:', error.message);
      } else {
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
        if (error) {
          console.error('Error fetching comments:', error.message);
        } else {
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      } finally {
        setRefetch(false);
      }
    };
    getComments();
  }, [postId, refetch]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="comment">댓글 남기기</Label>
        <Textarea
          name="comment"
          id="comment"
          type="text"
          onChange={handleTextareaChange}
          value={comment}
          placeholder="댓글 작성"
        />
        <Button type="submit">저장</Button>
      </Form>
      <CommentContainer>
        {comments.map((comment) => {
          const createdAt = new Date(comment.created_at);
          const year = createdAt.getFullYear();
          const month = ('0' + (createdAt.getMonth() + 1)).slice(-2);
          const day = ('0' + createdAt.getDate()).slice(-2);
          const hour = ('0' + createdAt.getHours()).slice(-2);
          const minute = ('0' + createdAt.getMinutes()).slice(-2);
          return (
            <Comment key={comment.id}>
              <CommentAuthor>{comment.writer}</CommentAuthor>
              <CommentContent>{comment.content}</CommentContent>
              <CommentDate>{`${year}-${month}-${day} ${hour}:${minute}`}</CommentDate>
              <DeleteButton onClick={() => handleDelete(comment.id, comment.writer)}>삭제</DeleteButton>
            </Comment>
          );
        })}
      </CommentContainer>
    </Wrapper>
  );
};
