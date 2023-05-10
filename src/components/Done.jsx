import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Done = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/mySubmissions`);
    
  };

  return (
    <>
   <ToastContainer />
      <div className="card card-header container d-flex align-items-center justify-content-center w-50 mt-5 py-5">
        <div className="h2 mb-3">Done !</div>
        <button
          type="button"
          className="btn px-2 fw-lighter border-0 align-bottom text-primary"
          value="showSubmissions"
          onClick={handleClick}
        >
          Show all Submissions
        </button>
      </div>
    </>
  );
};

export default Done;
