// react imports
import { lazy, Suspense } from "react";
// react router
import { createBrowserRouter } from "react-router";
// lazy loading pages
// Layout
const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"))
const ProfileLayout = lazy(() => import("@/layouts/ProfileLayout/ProfileLayout"))
// pages
const AboutUs = lazy(() => import("@/pages/AboutUs"))
const Cart = lazy(() => import("@/pages/Cart"))
const Categories = lazy(() => import("@/pages/Categories"))
const Home = lazy(() => import("@/pages/Home"))
const Products = lazy(() => import("@/pages/Products"))
const Login = lazy(() => import("@/pages/Login"))
const Register = lazy(() => import("@/pages/Register"))
const Wishlist = lazy(() => import("@/pages/Wishlist"))
const Account = lazy(() => import("@/pages/Account"))
const Orders = lazy(() => import("@/pages/Orders"))
// error
import Error from "@/pages/Error";

import PageSuspenseFallback from "@/components/feedback/PageSuspenseFallback/PageSuspenseFallback";
import LottieHandlers from "@/components/feedback/LottieHandlers/LottieHandlers";
// protecting routes
import ProtectingRoute from "@/components/auth/ProtectingRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <LottieHandlers type="LazyLoading" message="loading please wait ..." error={false} />
            </div>
        }>
            <MainLayout />
        </Suspense>,
        errorElement: <Error />,
        children: [
            { index: true, element: <PageSuspenseFallback><Home /></PageSuspenseFallback> },
            {
                path: "categories/products/:prefix",
                element: <PageSuspenseFallback><Products /></PageSuspenseFallback>,
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
            { path: "categories", element: <PageSuspenseFallback><Categories /></PageSuspenseFallback> },
            { path: "cart", element: <PageSuspenseFallback><Cart /></PageSuspenseFallback> },
            {
                path: "wishlist", element:
                    <ProtectingRoute>
                        <PageSuspenseFallback>
                            <Wishlist />
                        </PageSuspenseFallback>
                    </ProtectingRoute>
            },
            { path: "about-us", element: <PageSuspenseFallback><AboutUs /></PageSuspenseFallback> },
            { path: "login", element: <PageSuspenseFallback><Login /></PageSuspenseFallback> },
            { path: "register", element: <PageSuspenseFallback><Register /></PageSuspenseFallback> },
            {
                path: "profile", element:
                    <ProtectingRoute>
                        <PageSuspenseFallback>
                            <ProfileLayout />
                        </PageSuspenseFallback>
                    </ProtectingRoute>,
                    children: [
                        {index: true, element: <Account />},
                        {path: "orders", element: <Orders />}
                    ]
            },
        ]
    },
]);
