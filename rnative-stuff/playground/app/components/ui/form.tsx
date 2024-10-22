import * as React from "react";
import type * as LabelPrimitive from "@rn-primitives/label";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Controller {...props} />
			</KeyboardAvoidingView>
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const FormItem = React.forwardRef<
	React.ElementRef<typeof View>,
	React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<View ref={ref} className={cn("space-y-2", className)} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
	Omit<React.ElementRef<typeof LabelPrimitive.Text>, "nativeID">,
	Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>, "nativeID">
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={cn(error && "text-destructive", className)}
			nativeID={formItemId}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
	React.ElementRef<typeof View>,
	React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<View
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return (
		<Text
			ref={ref}
			id={formDescriptionId}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<Text
			ref={ref}
			id={formMessageId}
			className={cn("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</Text>
	);
});
FormMessage.displayName = "FormMessage";

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
