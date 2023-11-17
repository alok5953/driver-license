import not_found from "../../../../src/Images/not_found.png";

import "./WrongPageRedirect.css";

 const WrongPageRedirect = () => {
  return (
    <div id="main">
    <div className="fof text-center">
          <span className="d-block not_found_span mb-2"><img src={not_found} alt="image"/></span>
          <h1><b>Page not found</b></h1>
          <h3>The page you are looking for doesn't exist</h3>
          <h3>or has been moved.</h3>
    </div>
</div>
  );
};
export default WrongPageRedirect;

