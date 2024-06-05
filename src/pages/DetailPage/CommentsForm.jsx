import { useEffect, useState } from 'react';
import { supabase } from '../../service/supabase';

export const CommentsForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const handleTextareaChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('comments').insert({
        content: comment,
        post_id: postId
      });
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
      console.log(data, error);
    };
    getComments();
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">댓글</label>
      <textarea name="comment" id="comment" type="text" onChange={handleTextareaChange} value={comment} />
      <button>저장</button>
    </form>
  );
};
