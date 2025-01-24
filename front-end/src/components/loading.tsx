import { HStack } from "native-base";
import { ThreeCircles } from "react-loader-spinner";

export const Loading = () => {
  return (
    <HStack mt={20} justifyContent={"center"}>
      <ThreeCircles
        color="blue"
        height={110}
        width={110}
        ariaLabel="three-circles-rotating"
      />
    </HStack>
  );
};
