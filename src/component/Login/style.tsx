import { SxProps, Theme } from "@mui/material";


export const SxPaper: SxProps<Theme> = {
    height: '100vh',
    width:'100vw',
    bgcolor:'#61dafb',
    position: 'relative',
}

export const SxPaperWrapper: SxProps<Theme>={
    position: 'absolute',
    top: '50%',
    right:'35%',
    transform: 'translateY(-50%)',
}

export const SxFormWapper: SxProps<Theme> = {
    
    width:'400px',
    height:'500px',
    maxWidth:'calc(100vh - 3rem)',
    maxHeight:'calc(100vh - 3rem)',
}

export const SxTitle: SxProps<Theme>={
    textAlign:'center',
    pt:2,
    pb:5,
}