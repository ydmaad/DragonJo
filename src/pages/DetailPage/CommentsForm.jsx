import { useEffect, useState } from 'react';
import { supabase } from '../../service/supabase';
import { useSelector } from 'react-redux';

export const CommentsForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const user_name = useSelector((state) => console.log(state));
  console.log(user_name);

  const handleTextareaChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('comments').insert({
        content: comment,
        post_id: postId
        // writer:
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
      {/* 댓글작성하는 곳 */}

      <div>
        {comments.map((comment) => {
          console.log(comment);

          return (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>{comment.created_at}</p>
              {/* 날짜 자르기 slice */}
            </div>
          );
        })}
      </div>
    </>
  );
};
