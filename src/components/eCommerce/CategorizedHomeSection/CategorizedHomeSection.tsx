import Heading from "@/components/common/Heading/Heading";
import ProductInfo from "../ProductInfo/ProductInfo";
import type { IProduct } from "@/interfaces";

const CategorizedHomeSection = ({ title, products }: { title: string; products: IProduct[] }) => (
    <div className=" sx:my-3">
        <Heading title={title + " :"} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {products.map((pro) => <ProductInfo key={pro.id} {...pro} />)}
        </div>
    </div>
);

export default CategorizedHomeSection