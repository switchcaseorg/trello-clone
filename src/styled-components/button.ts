import styled from "styled-components";

interface AddItemButtonProps {
    dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
background-color: #ffffff3d;
border-radius: 3px;
border: none;
color: ${props => (props.dark ? "#000" : "#fff")};
cursor: pointer;
max-width: 300px;
padding: 10px 12px;
text-align: left;
transition: background 85ms ease-in;
width: 100%;
&:hover {
background-color: #ffffff52;
}
`

export const NewItemButton = styled.button`
background-color: #5aac44;
border-radius: 3px;
border: none;
box-shadow: none;
color: #fff;
padding: 6px 12px;
text-align: center;
`