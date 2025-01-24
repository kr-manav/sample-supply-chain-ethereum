/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, HStack, VStack } from "native-base";
import { Footer, Header, ProductCard } from "../../components";
import { useApiCall } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { Product } from "../../repository/interfaces";
import Fab from "../../components/fab";
import { useCallback, useEffect, useState } from "react";
import { SupplyChainService } from "../../repository/supplyChain";
import { toastSuccess } from "../../utils/toastMessages";
import { Loading } from "../../components/loading";

export const AllProducts = () => {
  const { productListLoading, getProducts } =
    useApiCall();
  const { products, isUserLoggedIn, searchedProducts } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const [productList, setProductList] = useState<Product[]>();

  const listenToEvent = useCallback(async () => {
    console.log("add p event");
    SupplyChainService.getInstance()
      .getContract()
      .on(
        "newProduct",
        async (
          name,
          manufacturerName,
          scientificName,
          barcodeId,
          manDateEpoch,
          expDateEpoch,
          event
        ) => {
          console.log("name", event);
          getProducts();
          toastSuccess("New Product successfully added");
        }
      );
  }, []);

  useEffect(() => {
    getProducts();
    listenToEvent();
  }, [getProducts, listenToEvent]);

  useEffect(() => {
    !productListLoading && setProductList(products);
  }, [productListLoading, products]);

  useEffect(() => {
    setProductList(searchedProducts);
  }, [searchedProducts]);

  return (
    <VStack maxW="100vw" minH="100vh" bg="violet.50">
      <Header />
      <VStack w="100%" minH="85vh" alignItems="center" p="2">
        {productListLoading ? (
          <Loading />
        ) : !productListLoading && productList && productList.length === 0 ? (
          <Heading mt={20}>No Products Found</Heading>
        ) : (
          <HStack
            py={5}
            mt={[5, 20]}
            width={["100%", "96vw"]}
            alignItems="flex-start"
            justifyContent="start"
            flexWrap="wrap"
            // spacing={"4"} // Add spacing between rows
            px={[4, 8]} // Add equal horizontal padding for proper alignment
            gap={6} // Space between items
          >
            {productList &&
              productList.map((item: Product) => (
                <ProductCard
                  key={item.barcodeId || Date.now()}
                  item={item}
                  loading={productListLoading}
                />
              ))}
          </HStack>
        )}
      </VStack>
      {isUserLoggedIn && <Fab />}
      <Footer />
    </VStack>
  );
};
