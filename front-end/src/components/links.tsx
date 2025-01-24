import { Link, Text } from "native-base";
import { NavLink } from "react-router-dom";

export function Links() {
  return (
    <>
      <NavLink
        className={`${((navData: any) => (navData.isActive ? "link-active" : "link"))}`}
        to="/all-products">
        <Text fontWeight={"semibold"} fontSize="lg" marginRight={"50px"}>
          Products
        </Text>
      </NavLink>
      <Link
        mx="4"
        my={["4", "0"]}
        isExternal
        href="https://blog.geekyants.com/"
        isUnderlined={false}>
        <Text fontWeight={"semibold"} fontSize="lg" marginRight={"50px"}>
          Blogs
        </Text>
      </Link>
      <Link
        isExternal
        href="https://geekyants.com/#footer"
        isUnderlined={false}>
        <Text fontWeight={"semibold"} fontSize="lg" marginRight={"50px"}>
          Contact Us
        </Text>
      </Link>
    </>
  );
}
