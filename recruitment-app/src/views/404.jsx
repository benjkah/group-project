import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

/**
 * The view of 404 error
 * @returns 
 */
function View404() {
  
  const navigate = useNavigate();


  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>404</h2>
      

        <button type="button" onClick={() => navigate("/")}>
          Home agen?
        </button>
        
    </div>
  );
}

export default observer(View404);