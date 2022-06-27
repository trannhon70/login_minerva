import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, forwardRef, ForwardRefRenderFunction, KeyboardEvent, MouseEvent, useState } from "react";
import { SxFormWapper, SxPaper, SxPaperWrapper, SxTitle } from "./style";
import { useNavigate  } from "react-router-dom";
export interface FormRef {

}

export interface FormProps {
    username?:string;
    password?: string ; 
}

export type ImessageColor = 'error' | 'success' | '';
export type IMessageFied = 'username' | 'password' | '';

export interface IMessage {
    content: string; 
    color: ImessageColor;
    field: IMessageFied;
}

const message = (
    content: string,
    field: IMessageFied ='',
    color: ImessageColor = ''
): IMessage =>({content, color, field});

const getMessage = (message: IMessage, field: IMessageFied)=> message.field === field ? message.content : '';

const Login: ForwardRefRenderFunction<FormRef, FormProps> = (props, ref) => {
    const navigate = useNavigate();
    const [TextUsername, setTextUsername] = useState('');
    const [TextPassword, setTextPassword] = useState('');
    //báo lỗi 
    const [Message, setMessage] = useState<IMessage>(message(''))


    // nếu có trim() thì không cho khoản trắng ở đầu và cuối
    const changeUserName = ( e: ChangeEvent<HTMLInputElement>) =>setTextUsername(e.target.value);
    

    const changePassword = (e:ChangeEvent<HTMLInputElement>) =>setTextPassword(e.target.value)
    
    const keyupInput =(e: KeyboardEvent<HTMLInputElement>) => e.code === 'Enter' && submitLogin();


    const validate = () =>{
        const username = TextUsername.trim();
        // validate từng trường hợp , xác định messge khác nhau 
        if(!username) {
            setMessage(message('Vui lòng nhập tên đăng nhập', 'username', 'error'))
            return false;
        }
        if(username.length > 8){
            setMessage(message('Tên đăng nhập không được vượt quá 8 ký tự', 'username', 'error'))
            return false;
        }
        if(username.length < 3){
            setMessage(message('Tên đăng nhập phải có ít nhất 3 ký tự', 'username', 'error'))
            return false;
        }


        if(!TextPassword) {
            setMessage(message('Vui lòng nhập mật khẩu', 'password', 'error'))
            return false;
        }
        if(TextPassword.length < 3){
            setMessage(message('Mật khẩu phải có ít nhất 3 ký tự', 'password', 'error'))
            return false;
        }
        if(TextPassword.length >24 ){
            setMessage(message('Mật khẩu không được vượt quá 24 ký tự', 'password', 'error'))
            return false;
        }
        setMessage(message(''))
        return true;
    }
    const submitLogin = (e?: MouseEvent<HTMLButtonElement>) =>{
        e?.preventDefault();
        e?.stopPropagation();
        const valid = validate();
        if(valid ){
          if(TextUsername==='nhon' && TextPassword==='123456'){
            // setMessage(message('Đăng nhập không thành công', '','error'))
            // setTimeout(() =>{
                // setMessage(message('Đăng nhập thành công','','success'))
            // },2000)
            
            alert('Đăng nhập thành công');

            navigate("/dashboard", { replace: true });
          }
          else{
            setMessage(message('Tên đăng nhập hoặc mật khẩu không đúng', '','error'));
          }
        }else{

        }

    }
    console.log(TextUsername, TextPassword, );
    
  return (
    <Paper sx={SxPaper}>
      <Box sx={SxPaperWrapper}>
        <Paper sx={SxFormWapper}>
          <Typography variant="h4" component="h4" sx={SxTitle}>
            Đăng nhập
          </Typography>
          
          <Box sx={{px:2}}>
            {
                Message.content  && <Alert sx={{mb:2}} severity={Message.color ? Message.color : undefined}>{Message.content}</Alert>
            }
            <TextField 
                label='Tên đăng nhập'
                variant="outlined"
                fullWidth
                sx={{mb:2}}
                 value={TextUsername}
                onChange={changeUserName}
                onKeyUp={keyupInput}
                helperText={getMessage(Message,'username')}
                error = {!!getMessage(Message,'username')}
            />
             <TextField 
                label='Mật khẩu'
                variant="outlined"
                fullWidth
                sx={{mb:2}}
                value={TextPassword}
                onChange={changePassword}
                onKeyUp={keyupInput}
                helperText={getMessage(Message,'password')}
                error = {!!getMessage(Message,'password')}
            />

            <Button 
                variant="contained"
                color="primary"
                fullWidth
                onClick={submitLogin}
            >
                Đăng nhập
            </Button>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default forwardRef(Login);
