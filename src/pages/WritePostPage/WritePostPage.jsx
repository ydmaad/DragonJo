import { Link } from 'react-router-dom';

const WritePostPage = ({ setPosts, supabase }) => {
  async function createPost() {
    const { data } = await supabase
      .from('posts')
      .insert({
        title: prompt('제목을 입력해주세요.'),
        content: prompt('내용을 입력해주세요.')
      })
      .select();

    setPosts((prev) => [...prev, ...data]);
  }

  return (
    <div>
      <button type="button" onClick={createPost}>
        작성
      </button>
      <Link to={`/`}>돌아가기</Link>
    </div>
  );
};

export default WritePostPage;
