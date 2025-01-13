/* eslint-disable react/prop-types */
function Toaster({ message, textColorClass }) {
    return (
        <article className={`fixed top-4 right-6 shadow-lg bg-slate-400 w-[200px] rounded-md font-semibold px-3 py-5 ${textColorClass}`}>
            <p>{message}</p>
        </article>
    )
}

export default Toaster;