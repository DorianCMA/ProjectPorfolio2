import Dashboard from "../pages/Dashboard";
import PropType from "prop-types";

const Layout = ({ children }) => {

    return (
        <>
            <Dashboard />
            {children}
        </>
    )

}

Layout.propTypes = {
    children: PropType.node
}

export default Layout