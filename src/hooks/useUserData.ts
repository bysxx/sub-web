import { useEffect, useState } from 'react';

interface UserData {
  userId: string;
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

export const useUserData = (userId: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`/server/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.product);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  return userData;
};
