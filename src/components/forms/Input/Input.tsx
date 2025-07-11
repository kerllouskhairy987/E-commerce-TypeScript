import { Form } from "react-bootstrap";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TProps<TFieldValue extends FieldValues> = {
    label: string;
    name: Path<TFieldValue>;
    type?: string;
    register: UseFormRegister<TFieldValue>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error: string;
    formText?: string;
    success?: string;
    disabled?: boolean;
}


const Input = <TFieldValue extends FieldValues>({ label, name, type = "text", register, onBlur, error, formText, success, disabled }: TProps<TFieldValue>) => {


    const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e);
            register(name).onBlur(e);
        } else {
            register(name).onBlur(e);
        }
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name)}
                onBlur={onblurHandler}
                isInvalid={error ? true : false}
                isValid={success ? true : false}
                disabled={disabled} 
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
            {formText && <Form.Text className="text-muted">{formText}</Form.Text>}
        </Form.Group>
    )
}

export default Input