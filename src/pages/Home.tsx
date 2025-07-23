import CategorizedSection from "@/components/eCommerce/CategorizedHomeSection/CategorizedHomeSection";
import type { IProduct } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetAllProducts from "@/store/products/act/actGetAllProducts";
import { productsCleanUp } from "@/store/products/productsSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const [menProducts, setMenProducts] = useState<IProduct[]>([]);
  const [womenProducts, setWomenProducts] = useState<IProduct[]>([]);
  const [babyProducts, setBabyProducts] = useState<IProduct[]>([]);
  const [sportProducts, setSportProducts] = useState<IProduct[]>([]);

  const dispatch = useAppDispatch();
  const { records } = useAppSelector(state => state.products)

  useEffect(() => {
    const promise = dispatch(actGetAllProducts());
    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  useEffect(() => {
    const categorized: { [key: string]: IProduct[] } = {
      men: [],
      women: [],
      baby: [],
      sport: [],
    };

    records.forEach((product) => {
      if (categorized[product.cat_prefix]) {
        categorized[product.cat_prefix].push(product);
      }
    });

    setMenProducts(categorized.men);
    setWomenProducts(categorized.women);
    setBabyProducts(categorized.baby);
    setSportProducts(categorized.sport);
  }, [records]);

  return (
    <>
      <CategorizedSection title="Men Products" products={menProducts} />
      <CategorizedSection title="Women Products" products={womenProducts} />
      <CategorizedSection title="Baby Products" products={babyProducts} />
      <CategorizedSection title="Sport Products" products={sportProducts} />
    </>
  );
};

export default Home;
