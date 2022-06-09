import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <h1>What To Watch</h1>
            <h2>Landing Page</h2>
            <Link to="/login">
                <button>Go</button>
            </Link>
        </div>
    );
}

export default LandingPage;