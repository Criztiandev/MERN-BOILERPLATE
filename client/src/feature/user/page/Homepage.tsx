import useAccountStore from "@/feature/shared/store/useAccountStore";

const Homepage = () => {
  const { credentials } = useAccountStore();
  return <div className="">{credentials?.fullName}</div>;
};

export default Homepage;
