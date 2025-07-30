import { useEffect, useState } from "react";

const USERS_PER_PAGE = 6;

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const getUsers = async (page: number) => {
      setLoading(true);
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_API_URL}/users?page=${page}&count=${USERS_PER_PAGE}`
        );
        const data = await resp.json();
        setUsers((prev) => [...prev, ...data.users]);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers(currentPage);
  }, [currentPage, reloadKey]);

  const showMore = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const reload = () => {
    setUsers([]);
    setCurrentPage(1);
    setReloadKey((prev) => prev + 1);
  };

  const hasMore = currentPage < totalPages;

  return {
    users,
    loading,
    hasMore,
    showMore,
    reload,
  };
};

export default useUsers;
