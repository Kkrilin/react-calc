import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, children, id }) => {
  function operationButtonHandler() {
    dispatch({
      type: ACTIONS.CHOOSE_OPERATION,
      payload: { operation: children },
    });
  }
  return (
    <button id={id} onClick={operationButtonHandler}>
      {children}{" "}
    </button>
  );
};

export default OperationButton;
