import React from "react";
import { useSelector } from "react-redux";
// import ClipLoader from 'react-spinners/ClipLoader';
import FadeLoader from "react-spinners/FadeLoader";

export const Loader = () => {
  const loading = useSelector(state => {
    return state.loadingReducer.loading;
  });
  const styles = {
    // position: 'absolute',
    margin: "auto",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0"
  };

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#817e8152",
          top: 0
        }}
      >
        {loading && (
          <div>
            <FadeLoader
              css={styles}
              height={50}
              width={10}
              radius={30}
              margin={30}
              color={"#0d82c5"}
              loading={loading}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};
