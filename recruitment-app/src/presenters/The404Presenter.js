import { observer } from "mobx-react-lite";
import View404 from "../views/404";


/**
 * Return the view of 404
 * @returns 
 */
function the404Presenter() {
    return <View404 />;
}

export default observer(the404Presenter);
