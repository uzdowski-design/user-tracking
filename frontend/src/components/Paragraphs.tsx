import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { paragraphText } from '../lorem';
import { UserAvatar } from './UserAvatar';

import axios from 'axios';

type User = {
  userId: string;
  scrolled: string;
  userName: string;
  avatar: string;
};

const Paragraphs = ({ user }: { user: User }) => {
  const avatarRef = useRef<HTMLImageElement>(null);
  const avatarPlaceholder =
    'https://robohash.org/quiaeta.png?size=300x300&set=set1';

  const [avatar, setAvatar] = useState<string>(avatarPlaceholder);
  const [userName, setUserName] = useState<string>('Mr Robot');

  useLayoutEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
    if (user.userName) {
      setUserName(user.userName);
    }
  }, [user]);

  useEffect(() => {
    const handleScrollEvent = () => {
      const handleScroll = () => {
        const userId = sessionStorage.getItem('userId');
        const scrolled = sessionStorage.getItem('scrolled');
        if (userId && scrolled !== 'true') {
          axios.post('/api/users/scroll', { userId });
          sessionStorage.setItem('scrolled', 'true');
        }
      };

      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          handleScroll();
        }
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <div>
      {Array.from({ length: 10 }, (_: unknown, i: number) => (
        <div key={i}>
          <h2 className="text-3xl underline text-center">Paragraph {i + 1}</h2>
          <p className="line-clamp-[20] my-4">{paragraphText}</p>
        </div>
      ))}
      <div className="mx-auto my-10 flex flex-col items-center align-center">
        <div ref={avatarRef}>
          <UserAvatar
            className="h-60 w-60"
            src={avatar || avatarPlaceholder}
            alt="User Avatar"
            username={userName}
          />
        </div>
        <h2 className="text-3xl font-bold mt-2">{userName || 'Mr Robot'}</h2>
      </div>
      {Array.from({ length: 10 }, (_: unknown, i: number) => (
        <div key={i + 10}>
          <h2 className="text-3xl underline text-center">Paragraph {i + 11}</h2>
          <p className="line-clamp-[20] my-4">{paragraphText}</p>
        </div>
      ))}
    </div>
  );
};

export default Paragraphs;
