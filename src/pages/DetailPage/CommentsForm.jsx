import { useEffect, useState } from 'react';
import { supabase } from '../../service/supabase';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const CommentsForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const user_name = useSelector((state) => state.user.userInfo.user.name);
  console.log(user_name);

  const handleTextareaChange = (e) => {
    setComment(e.target.value);
  };
  // 완료)리덕스에 있는 user정보 가져오기 (로그인한 유저정보)
  // 완료)리변수에 이름 저장(로그인한 유저정보에서 가져옴)=> 18번줄 writer 정보에 넣어주기
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('comments').insert({
        content: comment,
        post_id: postId,
        writer: user_name
      });
      console.log(data, error);
      // 댓글 작성 후 입력창 초기화
      setComment('');
      // 댓글 작성 후 댓글 목록 다시 불러오기
      getComments();
    } catch (error) {
      console.log(error);
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
      }
    };
    getComments(); // postId가 변경될 때마다 실행될 비동기 작업
  }, [postId]); // postId가 변경될 때마다 useEffect가 실행됩니다.

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">댓글</label>
        <textarea name="comment" id="comment" type="text" onChange={handleTextareaChange} value={comment} />
        <button>저장</button>
      </form>
      {/* 댓글작성하는 곳  comment.writer 작성*/}
      <div>
        {comments.map((comment) => {
          const createdAt = new Date(comment.created_at);
          const year = createdAt.getFullYear();
          const month = ('0' + (createdAt.getMonth() + 1)).slice(-2);
          const day = ('0' + createdAt.getDate()).slice(-2);
          const hour = ('0' + createdAt.getHours()).slice(-2);
          const minute = ('0' + createdAt.getMinutes()).slice(-2);
          return (
            <div key={comment.id}>
              <p>{comment.writer}</p>
              <p>{comment.content}</p>
              <p>{`${year}-${month}-${day} ${hour}:${minute}`}</p>
              <button onClick={() => handleDelete(comment.id, comment.writer)}>삭제</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
