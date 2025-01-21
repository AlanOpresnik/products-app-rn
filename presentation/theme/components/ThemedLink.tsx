import React from "react";
import { Link, LinkProps } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends LinkProps {}

const ThemedLink = ({style, ...props}: Props) => {
  const primary = useThemeColor({}, "primary");
  return (
    <Link
      {...props}
      style={[
        {
          color: primary,
        },
        style
      ]}
    />
  );
};

export default ThemedLink;
