import { Suspense } from "react";
// @ts-ignore: Unreachable code error
import AuthApp from "AuthApp/App";

function App() {
  return (
    <>
      <div>This is the Finance micro frontend</div>
      <Suspense fallback="Loading AuthApp...">
        <AuthApp />
      </Suspense>
    </>
  );
}

export default App;
