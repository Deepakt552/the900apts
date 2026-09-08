import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border-[#d6d8e5] text-[#1a1f2c] bg-white shadow-2xs focus:border-[#c77950] focus:ring-2 focus:ring-[#c77950]/20 transition-all placeholder:text-gray-400 text-sm ' +
                className
            }
            ref={localRef}
        />
    );
});
