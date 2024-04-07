import Image from "next/image"
import logo from "../assets/pika-avatar.png";
import logoText from "../assets/mockachu-text.png";
import type { Property } from 'csstype';

export default function Navbar(){
    const rowDirection : Property.FlexDirection = "row";
    const columnDirection : Property.FlexDirection = "column";
    const navStyle = {
        height: "70px",
        width: "100%",
        display: "flex",
        flexDirection: rowDirection,
        justifyContent: "space-between",
        backgroundColor: "grey",
        lineHeight: "50px"
    }
    const logoContainerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: rowDirection
    }
    const logoStyle = {
        width: "70px",
        height: "100%",
        display: "flex",
        padding: "10px",
    }
    const logoTextStyle = {
        width: "230px",
        height: "230px",
    }
    const menuContainerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: rowDirection,
        justifyContent: "space-between"
    }
    const menuItemStyle = {
        height: "100%",
        width: "150px",
        lineHeight: "70px",
        backgroundColor: "orange",
        display: "flex",
        flexDirection: rowDirection,
        justifyContent: "center",
        fontSize: "24px"
    }
    const signinStyle = {
        height: "100%",
        lineHeight: "100%",
        display: "flex",
        padding: "20px",
        flexDirection: columnDirection,
        justifyContent: "center"
    }
    const signInButtonStyle = {
        border: "1px solid black",
        borderRadius: "5px",
        width: "100px",
        height: "40px",
        lineHeight: "40px"
    }
    return (
        <div style={navStyle}>
            <div style={logoContainerStyle}>
                <div style={logoStyle}>
                    <Image
                        src={logo}
                        alt="Picture of the author"
                    />
                </div>
                <div style={logoTextStyle}>
                    <Image
                        src={logoText}
                        alt="Picture of the author"
                    />
                </div>
            </div>
            <div style={menuContainerStyle}>
                <div style={menuItemStyle}>Home</div>
                <div style={menuItemStyle}>Guide</div>
                <div style={menuItemStyle}>New</div>
                <div style={menuItemStyle}>About</div>
            </div>
            <div style={signinStyle}>
                <button style={signInButtonStyle}>Sign In</button>
            </div>
        </div>
    )
}