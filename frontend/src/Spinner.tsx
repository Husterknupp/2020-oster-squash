import { keyframes, stylesheet } from "typestyle";
import React, { ReactElement } from "react";

// https://loading.io/css/

const keyFrames = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
const styles = stylesheet({
  spinnerContainer: {
    display: "inline-block",
    position: "relative",
    width: "80px",
    top: "-19px",
    transform: "scale(35%)",
    $nest: {
      "& div": {
        animation: `${keyFrames} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        transformOrigin: "40px 40px"
      },
      "& div:after": {
        content: '" "',
        display: "block",
        position: "absolute",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "#fff",
        margin: "-4px 0 0 -4px"
      },
      "& div:nth-child(1)": {
        animationDelay: "-0.036s"
      },
      "& div:nth-child(1):after": {
        top: "63px",
        left: "63px"
      },
      "& div:nth-child(2)": {
        animationDelay: "-0.072s"
      },
      "& div:nth-child(2):after": {
        top: "68px",
        left: "56px"
      },
      "& div:nth-child(3)": {
        animationDelay: "-0.108s"
      },
      "& div:nth-child(3):after": {
        top: "71px",
        left: "48px"
      },
      "& div:nth-child(4)": {
        animationDelay: "-0.144s"
      },
      "& div:nth-child(4):after": {
        top: "72px",
        left: "40px"
      },
      "& div:nth-child(5)": {
        animationDelay: "-0.18s"
      },
      "& div:nth-child(5):after": {
        top: "71px",
        left: "32px"
      },
      "& div:nth-child(6)": {
        animationDelay: "-0.216s"
      },
      "& div:nth-child(6):after": {
        top: "68px",
        left: "24px"
      },
      "& div:nth-child(7)": {
        animationDelay: "-0.252s"
      },
      "& div:nth-child(7):after": {
        top: "63px",
        left: "17px"
      },
      "& div:nth-child(8)": {
        animationDelay: "-0.288s"
      },
      "& div:nth-child(8):after": {
        top: "56px",
        left: "12px"
      }
    }
  }
});

export function Spinner(): ReactElement {
  return (
    <div className={styles.spinnerContainer}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
