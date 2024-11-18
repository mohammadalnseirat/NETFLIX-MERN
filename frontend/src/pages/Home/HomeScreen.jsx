import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logOut } = useAuthStore();
  return (
    <div>
      HomeScreen
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
};

export default HomeScreen;
