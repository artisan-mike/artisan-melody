import { cn } from 'cn';

export function Button({
    children,
    className,
    ...rest
}: React.ComponentProps<'button'>) {
    return (
        <button
            className={cn(
                'border-4 w-6 h-6 flex justify-center items-center rounded-2 border-t-gray-500 outline-2 outline-gray-900 border-r-gray-500 border-l-gray-700 border-b-gray-700 cursor-pointer relative active:border-2 active:text-yellow-300',
                className,
            )}
            {...rest}
        >
            <span aria-hidden={true}></span>
            {children}
        </button>
    );
}
