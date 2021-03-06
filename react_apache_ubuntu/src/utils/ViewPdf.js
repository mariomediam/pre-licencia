import React from "react";

export const ViewPdf = () => {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">Therichpost.com</h1>
      </div>
      <div className="container p-5">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Open PDF
        </button>

        <div
          className="modal fade"
          id="exampleModal"
        //   tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content" style={{ height: "500px" }}>
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="exampleModalLabel">
                  PDF
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <iframe
                  src="https://therichpost.com/sample.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                ></iframe> */}
                <div className="ratio ratio-16x9">
                  <iframe
                    src="http://127.0.0.1:8000/api/licfunc/view/requisito-archivo/8#toolbar=0&navpanes=0&scrollbar=0"
                    frameBorder="0"
                    scrolling="auto"
                    title="YouTube video"
                    height="100%"
                    width="100%"
                  ></iframe>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
