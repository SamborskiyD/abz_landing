import Hero from "./features/Hero/Hero";
import NavBar from "./features/NavBar/NavBar";
import SignUp from "./features/SignUp/SignUp";
import Users from "./features/Users/Users";
import useUsers from "./features/Users/useUsers";

function App() {
  const usersHook = useUsers();
  return (
    <div className="main-container">
      <NavBar />
      <Hero />
      <Users usersHook={usersHook} />
      <SignUp reload={usersHook.reload} />
    </div>
  );
}

export default App;
