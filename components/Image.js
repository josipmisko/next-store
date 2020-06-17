import React from "react";
import useNativeLazyLoading from "@charlietango/use-native-lazy-loading";
import { useInView } from "react-intersection-observer";

// This is a wrapper for cloudynary Image handler
// Could be replace by any asset provider

const CD_API =
  process.env.CD_API ||
  "https://res.cloudinary.com/vercel/image/upload/v1592403664/";

export default ({ width, height, publicId, ...rest }) => {
  let initialProps = { width, height, publicId, ...rest };

  const supportsLazyLoading = useNativeLazyLoading();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <div
      ref={!supportsLazyLoading ? ref : undefined}
      className="relative block overflow-hidden ease-in"
      style={{
        position: "relative",
        paddingBottom: `${
          height > 0 && width > 0 ? (height / width) * 100 : 100
        }%`,
        background: "#edf2f7",
      }}
    >
      {inView || supportsLazyLoading ? (
        // <Image loading="lazy" {...initialProps} />
        <img
          {...rest}
          src={`https://res.cloudinary.com/vercel/image/upload/${
            height ? `h_${height},` : ""
          }${width ? `w_${width},` : ""}/v1592403664/${publicId}`}
          width={width}
          height={height}
          loading="lazy"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      ) : null}
    </div>
  );
};
