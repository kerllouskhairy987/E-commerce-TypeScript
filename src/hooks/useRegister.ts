import { useEffect } from "react";
import { useForm } from "react-hook-form"
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";
import type { SubmitHandler } from "react-hook-form";
import { signUpSchema, type TSignUpType } from "@/validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actAuthRegister from "@/store/auth/act/actAuthRegister";
import { useNavigate } from "react-router";
import { accountCleanUpData } from "@/store/auth/authSlice";



const useRegister = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, error, accessToken } = useAppSelector(state => state.auth)


    const {
        register,
        handleSubmit,
        getFieldState,
        trigger,
        reset,
        formState: { errors: formErrors },
    } = useForm<TSignUpType>({
        mode: "onBlur",
        resolver: zodResolver(signUpSchema)
    })

    const submitForm: SubmitHandler<TSignUpType> = (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(actAuthRegister({ firstName, lastName, email, password }))
            .unwrap()
            .then(() => navigate("/login?message=account_created"))
        reset();
    }

    // check email
    const { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability()
    const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email")
        const value = e.target.value
        const { isDirty, invalid } = getFieldState("email")
        // console.log({ isDirty, invalid })
        if (isDirty && !invalid && enteredEmail !== value) {
            // checking
            checkEmailAvailability(e.target.value)
        }

        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability()
        }
    }

    useEffect(() => {
        dispatch(accountCleanUpData())
    }, [dispatch])


    return {
        loading, error, accessToken, register,
        handleSubmit, formErrors, submitForm, emailAvailabilityStatus, emailOnBlurHandler
    }
}

export default useRegister