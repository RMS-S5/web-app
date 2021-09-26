import { CFooter } from "@coreui/react";
import React from "react";

const BMFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
       
        <span className="ml-1">&copy; 2021 SEP_G1.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          SEP_G1
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(BMFooter);
