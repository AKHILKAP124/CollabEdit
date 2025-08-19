import { useAuth0 } from "@auth0/auth0-react";
import { Loader2, Play } from "lucide-react";
import { useSelector } from "react-redux";
import {
  setError,
  setExecutionResult,
  setOutput,
  setRunning,
} from "../../../redux/EditorSlice";
import { LANGUAGE_CONFIG } from "../constants/index";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const RunButton = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const isRunning = useSelector((state) => state.editor.isRunning);
  const result = useSelector((state) => state.editor.executionResult);

  const runCode = async (code, language) => {
    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
        }),
      });

      const data = await response.json();

      console.log("data back from piston:", data);

      // handle API-level erros
      if (data.message) {
        dispatch(setError(data.message));
        dispatch(setExecutionResult({ code, output: "", error: data.message }));
        return;
      }

      // handle compilation errors
      if (data.compile && data.compile.code !== 0) {
        const error = data.compile.stderr || data.compile.output;

        dispatch(setError(error));
        dispatch(setExecutionResult({ code, output: "", error }));

        return;
      }

      if (data.run && data.run.code !== 0) {
        const error = data.run.stderr || data.run.output;

        dispatch(setError(error));
        dispatch(setExecutionResult({ code, output: "", error }));

        return;
      }

      // if we get here, execution was successful
      const output = data.run.output;
      console.log("Execution output:", output);
      dispatch(
        setExecutionResult({ code, output: output.trim(), error: null })
      );
      dispatch(setError(null));
      dispatch(setOutput(output.trim()));
    } catch (error) {
      console.log("Error running code:", error);
      dispatch(setError("Error running code"));
      dispatch(
        setExecutionResult({ code, output: "", error: "Error running code" })
      );
    } finally {
      // Reset running state after execution
      dispatch(setRunning(false));
    }
  };

  const handleRun = async () => {
    const language = "javascript"; // or use the selected language from state
    dispatch(setRunning(true)); // Set running state to true
    const code = `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`;
    await runCode(code, language);

    if (user && result) {
      console.log("User:", user);
      console.log("Execution Result:", result);
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
        cursor-pointer
      `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">
              Executing...
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
};
export default RunButton;
