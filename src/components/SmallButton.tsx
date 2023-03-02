import type { AppProps } from "next/app";
import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface SmallButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	label: string;
	disabled?: boolean;
}

export function SmallButton({ label, disabled, ...props }: SmallButtonProps) {
	return (
		<button
			className={
				"text-center text-text-white text-button-small rounded-md w-16 h-11 disabled:cursor-not-allowed bg-gradient-bl-primary-background disabled:bg-ux-inactive"
			}
			disabled={disabled}
			{...props}
		>
			<div></div>
			{label}
		</button>
	);
}
