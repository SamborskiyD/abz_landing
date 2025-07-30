import Card from "../../ui/Card/Card";
import "../../ui/Link/Link.scss";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import "./Users.scss";
import useUsers from "./useUsers";

const Users = ({ usersHook }: { usersHook: ReturnType<typeof useUsers> }) => {
  const { users, showMore, hasMore, loading } = usersHook;
  return (
    <section id="users" className="users">
      <h2 className="title">Working with GET request</h2>
      <div className="cards">
        {users.map((user) => (
          <Card key={user.id} {...user} />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {hasMore && (
        <button onClick={showMore} className="button button__big">
          Show more
        </button>
      )}
    </section>
  );
};

export default Users;
