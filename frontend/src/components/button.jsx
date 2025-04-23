
function Button({title, handclick, style, icon}){
    return(
        <div onClick={handclick} className={`flex flex-row items-center justify-center gap-2 ${style}`}>
            <div>
                {icon}
            </div>

            <h1>{title}</h1>
        </div>
    )
}

export default Button