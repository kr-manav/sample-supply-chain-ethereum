/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, HStack, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Footer, Header, ProductCard } from "../../components";
import { SaleModal } from "./components";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import { Product } from "../../repository/interfaces";
import Fab from "../../components/fab";
import { useApiCall } from "../../hooks/hooks";
import { SupplyChainService } from "../../repository/supplyChain";
import { toastSuccess } from "../../utils/toastMessages";
import { Loading } from "../../components/loading";

export function MyProductsPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product>(
    {} as Product
  );
  const [productList, setProductList] = useState<Product[]>();
  const { isUserLoggedIn } = useSelector(
    (state: RootState) => state.generalReducer
  );

  const { getMyProducts, myProductListLoading, setMyProductListLoading } =
    useApiCall();
  const { myProducts, searchedProducts } = useSelector(
    (state: RootState) => state.generalReducer
  );

  useEffect(() => {
    getMyProducts();
    listenToEvent();
  }, []);
  const listenToEvent = async () => {
    SupplyChainService.getInstance()
      .getContract()
      .on(
        "productOwnershipTransfer",
        async (
          name,
          manufacturerName,
          scientificName,
          barcodeId,
          buyerName,
          buyerEmail,
          event
        ) => {
          console.log("event", name);

          getMyProducts();
          toastSuccess("New Product successfully added");
        }
      );
  };

  useEffect(() => {
    console.log("Product list loading");
    !myProductListLoading && setProductList(myProducts);
  }, [myProductListLoading, showModal]);

  useEffect(() => {
    setProductList(searchedProducts);
  }, [searchedProducts]);
  return (
    <>
      <VStack maxW="100vw" minH="100vh" bg="violet.50">
        <Header />
        <VStack w="100%" minH="85vh" alignItems="center" p="2">
          {myProductListLoading ? (
            <Loading />
          ) : !myProductListLoading &&
            productList &&
            productList.length === 0 ? (
            <Heading mt={20}>No Products Found</Heading>
          ) : (
            <HStack
              py={5}
              mt={[5, 20]}
              width={["100%", "96vw"]}
              alignItems="center"
              justifyContent={"flex-start"}
              flexWrap={"wrap"}
            >
              {productList &&
                productList.map((item: Product) => (
                  <ProductCard
                    key={item.barcodeId}
                    item={item}
                    loading={myProductListLoading}
                    setShowModal={setShowModal}
                    setProductSelected={setProductSelected}
                  />
                ))}
            </HStack>
          )}
        </VStack>
        {isUserLoggedIn && <Fab />}
        <Footer />
      </VStack>
      <SaleModal
        setLoading={setMyProductListLoading}
        productSelected={productSelected}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}
