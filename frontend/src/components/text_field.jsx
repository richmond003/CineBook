import { TextField, InputAdornment } from "@mui/material"

function TextFieldComponent({name, label, placeholder, type, required, slotProps, onChange, value, error}){
    return(
        <>
         <TextField
            fullWidth
            name={name}
            // id="outlined-basic"
            error = {error} 
            label={label || "Lable"}
            variant="outlined"
            placeholder={placeholder || ""}
            type={type || "text"}
            required = {required || true}
            slotProps={slotProps}
            onChange={onChange}
            value={value}
            size="small"
            sx={{
            '& .MuiOutlinedInput-root': {
                color: 'white', // text color
                '& fieldset': {
                borderColor: 'white', // default border
                },
                '&:hover fieldset': {
                borderColor: 'whitesmoke', // hover border
                },
                '&.Mui-focused fieldset': {
                borderColor: 'white', // focused border
                },
            },
            '& .MuiInputLabel-root': {
                color: 'white', // label color
                '&.Mui-focused': {
                color: 'white', // focused label color
                },
            },
            }}
        />
    </>
    )
}


export function PasswordField({name, label, error, onChange, value, helperText}){
    return (
        <>
             <TextField
                name={name}
                helperText={helperText}
                fullWidth
                error={error}
                // id="outlined-basic"
                label={label || "Lable"}
                variant="outlined"
                type= "password"
                required 
                onChange={onChange}
                value={value}
                size="small"
                slotProps= {{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <div className="text-amber-200">EYE</div>
                            </InputAdornment>
                        )
                    }
                }}
                sx={{
                '& .MuiOutlinedInput-root': {
                    color: 'white', // text color
                    '& fieldset': {
                    borderColor: 'white', // default border
                    },
                    '&:hover fieldset': {
                    borderColor: 'whitesmoke', // hover border
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'white', // focused border
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'white', // label color
                    '&.Mui-focused': {
                    color: 'white', // focused label color
                    },
                },
                }}
            />
        </>
    )
}

export default TextFieldComponent