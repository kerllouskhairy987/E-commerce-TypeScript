import axiosInstance from "@/config/axios.config";
import { useState } from "react"


type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed"
const useCheckEmailAvailability = () => {

    const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle")
    const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setEnteredEmail(email);
        setEmailAvailabilityStatus("checking");

        try {
            const { data } = await axiosInstance.get(`/users?email=${email}`);

            if (!data.length) {
                setEmailAvailabilityStatus("available")
            } else {
                setEmailAvailabilityStatus("notAvailable")
            }
        } catch (error) {
            setEmailAvailabilityStatus("failed")
            console.log(error)
        }
    }

    const resetCheckEmailAvailability = () => {
        setEmailAvailabilityStatus("idle");
        setEnteredEmail(null);
    }


    return { emailAvailabilityStatus, checkEmailAvailability, enteredEmail, resetCheckEmailAvailability }
}

export default useCheckEmailAvailability