import { useDispatch } from "react-redux";

const useFetching = (someFetchActionCreator) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(someFetchActionCreator());
  }, []);
};

export default useFetching;
