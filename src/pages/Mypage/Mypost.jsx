import * as S from '../../styledComponents/Mypost';
import MypostListItem from './MypostListItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { supabase } from '../../service/supabase';
import { useState } from 'react';

const Mypost = () => {
  const { session } = useSelector((state) => state.user.userInfo);
  const [mypost, setMypost] = useState([]);

  useEffect(() => {
    const myPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('user_id', session.user.id);
      if (error) {
        console.log('error=>', error);
      } else {
        // console.log('data=>', data);
        setMypost(data);
      }
    };

    myPosts();
  }, [session]);
  console.log(mypost);
  return (
    <>
      <S.MypostBox>
        <S.Mypost>
          <ul>
            <li>내게시글</li>
            <li>팔로워</li>
            <li>찜목록</li>
          </ul>
        </S.Mypost>
        <S.MypostListBox>
          {mypost.map((item) => (
            <MypostListItem
              key={item.id}
              title={item.title}
              content={item.content}
              contentsId={item.id}
            />
          ))}
        </S.MypostListBox>
      </S.MypostBox>
    </>
  );
};

export default Mypost;
