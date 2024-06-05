import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  _id: string;
  nickname: string;
  roomId: string;
  balance: number;
  stockAssets: {
    stockId: string;
    count: number;
    average: number;
    _id: string;
  }[];
}

const DEFAULT_USERID = '665fe166d061b2718711f064';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId') || DEFAULT_USERID;

    fetch(`/server/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.product);
        }
      })
      .catch((error) => {
        router.push('/login');
        // eslint-disable-next-line no-console
        console.error('Error fetching user data:', error);
      });
  }, []);

  return userData;
};
