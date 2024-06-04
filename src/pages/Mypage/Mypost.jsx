import React from 'react';
import * as S from '../../styledComponents/Mypost';
import MypostListItem from './MypostListItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { supabase } from '../../service/supabase';
import { useState } from 'react';
const Mypost = () => {
  const { user } = useSelector((state) => state.user.userInfo);
  const [mypost, setMypost] = useState([]);

  useEffect(() => {
    const myPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('user_id', user.id);
      if (error) {
        console.log('error=>', error);
      } else {
        console.log('data=>', data);
        setMypost(data);
      }
    };

    myPosts();
  }, [user]);

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
          {mypost.map((item,index) => (
            <MypostListItem key={index} title={item.title} content={item.content}/>
          ))}
        </S.MypostListBox>
      </S.MypostBox>
    </>
  );
};

export default Mypost;
