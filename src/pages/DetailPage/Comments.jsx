// 불러오는 댓글을 props 내려줘서 map으로 돌려 댓글 목록을 그려주는 로직
// import { useEffect } from 'react';
// import { CommentsForm } from './CommentsForm';
// import { supabase } from '../../service/supabase';

// const Commnets = ({ Comments, setComments, postId }) => {
//   useEffect(() => {
//     const fetchComments = async () => {
//       const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
//       if (error) {
//         console.error('에러:', error);
//       } else {
//         setComments(data);
//       }
//     };
//     fetchComments();
//   }, []);

//   console.log(data);

//   return (
//     <>
//       <ul>
//         <ol type="text">댓글목록입니다.</ol>
//         <ol type="text">댓글목록입니다.</ol>
//         <ol type="text">댓글목록입니다.</ol>
//       </ul>
//     </>
//   );
// };

// export default Commnets;
