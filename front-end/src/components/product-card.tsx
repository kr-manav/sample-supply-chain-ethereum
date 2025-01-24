import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

import { useLocation, useNavigate } from "react-router-dom";

import { Product } from "../repository/interfaces";
import { getNumberOfDays } from "../utils/daysLeft";
import { epochToDate } from "../utils/epochToDate";
import { Barcode } from "./barcode";

import { ThemeButton } from "./theme-button";
import { Loading } from "./loading";
import { useApiCall } from "../hooks/hooks";

export const ProductCard = ({
  item,
  loading,
  setShowModal,
  setProductSelected,
}: {
  item: Product;
  loading: Boolean;
  setShowModal?: (arg0: boolean) => void;
  setProductSelected?: (args0: Product) => void;
}) => {
    const { setMyProductListLoading } = useApiCall();
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return loading ? (
    <Loading />
  ) : (
    <Pressable
      m="4"
      mx={["auto", 4]}
      cursor={"initial"}
      _hover={{ shadow: "1" }}
      borderRadius="14px"
    >
      <VStack
        // alignItems={"center"}
        space={[3, 6]}
        padding={["4", "3"]}
        borderRadius="14px"
        w={"100%"}
        bgColor="white"
      >
        <VStack
          justifyContent={"center"}
          alignItems="center"
          width={["25vw", "15vw"]}
          height={["5vh", "15vh"]}
        >
          <Image
            borderRadius="14px"
            source={{
              uri: item.productImage,
            }}
            fallbackSource={{
              uri: "https://api.time.com/wp-content/uploads/2020/11/pfizer-vaccine-1.jpg?w,1600,quality,70",
            }}
            alt={item.scientificName}
            size={["md", "xl"]}
          />
        </VStack>

        <HStack
          space={1}
          width={["15vh"]}
          alignSelf="flex-start"
          justifyContent={"space-between"}
        >
          <VStack>
            <Text
              color="coolGray.600"
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize={["md"]}
              textOverflow="ellipsis"
              whiteSpace={"nowrap"}
              overflow="hidden"
            >
              {item.name}
            </Text>
            <Text
              fontSize={["10", "sm"]}
              fontWeight="light"
              textTransform="uppercase"
              color="coolGray.500"
            >
              {item.barcodeId}
            </Text>
            <Text
              fontSize={["8", "xs"]}
              fontWeight="thin"
              textTransform="uppercase"
              color="coolGray.600"
            >
              Mfg: {epochToDate(item.manDateEpoch)}
            </Text>
            <Text
              fontSize={["8", "xs"]}
              fontWeight="thin"
              textTransform="uppercase"
              color="coolGray.600"
            >
              Expires in {getNumberOfDays(item.manDateEpoch, item.expDateEpoch)}{" "}
              days
            </Text>
          </VStack>
          <VStack alignItems={"end"} justifyContent={"flex-end"}>
            {pathname === "/all-products" && (
              <Box ml={3}>
                <Barcode data={item.barcodeId} />
              </Box>
            )}

            {pathname === "/my-products" && setShowModal && (
              <ThemeButton
                ml="2"
                handleOnPress={() => {
                  setShowModal(true);
                  setProductSelected && setProductSelected(item);
                  setMyProductListLoading(true)
                }}
                width="6rem"
                text={" Sell"}
              />
            )}
            <ThemeButton
              mb={["2", "0"]}
              ml="10"
              mt={["2", "2"]}
              handleOnPress={() =>
                navigate(`/product/${item.barcodeId}`, { state: pathname })
              }
              text={"View Details"}
              width={["6rem"]}
            />
          </VStack>
        </HStack>
        <VStack space={3}></VStack>
      </VStack>
    </Pressable>
  );
};
