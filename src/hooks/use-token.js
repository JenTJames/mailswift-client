const useToken = () => {
  const token = localStorage.getItem("token");
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};
export default useToken;
