import { ACTIONS } from "../App";

const DigitButton = ({ dispatch, children, id }) => {
  function buttonHandler() {
    console.log(children);
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: children } });
  }

  return (
    <button id={id} onClick={buttonHandler}>
      {children}
    </button>
  );
};

export default DigitButton;
