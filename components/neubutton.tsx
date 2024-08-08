import { cn } from "@/lib/utils"

interface NeuButtonProps {
    text: string;
    backgroundColor?: string;
}

const NeuButton = ({ text, backgroundColor }: NeuButtonProps) => {
    return (
        <button
        className={cn(
            "font-medium text-white p-4 rounded-3xl",
            backgroundColor || "bg-orange-500"
        )}
    >
        {text}
    </button>
    )
    return (
        <button
            className={cn(
                "px-6 py-2 font-medium text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]",
                backgroundColor || "bg-orange-500"
            )}
        >
            {text}
        </button>
    );
};

export default NeuButton;