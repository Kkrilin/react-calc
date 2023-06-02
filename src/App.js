import { useReducer } from "react";
import DigitButton from "./Component/DigitButton";
import OperationButton from "./Component/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE: "delete_digit",
  EVEALUTE: "evalute",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand.length == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVEALUTE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = +previousOperand;
  const current = +currentOperand;
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="claculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)}
          {operation}
        </div>
        <div className="current-operand" id="display">
          {formatOperand(currentOperand)}
        </div>
      </div>

      <button
        id="clear"
        className="span-2"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button id="delete" onClick={() => dispatch({ type: ACTIONS.DELETE })}>
        DEL
      </button>
      <OperationButton id="divide" dispatch={dispatch}>
        ÷
      </OperationButton>
      <DigitButton id="seven" dispatch={dispatch}>
        7
      </DigitButton>
      <DigitButton id="eight" dispatch={dispatch}>
        8
      </DigitButton>
      <DigitButton id="nine" dispatch={dispatch}>
        9
      </DigitButton>
      <OperationButton id="multiply" dispatch={dispatch}>
        ×
      </OperationButton>
      <DigitButton id="four" dispatch={dispatch}>
        4
      </DigitButton>
      <DigitButton id="five" dispatch={dispatch}>
        5
      </DigitButton>
      <DigitButton id="six" dispatch={dispatch}>
        6
      </DigitButton>
      <OperationButton id="subtract" dispatch={dispatch}>
        -
      </OperationButton>
      <DigitButton id="one" dispatch={dispatch}>
        1
      </DigitButton>
      <DigitButton id="two" dispatch={dispatch}>
        2
      </DigitButton>
      <DigitButton id="three" dispatch={dispatch}>
        3
      </DigitButton>
      <OperationButton id="add" dispatch={dispatch}>
        +
      </OperationButton>
      <DigitButton id="decimal" dispatch={dispatch}>
        .
      </DigitButton>
      <DigitButton id="zero" dispatch={dispatch}>
        0
      </DigitButton>
      <button
        id="equals"
        className="span-2"
        onClick={() => dispatch({ type: ACTIONS.EVEALUTE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
