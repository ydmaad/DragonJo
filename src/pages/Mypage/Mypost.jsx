import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../service/supabase';
import * as S from '../../styledComponents/Mypost';
import MypostListItem from './MypostListItem';

const Mypost = () => {
  const { user } = useSelector((state) => state.user.userInfo);
  const [mypost, setMypost] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = ['내 게시글', '팔로워', '찜목록'];
  useEffect(() => {
    const myPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*', 'images').eq('user_id', user.id);
      if (error) {
        console.log('error=>', error);
      } else {
        // console.log('data=>', data);
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
            {menuItems.map((item, index) => (
              <S.Menuitem
                key={index}
                $active={activeIndex === index}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                {item}
              </S.Menuitem>
            ))}
          </ul>
        </S.Mypost>
        <S.MypostListBox>
          {activeIndex === 0 ? (
            mypost.length !== 0 ? (
              mypost.map((item) => (
                <MypostListItem
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  contentsId={item.id}
                  image={item.images}
                />
              ))
            ) : (
              <S.Notification>게시글이 없습니다.</S.Notification>
            )
          ) : activeIndex === 1 ? (
            <S.Notification>팔로워 없습니다.</S.Notification>
          ) : activeIndex === 2 ? (
            <S.Notification>찜목록이 없습니다.</S.Notification>
          ) : (
            <S.Notification>아무거소도 없습니다.</S.Notification>
          )}
        </S.MypostListBox>
      </S.MypostBox>
    </>
  );
};

export default Mypost;
