// Pages
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AboutUs from "@/pages/AboutUs";
import Cart from "@/pages/Cart";
import Categories from "@/pages/Categories";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
// react router dom
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "categories/products/:prefix",
                element: <Products />,
                loader: async ({ params }) => {
                    // console.log(params)
                    if (typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400
                        })
                    }
                    return true
                }
            },
            { path: "categories", element: <Categories /> },
            { path: "cart", element: <Cart /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ]
    },
]);
