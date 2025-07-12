import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router";

import type { SubmitHandler } from "react-hook-form";
import { signInSchema, type TSignInType } from '@/validation/signInSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import actAuthLogin from "@/store/auth/act/actAuthLogin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { accountCleanUpData } from "@/store/auth/authSlice";



const useLogin = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, accessToken } = useAppSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<TSignInType>({
        mode: "onBlur",
        resolver: zodResolver(signInSchema)
    })

    const submitForm: SubmitHandler<TSignInType> = (data) => {
        if (searchParams.get("message")) {
            setSearchParams("")
        }
        dispatch(actAuthLogin(data))
            .unwrap()
            .then(() => navigate("/"))
    }

    useEffect(() => {
        dispatch(accountCleanUpData())
    }, [dispatch])



    return { loading, error, accessToken, searchParams, register, handleSubmit, submitForm, formErrors }
}

export default useLogin