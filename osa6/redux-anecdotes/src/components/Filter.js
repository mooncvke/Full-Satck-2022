import { useSelector, useDispatch } from "react-redux";
import filterReducer, { createFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterReducer);

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault();
    const content = event.target.value;
    console.log("content", content);
    dispatch(createFilter(content));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
