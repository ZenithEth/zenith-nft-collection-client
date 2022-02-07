import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    
}
body,html{
  
    background: #0b172e;
    overflow-x:hidden;
    color:white;
    transition:0.3s ease-in-out;
}


  h1{
    font-family: 'Amiri', serif;
    font-size:72px;
    font-weight:bold;
    color:white
  },
  h2{
    font-family: 'Amiri', serif;
    color:white;
    font-weight:bold;
font-size:36px;
  },
  h3{
    font-family: 'Urbanist', sans-serif;
    color:white;
    font-size:24px
  }
    span,
    p,div,button,a{ 
        font-family: 'Urbanist', sans-serif;
        color:white;
        text-decoration:none;
    }
    button{
        color:black,
        font-size:18px;
        font-weight:medium
    }
    .text-gradient {
    background: -webkit-linear-gradient(#09E1FF, #03ff85);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
  }
  .background-gradient{
    background-image: linear-gradient(to right, #09E1FF 30%, #03ff85);
  }
`;
export default GlobalStyle;
